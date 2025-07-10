import joi from "joi";
const addBrandVal = joi.object({
  name: joi.string().min(2).max(200).trim().required(),
  logo: joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi
      .string()
      .valid("image/jpeg", "image.png", "image.jpg")
      .required(),
    size: joi.number().max(5345753).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),    
    path: joi.string().required(),
  }),
});
const updateBrandVal = joi.object({
  name: joi.string().min(2).max(200).trim(),
  logo: joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi
      .string()
      .valid("image/jpeg", "image.png", "image.jpg")
      .required(),
    size: joi.number().max(5345753).required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
  }),
  id: joi.string().hex().length(24).required(),
});
const brandParamsVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
export { addBrandVal, updateBrandVal, brandParamsVal };
