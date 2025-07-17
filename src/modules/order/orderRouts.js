import express from "express";
import { createOrderVal } from "./orderValidation.js";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
import { validation } from "../../middleware/validation.js";
import { createCashOrder } from "./orderController.js";
const orderRouter = express.Router();
orderRouter.post(
  "/:id",
  protectedRoutes,
  allowedTo("user"),
  validation(createOrderVal),
  createCashOrder
);
export { orderRouter };
