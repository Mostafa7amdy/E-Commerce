import mongoose from "mongoose";
export const connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/Ecommerce")
    .then(() => console.log("dataBase Connection..."))
    .catch((err) => console.log("database error", err));
};
