const router = require("express").Router();
const Request = require("../models/requestsModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const mongoose = require("mongoose");

//  UPDATE REQUEST STATUS 
router.post("/update-request-status", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await Request.findById(req.body._id).session(session);

    if (!request) throw new Error("Request not found");

    if (req.body.status === "accepted") {
      //  payer is receiver of request
      const payer = await User.findById(request.receiver).session(session);

      if (payer.balance < request.amount) {
        throw new Error("Insufficient balance");
      }

      //  create transaction
      await Transaction.create(
        [
          {
            sender: request.receiver,
            receiver: request.sender,
            amount: request.amount,
            reference: request.description,
            status: "success",
            type: "transfer",
          },
        ],
        { session }
      );

      //  update balances
      await User.updateOne(
        { _id: request.receiver },
        { $inc: { balance: -request.amount } },
        { session }
      );

      await User.updateOne(
        { _id: request.sender },
        { $inc: { balance: request.amount } },
        { session }
      );
    }

    // update request status
    await Request.findByIdAndUpdate(
      req.body._id,
      { status: req.body.status },
      { session }
    );

    await session.commitTransaction();

    res.send({
      message: "Request updated successfully",
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
