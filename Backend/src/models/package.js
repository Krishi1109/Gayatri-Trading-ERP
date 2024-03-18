import mongoose from "mongoose";

const packageVariantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Package = new mongoose.model("Package", packageVariantSchema);
export default Package;
