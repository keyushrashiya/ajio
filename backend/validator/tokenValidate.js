import { successResponse, errorResponse } from "../helper/apiResponse.js";
import jwt from "jsonwebtoken";
import userModel from "../model/user.js";

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];
      const user = jwt.verify(
        token,
        process.env.JWT_PRIVATE_KEY,
        (err, decoded) => {
          return decoded;
        }
      );
      const result = await userModel.findById(user.userId).select("-password");
      req.user = result;
      req.token = token;
      next();
    } else {
      return errorResponse(
        res,
        400,
        "authentication credentials are missing or invalid"
      );
    }
  } catch (error) {
    return errorResponse(
      res,
      400,
      "authentication credentials are missing or invalid"
    );
  }
};

export default validateToken;
