import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./userController.js";
import { createUserVal, paramsVal, updateUserVal } from "./userValidation.js";
import { validation } from "../../middleware/validation.js";
import { chekEmail } from "../../middleware/checkEmail.js";
const userRouter = express.Router();
userRouter
  .route("/")
  .post(validation(createUserVal), chekEmail, createUser)
  .get(getUsers);
userRouter
  .route("/:id")
  .get(validation(paramsVal), getUser)
  .delete(validation(paramsVal), deleteUser)
  .put(validation(updateUserVal), updateUser);
export { userRouter };
