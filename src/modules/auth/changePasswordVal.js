import Joi from "joi";
const changePassVal = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
});
export { changePassVal };
