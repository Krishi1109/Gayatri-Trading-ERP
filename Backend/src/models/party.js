import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Ohh, Party name must be unique!"],
  },
  code: {
    unique: true,
    required: true,
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  pending_bills: {},
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
});

const party = new mongoose.model("Party", partySchema);
export default party;
