import joi from "joi";
const addProductVal = joi.object({
  title: joi.string().min(2).max(100).trim().required(),
  description: joi.string().min(2).max(300).trim().required(),
  price: joi.number().min(0).required(),
  priceAfterDescount: joi.number().min(0).optional(),
  imgCover: joi.string().required(),
  images: joi.array().items(joi.string().required()),

  quantity: joi.number().min(0).optional(),
  category: joi.string().hex().length(24).required(),
  subcategory: joi.string().hex().length(24).required(),
  brand: joi.string().hex().length(24).required(),
  createdBy: joi.string().hex().length(24).optional(),
});
const productParamsVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
const updateProductVal = joi.object({
  id: joi.string().hex().length(24).required(),
  title: joi.string().min(2).max(100).trim().required(),
  description: joi.string().min(2).max(300).trim().required(),
  price: joi.number().min(0).required(),
  priceAfterDescount: joi.number().min(0).optional(),
  imgCover: joi.string().required(),
  images: joi.array().items(joi.string()),
  quintity: joi.number().min(0).optional(),
  category: joi.string().hex().length(24).required(),
  subcategory: joi.string().hex().length(24).required(),
  brand: joi.string().hex().length(24).required(),
  createdBy: joi.string().hex().length(24).optional(),
});
export { addProductVal, updateProductVal, productParamsVal };
