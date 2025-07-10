import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "must be required"],
      required: true,
      minLength: [2, "title is too short"],
      maxLength: [200, "title is too long"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      minLength: [2, "description is too short"],
      maxLength: [300, "description is too long"],
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceAfterDescount: {
      type: Number,
      required: true,
      min: 0,
    },
    imgCover: String,
    images: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sold: Number,
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: {
      type: Number,
      min: 0,
      max: 5,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
schema.post("init", (doc) => {
  if (doc.imgCover || doc.images)
    doc.imgCover = "http://localhost:3000/uploads/" + doc.imgCover;
  doc.images = doc.images?.map((img) => "http://localhost:3000/uploads" + img);
});

schema.virtual("myReviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
schema.pre("findOne", function () {
  this.populate("myReviews");
});

const productModel = mongoose.model("product", schema);
export { productModel };
