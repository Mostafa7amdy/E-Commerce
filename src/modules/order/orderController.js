import { cartModel } from "../../../database/models/cartModel .js";
import { orderModel } from "../../../database/models/orderModel.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/productModel.js";
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
    shippingAdress: req.body.shippingAdress,
  });

  const options = cart.cartItems.map((prod) => {
    return [
      {
        updateOne: {
          filter: { _id: prod.product },
          update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } },
        },
      },
    ];
  });

  await productModel.bulkWrite(options);

  await order.save();
  res.json({ message: "success", order });
});

export { createCashOrder };
