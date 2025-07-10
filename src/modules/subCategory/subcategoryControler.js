import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { subcategoryModel } from "../../../database/models/subcategoryModel.js";
import { AppError } from "../../../utils/appError.js";
import { deleteOne } from "../handlers/handlers.js";

const addSubcategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const subcategory = new subcategoryModel(req.body);
  await subcategory.save();
  res.json({ message: "success", subcategory });
});
const getAllSubcategory = catchError(async (req, res, next) => {
  let objFilter = {};
  if (req.params.categoryId)
    subCategoryFilter = { category: req.params.categoryId };
  const categories = await subcategoryModel.find(objFilter).populate('category');
  res.json({ message: "success", categories });
});
const getSingleSubcategory = catchError(async (req, res, next) => {
  const subCategory = await subcategoryModel.findById(req.params.id);
  res.json({ message: "success", subCategory });
});
const updateSubcategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  const category = await subcategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  category && res.json({ message: "success", category });
  !category && res.status(404).json({ message: "NOT FOUND" });
});
const deleteSubcategory = deleteOne(subcategoryModel);

export {
  addSubcategory,
  getAllSubcategory,
  getSingleSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
