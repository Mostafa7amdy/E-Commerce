import express from "express";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
import { validation } from "../../middleware/validation.js";
import { paramsIdVal } from "../category/category.validation.js";
import { addCouponVal, updateCouponVal } from "./couponValidation.js";
import {
  addCoupon,
  deleteCoupon,
  getAllCoupon,
  getSingleCoupon,
  updateCoupon,
} from "./couponController.js";
const couponRouter = express.Router();
couponRouter.use(protectedRoutes, allowedTo("admin"));
couponRouter
  .route("/")
  .post(validation(addCouponVal), addCoupon)
  .get(getAllCoupon);
couponRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCoupon)
  .delete(
    validation(paramsIdVal),
    deleteCoupon
  )
  .put(
    validation(updateCouponVal),
    updateCoupon
  );

export { couponRouter };
