import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      minLength: [2, "text is too short"],
      maxLength: [200, "text is too long"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function(){
 this.populate('user','name -_id')
});

const reviewModel = mongoose.model("review", schema);

export { reviewModel };
