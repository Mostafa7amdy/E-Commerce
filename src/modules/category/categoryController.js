import { categoryModel } from "../../../database/models/categoryModel.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
const addCategory = catchError(async (req, res, next) => {
  req.body.image = req.file.filename;
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();
  res.json({ message: "success", category });
});
const getCategories = catchError(async (req, res, next) => {
  const categories = await categoryModel.find()
  res.json({ message: "success",  categories });
});
const getSingleCategory = catchError(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.id);
  res.json({ message: "success", category });
});
const updateCategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  category && res.json({ message: "success", category });
  !category && res.status(404).json({ message: "not founded" });
});
const deleteCategory = catchError(async (req, res, next) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  category && res.json({ message: "success" });
  !category && res.status(404).json({ message: "not founded" });
});
export {
  addCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
