import express from "express";
import {
  changePassoword,
  protectedRoutes,
  signIn,
  signUp,
} from "./authController.js";
import { signInVal, signUpVal } from "./authValidation.js";
import { validation } from "../../middleware/validation.js";
import { chekEmail } from "../../middleware/checkEmail.js";
import { changePassVal } from "./changePasswordVal.js";
const authRouter = express.Router();
authRouter.post("/signUp", validation(signUpVal), chekEmail, signUp);
authRouter.post("/signIn", validation(signInVal), signIn);
authRouter.post(
  "/changePass",
  protectedRoutes,
  validation(changePassVal),
  changePassoword
);
export { authRouter };
