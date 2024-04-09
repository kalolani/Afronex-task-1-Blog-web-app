import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    author: String,
    expertise: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

export default PostModel;
