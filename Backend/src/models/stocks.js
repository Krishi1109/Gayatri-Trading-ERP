import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    oil_type: {
      type: String,
      required: true,
    },
    package_variant: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    orders: [
      {
        order_qty: {
          type: Number,
        },
        order_date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const stock = new mongoose.model("Stock", stockSchema);
export default stock;
