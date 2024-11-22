import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Ohh, Brand name must be unique!"],
  },
});

const brand = new mongoose.model("Brand", brandSchema);
export default brand;
