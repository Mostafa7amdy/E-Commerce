import { userModel } from "../../database/models/userModel.js";
import { AppError } from "../../utils/appError.js";

const chekEmail = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) next(new AppError("email aready exises", 409));
  next();
};
export { chekEmail };
