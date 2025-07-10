import Joi from "joi";

const addCouponVal = Joi.object({
  code: Joi.string().min(0).max(5).required(),
  discount: Joi.number().min(0).required(),
  expires: Joi.date().required(),
});

const updateCouponVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  code: Joi.string().min(0).max(5),
  discount: Joi.number().min(0),
  expires: Joi.date(),
});
export { addCouponVal, updateCouponVal };
