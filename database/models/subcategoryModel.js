import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "must be require"],
      trim: true,
      minLength: [2, "name is too short"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
     createdBy:{
          type: mongoose.Types.ObjectId,
          ref:'user'
        }
  },
  { timestamps: true }
);
const subcategoryModel = mongoose.model("subcategory", schema);
export { subcategoryModel };
