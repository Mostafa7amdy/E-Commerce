import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "must be unique"],
      required: true,
      trim: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
schema.post("init", (doc) => {
  doc.image = "http://localhost:3000/uploads/" + doc.image;
});
const categoryModel = mongoose.model("category", schema);
export { categoryModel };
