import express from "express";
import { validation } from "../../middleware/validation.js";
import { paramsVal } from "../subCategory/subcategory.validation.js";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "./reviewController.js";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
import { createReviewVal, updateReviewVal } from "./reviewValidation.js";
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(getReviews)
  .post(
    protectedRoutes,
    allowedTo("user"),
    validation(createReviewVal),
    createReview
  );

reviewRouter
  .route("/:id")
  .get(validation(paramsVal), getReview)
  .put(protectedRoutes,allowedTo("user"), validation(updateReviewVal), updateReview)
  .delete(
    protectedRoutes,
    allowedTo("user","admin"),
    validation(paramsVal),
    deleteReview
  );

export { reviewRouter };
