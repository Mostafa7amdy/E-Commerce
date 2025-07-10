import { userModel } from "../../../database/models/userModel.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

const addToAdresses = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { adresses: req.body } },
    { new: true }
  );
  if (!user) return next(AppError("no product to add in adresses", 404));
  res.json({ message: "success", adresses: user.adresses });
});

const removeFromAdresses = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { adresses: { _id: req.params.id } } },
    { new: true }
  );
  if (!user) return next(AppError("no product to add in adresses", 404));
  res.json({ message: "success", adresses: user.adresses });
});

const getAdresses = catchError(async (req, res, next) => {
  const { adresses } = await userModel.findById(req.user._id);
  res.json({ message: "success", adresses });
});
export { addToAdresses, removeFromAdresses, getAdresses };
