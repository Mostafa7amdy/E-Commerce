import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    orderItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    shippingAddress: {
      street: String,
      city: String,
      phone: Number,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    isDeliverd: {
      type: Boolean,
      default: false,
    },
    DeliverdAt: Date,
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
  },
  { timestamps: true }
);
const orderModel = mongoose.model("order", schema);

export { orderModel };
