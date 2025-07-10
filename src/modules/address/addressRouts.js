import express from "express";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
import {
  addToAdresses,
  getAdresses,
  removeFromAdresses,
} from "./adressController.js";
import { validation } from "../../middleware/validation.js";
import { addToAdressVal } from "./addressValidation.js";
import { paramsIdVal } from "../category/category.validation.js";
const adressesRouter = express.Router();
adressesRouter.patch(
  "/",
  protectedRoutes,
  allowedTo("user"),
  validation(addToAdressVal),
  addToAdresses
);
adressesRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("user"),
  validation(paramsIdVal),
  removeFromAdresses
);
adressesRouter.get("/", protectedRoutes, allowedTo("user"), getAdresses);
export { adressesRouter };
