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
class addressValidate {
  static createAddress = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      name: Joi.string().required().label("name"),
      address: Joi.string().required().label("address"),
      phone: Joi.number().required().label("phone"),
      type: Joi.string()
        .required()
        .label("type")
        .valid("HOME", "OFFICE", "OTHER"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
  static updateAddress = (req, res, next) => {
    const validateSchema = Joi.object().keys({
      name: Joi.string().empty().label("name"),
      address: Joi.string().empty().label("address"),
      phone: Joi.number().empty().label("phone"),
      type: Joi.string().empty().label("type").valid("HOME", "OFFICE", "OTHER"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
}
export default addressValidate;
