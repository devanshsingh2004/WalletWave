const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reference: {
      type: String,
      required: true,
      unique: true, 
    },

    type: {
      type: String,
      enum: ["transfer", "deposit"],
      default: "transfer",
    },

    status: {
      type: String,
      required: true,
      enum: ["success", "failed"],
    },
  },
  { timestamps: true }
);

transactionsSchema.index({ sender: 1 });
transactionsSchema.index({ receiver: 1 });
transactionsSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Transaction", transactionsSchema);
