import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { brandModel } from "../../../database/models/brandModel.js";
import { AppError } from "../../../utils/appError.js";
const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let brand = new brandModel(req.body);
  await brand.save();
  res.json({ message: "success", brand });
});
const getBrands = catchError(async (req, res, next) => {
  let brands = await brandModel.find();
  res.json({ message: "success", brands });
});
const getSingleBrands = catchError(async (req, res, next) => {
  let brand = await brandModel.findById(req.params.id);
  res.json({ message: "success", brand });
});
const updateBrand = catchError(async (req, res, next) => {
  if (req.file) req.body.logo = req.file.filename;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  const prand = await brandModel.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  prand && res.json({ message: "success", prand });
  !prand && res.status(404).json({ message: "NOT FOUND" });
});
const deleteBrand = catchError(async (req, res, next) => {
  const brand = await brandModel.findByIdAndDelete(req.params.id);
  brand && res.json({ message: "success" });
  !brand && res.status(404).json("NOT FOUND");
});
export { addBrand, getBrands, getSingleBrands, updateBrand, deleteBrand };
