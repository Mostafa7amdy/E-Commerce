import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: true,
    },
    slug: {
      type: String,
      lowercase: [true, "too short brand name"],
      required: true,
    },
    logo: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
schema.post("init", (doc) => {
  doc.logo = "http://localhost:3000/uploads/" + doc.logo;
});
const brandModel = mongoose.model("brand", schema);
export { brandModel };
  