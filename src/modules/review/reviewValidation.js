import Joi from "joi";
const createReviewVal = Joi.object({
  text: Joi.string().min(2).max(50).required(),
  product: Joi.string().hex().length(24).required(),
  rate: Joi.number().min(1).max(5).required(),
});

const updateReviewVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  text: Joi.string().min(2).max(50),
  product: Joi.string().hex().length(24),
  rate: Joi.number().min(1).max(5),
});
export { createReviewVal, updateReviewVal };
