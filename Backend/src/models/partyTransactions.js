import mongoose from "mongoose";

const partyTransactionsSchema = new mongoose.Schema(
  {
    party_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party", // Reference to Party Schema
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
    },
    transaction_module: {
      type: String,
      default: null,
    },
    transaction_module_id: {
      type: String,
      default: null,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const partyTransactions = new mongoose.model("PartyTransactions", partyTransactionsSchema);
export default partyTransactions;
