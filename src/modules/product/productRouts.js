import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "./productController.js";
import { uploadArryOfFields } from "../../../services/fileUploads/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { addProductVal, productParamsVal, updateProductVal } from "./product.Validation.js";
const productRouter = express.Router();
productRouter
  .route("/")
  .get(getProducts)
  .post(
    uploadArryOfFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addProductVal),
    addProduct
  );
productRouter
  .route("/:id")
  .get(validation(productParamsVal), getSingleProduct)
  .put(validation(updateProductVal), updateProduct)
  .delete(validation(productParamsVal), deleteProduct);
export { productRouter };
