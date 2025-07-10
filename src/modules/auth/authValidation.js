import Joi from "joi";
const signUpVal = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
});

const signInVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export { signInVal, signUpVal };
