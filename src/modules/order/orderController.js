import { cartModel } from "../../../database/models/cartModel .js";
import { orderModel } from "../../../database/models/orderModel.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/productModel.js";

import Stripe from "stripe";

const createCashOrder = catchError(async (req, res, next) => {
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("card not found", 404));
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  const order = new orderModel({
    user: req.user._id,
    orderItems: req.body.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  // increment sold & decrement product quantity
  const options = cart.cartItems.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { quantity: -item.quantity, sold: item.quantity },
        },
      },
    };
  });
  await productModel.bulkWrite(options);

  // clear cart items
  await cartModel.findByIdAndDelete(req.params.id);

  await order.save();
  res.json({ message: "success", order });
});

const getSpecificOrder = catchError(async (req, res, next) => {
  const order = await orderModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  res.status(200).json({ message: "success", order });
});
const getAllOrders = catchError(async (req, res, next) => {
  const orders = await orderModel.find({}).populate("orderItems.product");
  res.status(200).json({ message: "success", orders });
});

const createCheackOutSession = catchError(async (req, res, next) => {
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("card not found", 404));
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: req.user.name,
          },
          unit_amount: totalOrderPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    metadata: req.body.shippingAddress,
    client_reference_id: req.params.id, // cart id
    customer_email: req.user.email,
  });

  res.json({ message: "success", session });
});

export {
  createCashOrder,
  getSpecificOrder,
  getAllOrders,
  createCheackOutSession,
};
