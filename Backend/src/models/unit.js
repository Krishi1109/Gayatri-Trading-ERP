import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
    unique: [true, "Ohh, Unit must be unique!"],
  },
});

const unit = new mongoose.model("unit", unitSchema);
export default unit;
