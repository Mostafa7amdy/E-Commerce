import { AppError } from "../../utils/appError.js";

export let validation = (schema) => {
  return (req, res, next) => {
    let filter = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    if (req.file?.fieldname === "image") filter.image = req.file;
    if (req.file?.fieldname === "logo") filter.image = req.file;
    const { error } = schema.validate(filter, { abortEarly: false });
    if (error) {
      let errList = [];
      error.details.forEach((elm) => {
        errList.push(elm.message);
      });
      next(new AppError(errList, 401));
    } else next();
  };
};
