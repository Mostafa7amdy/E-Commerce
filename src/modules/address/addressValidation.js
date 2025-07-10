import Joi from "joi";

const addToAdressVal = Joi.object({
  street: Joi.string().required().trim(),
  phone: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
});

export { addToAdressVal };
