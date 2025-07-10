import { reviewModel } from "../../../database/models/reviewModel.js";
import { ApiFeaturs } from "../../../utils/apiFeature.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

const createReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let isReviewExist = await reviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReviewExist)
    return next(new AppError("you created review before", 401));
  const review = new reviewModel(req.body);
  await review.save();
  res.json({ message: "success", review });
});
const getReviews = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeaturs(reviewModel.find({}), req.query)
    .pagination()
    .sort()
    .fields()
    .filter()
    .search();
  const reviews = await apiFeatures.mongooseQuery;
  res.json({ message: "success", results: reviews.length, reviews });
});
const getReview = catchError(async (req, res, next) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) return next(new AppError("no review for this id", 404));
  res.json({ message: "success", review });
});
const updateReview = catchError(async (req, res, next) => {
  const review = await reviewModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  if (!review) return next(new AppError("no review for this id", 404));
  res.json({ message: "success", review });
});
const deleteReview = catchError(async (req, res, next) => {
  const review = await reviewModel.findOneAndDelete({
    id: req.params.id,
    user: req.user._id,
  });
  if (!review) return next(new AppError("no review for this id", 404));
  res.json({ message: "success", review });
});
export { createReview, getReview, getReviews, updateReview, deleteReview };
