import mongoose from "mongoose";

const isPositive = (value) => {
  return value >= 0;
};

const purchaseSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    oil_type: { type: String, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    items_per_package: { type: Number, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    ordered_qty: {
      type: Number,
      default: 0,
      validate: {
        validator: isPositive,
        message: "Please enter valid quantity!",
      },
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
      enum: ["ACTIVE", "INACTIVE", "COMPLETED"],
      default: "INACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const purchase = new mongoose.model("Purchase", purchaseSchema);
export default purchase;
