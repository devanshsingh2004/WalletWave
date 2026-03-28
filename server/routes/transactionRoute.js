const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");

//  TRANSFER FUNDS 
router.post("/transfer-funds", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { sender, receiver, amount, reference } = req.body;

    //  idempotency check
    const existing = await Transaction.findOne({ reference });
    if (existing) {
      return res.send({
        message: "Duplicate transaction",
        success: false,
      });
    }

    //  balance check
    const senderUser = await User.findById(sender).session(session);
    if (!senderUser || senderUser.balance < amount) {
      throw new Error("Insufficient balance");
    }

    // create transaction
    const newTransaction = await Transaction.create(
      [
        {
          sender,
          receiver,
          amount,
          reference,
          status: "success",
          type: "transfer",
        },
      ],
      { session }
    );

    //  atomic updates
    await User.updateOne(
      { _id: sender },
      { $inc: { balance: -amount } },
      { session }
    );

    await User.updateOne(
      { _id: receiver },
      { $inc: { balance: amount } },
      { session }
    );

    await session.commitTransaction();

    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    await session.abortTransaction();

    res.send({
      message: error.message,
      success: false,
    });
  } finally {
    session.endSession();
  }
});
