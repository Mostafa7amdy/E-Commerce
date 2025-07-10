import { couponModel } from "../../../database/models/couponModel.js";
import { ApiFeaturs } from "../../../utils/apiFeature.js";
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
const addCoupon = catchError(async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({ code: req.body.code });
  if (isCouponExist) return next(new AppError("coupon is exist"));
  const coupon = couponModel(req.body);
  await coupon.save();
  res.json({ message: "success", coupon });
});
const getAllCoupon = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeaturs(couponModel.find({}), req.query)
    .pagination()
    .filter()
    .fields()
    .search()
    .sort();
  let coupons = await apiFeatures.mongooseQuery;
  res.json({ message: "success", coupons });
});

const getSingleCoupon = catchError(async (req, res, next) => {
  const coupon = await couponModel.findById(req.params.id);
  if (!coupon) return next(new AppError("no coupon for this id", 404));
  res.json({ message: "success", coupon });
});

const updateCoupon = catchError(async (req, res, next) => {
  const coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (coupon) return res.json({ message: "success", coupon });
  next(new AppError("no coupon for this id", 404));
});

const deleteCoupon = catchError(async (req, res, next) => {
  const coupon = await couponModel.findByIdAndDelete(req.params.id);
  if (coupon) return res.json({ message: "success", coupon });
  next(new AppError("no coupon for this id", 404));
});
export { addCoupon, getAllCoupon, getSingleCoupon, updateCoupon, deleteCoupon };
