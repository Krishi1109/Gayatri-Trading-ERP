import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  variant: {
    type: Number,
    required: true,
    unique: [true, "Ohh, Variant must be unique!"],
  },
});

const variant = new mongoose.model("Variant", variantSchema);
export default variant;
