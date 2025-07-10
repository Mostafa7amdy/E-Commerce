import { catchError } from "../../middleware/catchError.js";

export const deleteOne =  (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    document && res.json({ message: "success" });
    !document && res.status(404).json({ message: "NOT FOUND" });
  });
};
