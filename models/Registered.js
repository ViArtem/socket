import { Schema, model } from "mongoose";
const shemRegist = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

export default model("UserRegistered", shemRegist);
