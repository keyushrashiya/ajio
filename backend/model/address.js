import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true },
  phone: { type: Number, required: true },
  type: {
    type: String,
    enum: ["HOME", "OFFICE", "OTHER"],
    required: true,
  },
  ref_user: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const addressModel = mongoose.model("address", addressSchema);

export default addressModel;
