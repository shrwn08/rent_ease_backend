import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: String,
    monthlyRent: Number,
    deposit: Number,
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    tenure: {
      type: Number,
      required: true,
      enum: [3, 6, 12],
    },
  },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalRent: {
      type: Number,
      required: true,
    },
    totalDeposit: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: [true, "Delivery date is required"],
    },
    deliveryAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "returned", "cancelled"],
      default: "pending",
    },
    rentalStartDate: Date,
    rentalEndDate: Date,
    notes: String,
  },
  { timestamps: true },
);



const Order = mongoose.model("Order", orderSchema);

export default Order;