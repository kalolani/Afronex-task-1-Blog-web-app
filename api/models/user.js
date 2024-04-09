import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const UserModel = model("User", UserSchema);

export default UserModel;
