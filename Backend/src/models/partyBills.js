import mongoose from "mongoose";

const partyBillSchema = new mongoose.Schema(
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
    bill_amount: {
      type: Number,
    },
    received_amount: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
    },
    payment_status: { type: String, enum: ["PENDING", "RECEIVED"], default: "PENDING" },
  },
  {
    timestamps: true,
  }
);

const partyBill = new mongoose.model("PartyBill", partyBillSchema);
export default partyBill;
