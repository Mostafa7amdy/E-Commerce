import joi from "joi";
const createUserVal = joi.object({
  name: joi.string().trim().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  rePassword: joi.valid(joi.ref("password")).required(),
});

const paramsVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

const updateUserVal = joi.object({
  id: joi.string().hex().length(24).required(),
  name: joi.string().trim().min(3).max(30),
  password: joi.string(),
  rePassword: joi.valid(joi.ref("password")),
  role: joi.string().valid("user", "admin"),
});
export { createUserVal, paramsVal, updateUserVal };
