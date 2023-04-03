import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String },
  phone: { type: Number, required: true },
  address: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    zipcode: { type: Number, required: true },
    address_type: { type: String, required: true },
  },
  shipping_method: { type: String, required: true },
  payment_info: {
    name: { type: String, trim: true, required: true },
    card_number: { type: Number, required: true },
    expire: { type: String, required: true },
    cvv: { type: Number, required: true },
  },
  status: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "ONGOING", "CANCELED", "COMPLETE"],
  },
  orders: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  discount: { type: Number },
  shipping_charge: { type: Number },
  tax: { type: Number },
  total: { type: Number, required: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
