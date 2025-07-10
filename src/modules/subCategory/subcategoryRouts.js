import express from "express";
import {
  addSubcategory,
  deleteSubcategory,
  getAllSubcategory,
  updateSubcategory,
} from "./subcategoryControler.js";
import { getSingleCategory } from "../category/categoryController.js";
import {
  addSubcategoryVal,
  paramsVal,
  updateSubCategoryVal,
} from "./subcategory.validation.js";
import { validation } from "../../middleware/validation.js";

const subcategoryRouter = express.Router({ mergeParams: true });
subcategoryRouter
  .route("/")
  .post(validation(addSubcategoryVal), addSubcategory)
  .get(getAllSubcategory);
subcategoryRouter
  .route("/:id")
  .get(validation(paramsVal), getSingleCategory)
  .put(validation(updateSubCategoryVal), updateSubcategory)
  .delete(validation(paramsVal), deleteSubcategory);
export { subcategoryRouter };
