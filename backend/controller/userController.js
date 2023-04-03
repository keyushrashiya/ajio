import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { errorResponse, successResponse } from "../helper/apiResponse.js";
import mailTransporter from "../helper/mailTransporter.js";
import userModel from "../model/user.js";

class userController {
  static registerUser = async (req, res) => {
    const { email, username, type, password } = req.body;
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const doc = new userModel({
        email: email,
        username: username,
        type: type,
        password: hashPassword,
      });
      const { _id } = await doc.save();
      const result = await userModel.findById(_id).select("-password");
      const link = jwt.sign({ userID: _id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "1d",
      });
      mailTransporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "welcome mail",
        html: `<h1>${username} thank you for joining us</h1><a href="${link}" target="_blank">${link}</a>`,
      });
      return successResponse(res, 201, "Success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static loginUser = async (req, res) => {
    try {
      return successResponse(res, 200, "Success", req.user);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static verifyUser = async (req, res) => {
    const { token } = req.params;
    try {
      const user = jwt.verify(
        token,
        process.env.JWT_PRIVATE_KEY,
        (err, decoded) => {
          return decoded;
        }
      );
      req.body.updated_at = Date.now();
      await userModel.findByIdAndUpdate(user.userID, {
        $set: { isVerify: true },
      });
      return successResponse(res, 200, "User verify successfully");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static changePasswordUser = async (req, res) => {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
      req.body.updated_at = Date.now();
      await userModel.findByIdAndUpdate(req.user._id, {
        $set: { password: hashPassword },
      });
      return successResponse(res, 200, "Change password successfully");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static forgotPasswordUser = async (req, res) => {
    const { email } = req.body;
    try {
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "1d",
        }
      );
      mailTransporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "forgot password",
        html: `<h1>why did you forgot your password..?</h1><a href=${token} target="_blank">${token}</a>`,
      });
      return successResponse(res, 201, "Success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static resetPasswordUser = async (req, res) => {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const { userId } = jwt.verify(
      req.params.token,
      process.env.JWT_PRIVATE_KEY,
      (err, decoded) => {
        return decoded;
      }
    );
    try {
      req.body.updated_at = Date.now();
      await userModel.findByIdAndUpdate(userId, {
        $set: { password: hashPassword },
      });
      return successResponse(res, 200, "reset password successfully");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };

  static editProfileUser = async (req, res) => {
    const { username } = req.body;
    try {
      req.body.updated_at = Date.now();
      await userModel.findByIdAndUpdate(req.user._id, {
        $set: { username: username },
      });
      return successResponse(res, 200, "profile update successfully");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
}

export default userController;
