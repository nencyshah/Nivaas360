import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  avatar: {
      type: String,
      default: '/src/access_tokens/profile.png' // Default avatar path
  },
},{timestamps: true});    

const User = mongoose.model("User", userSchema); 
export default User;