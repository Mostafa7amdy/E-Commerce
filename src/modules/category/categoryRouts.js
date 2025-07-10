import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
} from "./categoryController.js";
import { validation } from "../../middleware/validation.js";
import {
  addCategoryVal,
  paramsIdVal,
  updateCategoryVal,
} from "./category.validation.js";
import { uploadSingleFile } from "../../../services/fileUploads/fileUpload.js";
import { subcategoryRouter } from "../subCategory/subcategoryRouts.js";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
const categoryRouter = express.Router();
categoryRouter.use("/:categoryId/subcategories", subcategoryRouter);
categoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    uploadSingleFile("image"),
    validation(addCategoryVal),
    addCategory
  )
  .get(getCategories);
categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCategory)
  .put(uploadSingleFile("image"), validation(updateCategoryVal), updateCategory)
  .delete(deleteCategory);
export { categoryRouter };
