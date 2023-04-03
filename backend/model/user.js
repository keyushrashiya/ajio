import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true },
  username: { type: String, trim: true, required: true },
  type: {
    type: String,
    enum: ["SELLER", "BUYER", "ADMIN", "SUB_ADMIN"],
    required: true,
  },  
  password: { type: String, required: true },
  wishlist: { type: Array },
  cart: { type: Array },
  isVerify: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
