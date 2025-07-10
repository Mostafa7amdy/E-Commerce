import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    type: string,
  },
  description: {
    type: string,
  },
},
{timestamps: true}
);
const postModel = mongoose.model("posts" , schema);
export {postModel};