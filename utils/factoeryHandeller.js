import slugify from "slugify";
import { AppError } from "./appError.js";

const createOne = (schema) => {
  return async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    const document = new schema(req.body);
    await document.save();
    res.json({ message: "success", document });
  };
};
const getOne = (schema) => {
  return async (req, res, next) => {
    const document = await schema.findById(req.params.id);
    if (document) return res.status(200).json({ message: "success", document });
    next(new AppError("no document", 404));
  };
};

const getAll = (schema) => {
  return async (req, res, next) => {
    const documents = await schema.find({});
    if (documents)
      return res.status(200).json({ message: "success", documents });
    next(new AppError("no docments", 404));
  };
};
const deleteOne = (schema) => {
  return async (req, res, next) => {
    const document = await schema.findByIdAndDelete(req.params.id);
    if (document) return res.json({ message: "success" });
    next(new AppError("no document for this Id", 404));
  };
};
const updateOne = (schema) => {
  return async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const document = await schema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (document) return res.status(200).json({ message: "success", document });
    next(new AppError("no document for Update", 404));
  };
};
export { createOne, getOne, getAll, deleteOne, updateOne };
