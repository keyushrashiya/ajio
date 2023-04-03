import Joi from "joi";
import { validateResponse } from "../helper/apiResponse.js";

const options = {
  abortEarly: false,
  error: {
    wrap: {
      label: "",
    },
  },
};
class productValidate {
  static createProduct = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().required().label("title"),
      description: Joi.string().required().label("description"),
      product_image: Joi.string().required().label("product_image"),
      manufacturer: Joi.string().required().label("manufacturer"),
      brand: Joi.string().required().label("brand"),
      stocks: Joi.number().required().label("stocks"),
      price: Joi.number().required().label("price"),
      discount: Joi.number().label("discount"),
      orders: Joi.number().label("orders"),
      is_draft: Joi.boolean().label("is_draft"),
      category: Joi.string().required().label("category"),
      short_description: Joi.string().label("short_description"),
      tags: Joi.array().label("tags"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
  static updateProduct = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().empty().label("title"),
      description: Joi.string().empty().label("description"),
      product_image: Joi.string().empty().label("product_image"),
      product_gallery: Joi.array().label("product_gallery"),
      manufacturer: Joi.string().empty().label("manufacturer"),
      brand: Joi.string().empty().label("brand"),
      stocks: Joi.number().empty().label("stocks"),
      price: Joi.number().empty().label("price"),
      discount: Joi.number().label("discount"),
      orders: Joi.number().label("orders"),
      is_draft: Joi.boolean().label("is_draft"),
      category: Joi.string().empty().label("category"),
      short_description: Joi.string().label("short_description"),
      tags: Joi.array().label("tags"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };

  static createProCategory = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().required().label("title"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
  static updateProCategory = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().empty().label("title"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
}
export default productValidate;
