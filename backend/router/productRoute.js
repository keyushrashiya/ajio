import express from "express";
import productController from "../controller/productController.js";
import productValidate from "../validator/productValidate.js";

const route = express.Router();

route.get("/wishlist", productController.getWishlist);
route.post("/wishlist/:id", productController.addToWishlist);
route.get("/cart", productController.getCart);
route.post("/cart/:id", productController.addToCart);

route.get("/category", productController.getCategories);
route.delete("/category/:id", productController.deleteCategories);

route.post("/", productValidate.createProduct, productController.createProduct);
route.patch(
  "/:id",
  productValidate.updateProduct,
  productController.updateProduct
);
route.get("/:id?", productController.getProduct);
route.delete("/:id", productController.deleteProduct);

// Category
route.post(
  "/category",
  productValidate.createProCategory,
  productController.createCategories
);
route.patch(
  "/category/:id",
  productValidate.updateProCategory,
  productController.updateCategories
);

export default route;
