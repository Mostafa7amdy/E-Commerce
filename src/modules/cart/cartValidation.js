import Joi from "joi";
const addToCartVal = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().options({ convert: false }),
});

const updateCartVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  quantity: Joi.number().options({ convert: false }).required(),
});

export { addToCartVal, updateCartVal };
