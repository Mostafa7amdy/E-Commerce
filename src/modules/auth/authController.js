import { userModel } from "../../../database/models/userModel.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const signUp = catchError(async (req, res, next) => {
  const user = new userModel(req.body);
  await user.save();
  let token = jwt.sign(
    { userID: user._id, role: user.role },
    process.env.JWT_KEy
  );
  res.json({ message: "success", token });
});

const signIn = catchError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    return res.json({ message: "success", token });
  }

  next(new AppError("incorrect email or password", 401));
});

const changePassoword = catchError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.user.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    await userModel.findByIdAndUpdate(req.user._id, {
      password: bcrypt.hashSync(req.body.newPassword, 8),
      passwordChangeAt: Date.now(),
    });
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});

const protectedRoutes = catchError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token not provided", 401));
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("user not found", 401));
  if (user.changeTimeAt) {
    const time = parseInt(user.changeTimeAt.getTime() / 1000);
    if (time > decoded.iat)
      return next(new AppError("invalid token ... login again", 401));
  }
  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("you are not authrized", 401));
    next();
  };
  
};

export { signIn, signUp, changePassoword, protectedRoutes, allowedTo };
