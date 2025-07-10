import { userModel } from "../../../database/models/userModel.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

const addToWishList = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishList: req.body.product } },
    { new: true }
  );
  if (!user) return next(AppError("no product to add in wishList", 404));
  res.json({ message: "success", wishList: user.wishList });
});

const removeFromWishList = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishList: req.params.id } },
    { new: true }
  );
  if (!user) return next(AppError("no product to remove from wishList", 404));
  res.json({ message: "success", wishList: user.wishList });
});
const getWishList = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).populate("wishList");
  res.json({ message: "success", wishList: user.wishList });
});

export { addToWishList, removeFromWishList, getWishList };

