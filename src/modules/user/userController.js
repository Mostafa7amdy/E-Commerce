import { userModel } from "../../../database/models/userModel.js";
import { catchError } from "../../middleware/catchError.js";


const createUser = catchError(async (req, res, next) => {
  const user = new userModel(req.body);
  await user.save();
  res.json({ message: "success", user });
});
const getUsers = catchError(async (req, res, next) => {
  const users = await userModel.find({});
  if (users) return res.status(200).json({ message: "success", users });
  next(new AppError("no user", 404));
});
const getUser = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (user) return res.status(200).json({ message: "success", user });
  next(new AppError("no user", 404));
});
const updateUser = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (user) return res.status(200).json({ message: "success", user });
  next(new AppError("no user for Update", 404));
});
const deleteUser = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (user) return res.json({ message: "success" });
  next(new AppError("no user for this Id", 404));
});

export { createUser, getUsers, getUser, updateUser, deleteUser };
