import Joi from "joi";
import { validateResponse } from "../helper/apiResponse.js";
import userModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const options = {
  abortEarly: false,
  error: {
    wrap: {
      label: "",
    },
  },
};

class userValidate {
  static registerVal = async (req, res, next) => {
    const validationSchema = Joi.object().keys({
      email: Joi.string().email().required().label("email"),
      username: Joi.string().required().label("username"),
      type: Joi.string()
        .required()
        .valid("SELLER", "BUYER", "ADMIN", "SUB_ADMIN")
        .label("type"),
      password: Joi.string().required().label("password"),
      confirm_password: Joi.ref("password"),
    });
    const { error } = validationSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    const result = await userModel.findOne({ email: req.body.email });
    if (result !== null) {
      const errOjb = {
        details: [
          {
            path: "email",
            message: "email is already exist",
          },
        ],
      };
      return validateResponse(res, errOjb);
    }
    next();
  };
  static editProfileVal = async (req, res, next) => {
    const validationSchema = Joi.object().keys({
      username: Joi.string().empty().label("username"),
    });
    const { error } = validationSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };

  static loginVal = async (req, res, next) => {
    const validationSchema = Joi.object().keys({
      email: Joi.string().email().required().label("email"),
      password: Joi.string().required().label("email"),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return validateResponse(res, error);
    }
    const result = await userModel.findOne({ email: req.body.email });
    if (result === null) {
      const errorObj = {
        details: [
          {
            path: "email",
            message: "user with this email dose not exist",
          },
        ],
      };
      return validateResponse(res, errorObj);
    } else {
      const verify = await bcrypt.compare(req.body.password, result.password);
      if (!verify) {
        const errorObj = {
          details: [
            {
              path: "email",
              message: "Email or password is invalid",
            },
          ],
        };
        return validateResponse(res, errorObj);
      } else if (!result.isVerify) {
        const errorObj = {
          details: [
            {
              path: "email",
              message: "Please verify your email first",
            },
          ],
        };
        return validateResponse(res, errorObj);
      } else {
        const token = jwt.sign(
          { userId: result._id },
          process.env.JWT_PRIVATE_KEY
        );
        const user = await userModel.findById(result._id).select("-password");
        req.user = { user, token: token };
        next();
      }
    }
  };

  static changePasswordVal = async (req, res, next) => {
    const validationSchema = Joi.object().keys({
      old_password: Joi.string().required().label("old_password"),
      password: Joi.string()
        .required()
        .invalid(Joi.ref("old_password"))
        .label("password"),
      confirm_password: Joi.ref("password"),
    });
    const { error } = validationSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    const { password } = await userModel
      .findOne(req.user._id)
      .select("password");
    const comparePassword = await bcrypt.compare(
      req.body.old_password,
      password
    );
    if (!comparePassword) {
      const errObj = {
        details: [
          {
            path: "old_password",
            message: "old Password does not matched",
          },
        ],
      };
      return validateResponse(res, errObj);
    }
    next();
  };

  static forgotPasswordVal = async (req, res, next) => {
    const validationSchema = Joi.object().keys({
      email: Joi.string().required().email().label("email"),
    });
    const { error } = validationSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      const errObj = {
        details: [
          {
            path: "email",
            message: "User not found",
          },
        ],
      };
      return validateResponse(res, errObj);
    }
    req.user = user;
    next();
  };

  static resetPasswordVal = async (req, res, next) => {
    const validationSchema = Joi.object().keys({
      password: Joi.string().required().label("password"),
      confirm_password: Joi.ref("password"),
    });
    const { error } = validationSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    }
    next();
  };
}
export default userValidate;
