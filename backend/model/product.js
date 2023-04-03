import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
  title: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const productSchema = mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  product_image: { type: String, trim: true, required: true },
  manufacturer: { type: String, trim: true, required: true },
  brand: { type: String, trim: true, required: true },
  stocks: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  is_draft: { type: Boolean, default: true },
  category: { type: String, required: true },
  short_description: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const categoriesModel = mongoose.model("categories", CategoriesSchema);
const productModel = mongoose.model("products", productSchema);

export { categoriesModel, productModel };
