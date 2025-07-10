import express from "express";
import {
  addBrand,
  deleteBrand,
  getBrands,
  getSingleBrands,
  updateBrand,
} from "./brandController.js";
import {
  addBrandVal,
  brandParamsVal,
  updateBrandVal,
} from "./brand.validation.js";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../../services/fileUploads/fileUpload.js";
const brandRouter = express.Router();
brandRouter
  .route("/")
  .get(getBrands)
  .post(uploadSingleFile("logo"), validation(addBrandVal), addBrand);
brandRouter
  .route("/:id")
  .get(validation(brandParamsVal), getSingleBrands)
  .put(uploadSingleFile("logo"), validation(updateBrandVal), updateBrand)
  .delete(validation(brandParamsVal), deleteBrand);
export { brandRouter };
