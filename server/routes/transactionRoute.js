const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");
router.post("/transfer-funds", authMiddleware, async (req, res) => {
  try {
    const { sender, receiver, amount } = req.body;

    const newTransaction = await new Transaction(req.body).save();

    await User.findByIdAndUpdate(sender, { $inc: { balance: -amount } });
    await User.findByIdAndUpdate(receiver, { $inc: { balance: amount } });

    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});

router.post("/verify-account", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.receiver);
    if (!user) throw new Error("Account not found");

    res.send({ message: "Account verified", data: user, success: true });
  } catch (error) {
    res.send({ message: error.message, data: null, success: false });
  }
});

router.post(
  "/get-all-transactions-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const transactions = await Transaction.find({
        $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      })
        .sort({ createdAt: -1 })
        .populate("sender", "firstName lastName email")
        .populate("receiver", "firstName lastName email");

      res.send({
        message: "Transactions fetched",
        data: transactions,
        success: true,
      });
    } catch (error) {
      res.send({
        message: "Transactions not fetched",
        data: error.message,
        success: false,
      });
    }
  }
);

router.post("/deposit-funds", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const amountInCents = Math.round(Number(amount) * 100);
    let customer;
    const existing = await stripe.customers.list({
      email: token.email,
      limit: 1,
    });
    if (existing.data.length) {
      customer = existing.data[0];
      // attach latest card token so it can be charged immediately
      await stripe.customers.update(customer.id, { source: token.id });
    } else {
      customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amountInCents,
        currency: "usd",
        customer: customer.id,
        payment_method_types: ["card"],
        receipt_email: token.email,
        description: "Deposit to WalletWave",
        confirm: true,
      },
      { idempotencyKey: uuidv4() } // ✅ header-level idempotency key
    );

    if (paymentIntent.status === "succeeded") {
      const newTransaction = await new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      }).save();

      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { balance: amount },
      });

      return res.send({
        message: "Transaction successful",
        data: newTransaction,
        success: true,
      });
    }

    res.send({
      message: "Payment not completed",
      data: paymentIntent,
      success: false,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});

module.exports = router;
