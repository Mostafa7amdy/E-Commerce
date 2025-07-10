import { cartModel } from "../../../database/models/CartModel .js";
import { couponModel } from "../../../database/models/couponModel.js";
import { productModel } from "../../../database/models/productModel.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
  cart.totalPrice = totalPrice;
  if (cart.discount) {
    cart.totalPriceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
  }
};
const addToCart = catchError(async (req, res, next) => {
  const product = await productModel.findById(req.body.product);
  if (!product) return next(new AppError("product not found", 404));
  if (req.body.quantity > product.quantity)
    return next(new AppError("this quantity is not available"));
  req.body.price = product.price;

  const cartExist = await cartModel.findOne({ user: req.user._id });
  if (!cartExist) {
    const cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    res.json({ message: "success", cart });
  } else {
    const productExist = cartExist.cartItems.find(
      (item) => item.product == req.body.product
    );
    if (productExist) {
      if (productExist.quantity + req.body.quantity > product.quantity)
        return next(new AppError("this quantity is not available"));
      productExist.quantity += req.body.quantity;
    } else cartExist.cartItems.push(req.body);
    calcTotalPrice(cartExist);
    await cartExist.save();
    res.json({ message: "success", cart: cartExist });
  }
});
const removeFromCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  if (!cart) return next(new AppError("no product to delete", 404));
  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "success", cart });
});

const updateCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.user._id });
  const productExist = cart.cartItems.find((item) => item._id == req.params.id);
  if (productExist) {
    productExist.quantity = req.body.quantity;
    calcTotalPrice(cart);
    await cart.save();
    res.json({ message: "success", cart });
  } else return next(new AppError("no product founded for update", 404));
});

const getLoggedUserCart = catchError(async (req, res, next) => {
  const cart = await cartModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  if (!cart) return next(new AppError("no cart found", 404));
  res.json({ message: "success", cart });
});
const deleteCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOneAndDelete({ user: req.user._id });
  if (!cart) return next(new AppError("no cart found", 404));
  res.json({ message: "success", cart });
});

const applyCoupon = catchError(async (req, res, next) => {
  const coupon = await couponModel.findOne({
    code: req.body.coupon,
    expires: { $gte: Date.now() },
  });
  if (!coupon) return next(new AppError("invalid coupon", 401));
  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("cart not found", 401));
  let totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.discount = coupon.discount;
  await cart.save();
  res.json({ message: "success", cart });
});

export {
  addToCart,
  removeFromCart,
  updateCart,
  getLoggedUserCart,
  deleteCart,
  applyCoupon,
};
