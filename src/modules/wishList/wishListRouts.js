import express from "express";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
import {
  addToWishList,
  getWishList,
  removeFromWishList,
} from "./wishListController.js";
import { validation } from "../../middleware/validation.js";
import { addToWishListVal } from "./wishListValidation.js";
import { paramsIdVal } from "../category/category.validation.js";
const wishListRouter = express.Router();
wishListRouter.patch(
  "/",
  protectedRoutes,
  allowedTo("user"),
  validation(addToWishListVal),
  addToWishList
);
wishListRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("user"),
  validation(paramsIdVal),
  removeFromWishList
);
wishListRouter.get("/", protectedRoutes, allowedTo("user"), getWishList);
export { wishListRouter };
