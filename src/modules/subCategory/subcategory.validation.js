import joi from "joi";
const addSubcategoryVal = joi.object({
  name: joi
    .string()
    .trim()
    .min(2)
    .max(100)
    .required(),
  category: joi.string().hex().length(24).required(),
});
const paramsVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
const updateSubCategoryVal = joi.object({
  id: joi.string().hex().length(24).required(),
  name: joi.string().trim().min(2).max(100),
  category: joi.string().hex().length(24),
});
export { addSubcategoryVal, paramsVal, updateSubCategoryVal };
