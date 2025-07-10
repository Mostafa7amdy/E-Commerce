import express from "express";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
import {
  addToCart,
  applyCoupon,
  deleteCart,
  getLoggedUserCart,
  removeFromCart,
  updateCart,
} from "./cartController.js";
import { addToCartVal, updateCartVal } from "./cartValidation.js";
import { validation } from "../../middleware/validation.js";
import { paramsIdVal } from "../category/category.validation.js";
const cartRouter = express.Router();
cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"), validation(addToCartVal), addToCart)
  .get(protectedRoutes, allowedTo("user"), getLoggedUserCart);

cartRouter
  .route("/:id")
  .delete(
    protectedRoutes,
    allowedTo("user", "admin"),
    validation(paramsIdVal),
    removeFromCart
  )
  .put(
    protectedRoutes,
    allowedTo("user"),
    validation(updateCartVal),
    updateCart
  );

cartRouter.post(
  "/applyCoupon",
  protectedRoutes,
  allowedTo("user"),
  applyCoupon
);
cartRouter.delete("/", protectedRoutes, allowedTo("user", "admin"), deleteCart);
export { cartRouter };
