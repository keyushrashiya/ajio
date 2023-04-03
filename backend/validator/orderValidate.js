import Joi from "joi";
import { validateResponse } from "../helper/apiResponse.js";

const options = {
  abortEarly: false,
};

class orderValidate {
  static createOrdVal = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      first_name: Joi.string().required().label("first_name"),
      last_name: Joi.string().required().label("last_name"),
      email: Joi.string().email().label("email"),
      phone: Joi.number().required().label("phone"),
      country: Joi.string().required().label("country"),
      state: Joi.string().required().label("state"),
      address: Joi.string().required().label("address"),
      zipcode: Joi.string().required().label("zipcode"),
      address_type: Joi.string().required().label("address_type"),
      shipping_method: Joi.string().required().label("shipping_method"),
      name: Joi.string().required().label("name"),
      card_number: Joi.number().required().label("card_number"),
      expire: Joi.string().required().label("expire"),
      cvv: Joi.number().required().label("cvv"),
      status: Joi.string()
        .label("status")
        .valid("PENDING", "ONGOING", "CANCELED", "COMPLETE"),
      orders: Joi.array()
        .required()
        .label("orders")
        .items({
          id: Joi.string().required().label("id"),
          price: Joi.number().required().label("price"),
          quantity: Joi.number().required().label("quantity"),
        }),
      discount: Joi.number().label("discount"),
      shipping_charge: Joi.number().label("shipping_charge"),
      tax: Joi.number().label("tax"),
      total: Joi.number().required().label("total"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
  static updateOrdVal = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      status: Joi.string()
        .empty()
        .label("status")
        .valid("PENDING", "ONGOING", "CANCELED", "COMPLETE"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
}
export default orderValidate;
