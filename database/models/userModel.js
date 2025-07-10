import mongoose from "mongoose";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [2, "name is too short"],
      maxLength: [15, "name is to long"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      lowercase: true,
    },
    changeTimeAt: Date,
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    adresses: [
      {
        street: String,
        phone: Number,
        city: String,
      },
    ],
  },
  { timestamps: true }
);
schema.pre("save", function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, 8);
});
schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});
const userModel = mongoose.model("user", schema);

export { userModel };
