import { errorResponse, successResponse } from "../helper/apiResponse.js";
import { categoriesModel, productModel } from "../model/product.js";
import userModel from "../model/user.js";
import fs from "fs";
import { join } from "path";

class productController {
  static createProduct = async (req, res) => {
    const { product_image } = req.body;
    try {
      const doc = new productModel(req.body);
      if (product_image) {
        const buffer = Buffer(product_image, "base64");
        const fileName = Date.now() + "product.jpg";
        const filepath = join(process.cwd(), "upload", "product", fileName);
        fs.writeFileSync(filepath, buffer, (err) => {
          return errorResponse(res, 400, "error", err);
        });
        doc.product_image = filepath;
      }

      const result = await doc.save();
      return successResponse(res, 201, "Product create successfully", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static updateProduct = async (req, res) => {
    const { product_image } = req.body;
    try {
      if (product_image) {
        const old_product_image = await productModel
          .findById(req.params.id)
          .select("product_image");
        fs.unlinkSync(old_product_image.product_image);
        const buffer = Buffer(product_image, "base64");
        const fileName = Date.now() + "product.jpg";
        const filepath = join(process.cwd(), "upload", "product", fileName);
        fs.writeFileSync(filepath, buffer, (err) => {
          return errorResponse(res, 400, "error", err);
        });
        req.body.product_image = filepath;
      }
      req.body.updated_at = Date.now();
      const result = await productModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return successResponse(res, 201, "Product create successfully", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static getProduct = async (req, res) => {
    const { id } = req.params;

    const pagination = {
      page: req.query.page || 0,
      limit: req.query.limit || 10,
    };
    try {
      var result;
      if (id) {
        result = await productModel.findById(id);
      } else {
        result = await productModel
          .find()
          .limit(pagination.limit)
          .skip(pagination.page * pagination.limit);
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await productModel.findByIdAndDelete(id);
      fs.unlinkSync(result.product_image);
      for (let i = 0; i < result.product_gallery.length; i++) {
        const element = result.product_gallery[i];
        fs.unlinkSync(element);
      }
      return successResponse(res, 200, "product delete success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static createCategories = async (req, res) => {
    try {
      const doc = new categoriesModel({
        title: req.body.title,
      });
      const result = await doc.save();
      return successResponse(res, 201, "Category create successfully", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static updateCategories = async (req, res) => {
    try {
      req.body.updated_at = Date.now();
      const result = await categoriesModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { title: req.body.title },
        },
        { new: true }
      );
      return successResponse(res, 201, "Category update successfully", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static getCategories = async (req, res) => {
    try {
      const result = await categoriesModel.find();
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static deleteCategories = async (req, res) => {
    try {
      const result = await categoriesModel.findByIdAndDelete(req.params.id);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static addToWishlist = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await userModel.findById(req.user._id);
      const check = result.wishlist.some((item) => {
        return item === id;
      });
      if (check) {
        await userModel.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { wishlist: id },
          },
          { new: true }
        );
      } else {
        result.wishlist.push(id);
      }
      await result.save();
      return successResponse(res, 200, "success", result);
    } catch (error) {
      console.log("error", error);
      return errorResponse(res, 400, "error");
    }
  };
  static getWishlist = async (req, res) => {
    try {
      const result = [];
      const { wishlist } = await userModel
        .findById(req.user._id)
        .select("wishlist");
      for (let i = 0; i < wishlist.length; i++) {
        const data = await productModel.findById(wishlist[i]);
        result.push(data);
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      console.log("error", error);
      return errorResponse(res, 400, "error");
    }
  };

  static addToCart = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await userModel.findById(req.user._id);
      const check = result.cart.some((item) => {
        return item === id;
      });
      if (check) {
        await userModel.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { cart: id },
          },
          { new: true }
        );
      } else {
        result.cart.push(id);
      }
      await result.save();
      return successResponse(res, 200, "success", result);
    } catch (error) {
      console.log("error", error);
      return errorResponse(res, 400, "error");
    }
  };

  static getCart = async (req, res) => {
    try {
      const result = [];
      const { cart } = await userModel.findById(req.user._id).select("cart");
      for (let i = 0; i < cart.length; i++) {
        const data = await productModel.findById(cart[i]);
        result.push(data);
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      console.log("error", error);
      return errorResponse(res, 400, "error");
    }
  };
}
export default productController;
