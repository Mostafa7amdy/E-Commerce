import express from "express";
import { createOrderVal } from "./orderValidation.js";
import { allowedTo, protectedRoutes } from "../auth/authController.js";
import { validation } from "../../middleware/validation.js";
import {
  createCashOrder,
  createCheackOutSession,
  getAllOrders,
  getSpecificOrder,
} from "./orderController.js";
const orderRouter = express.Router();
orderRouter
  .route("/:id")
  .post(
    protectedRoutes,
    allowedTo("user"),
    validation(createOrderVal),
    createCashOrder
  );
orderRouter
  .route("/checkOut/:id")
  .post(
    protectedRoutes,
    allowedTo("user"),
    validation(createOrderVal),
    createCheackOutSession
  );
orderRouter.get("/all", protectedRoutes, allowedTo("admin"), getAllOrders);
orderRouter
  .route("/")
  .get(protectedRoutes, allowedTo("user"), getSpecificOrder);
export { orderRouter };
