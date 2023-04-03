import express from "express";
import userController from "../controller/userController.js";
import userValidate from "../validator/userValidate.js";
import { validateToken } from "../validator/tokenValidate.js";
const route = express.Router();

route.post("/register", userValidate.registerVal, userController.registerUser);
route.post("/login", userValidate.loginVal, userController.loginUser);
route.get("/verify/:token", userController.verifyUser);
route.post(
  "/forgot-password",
  userValidate.forgotPasswordVal,
  userController.forgotPasswordUser
);
route.patch(
  "/reset-password/:token",
  userValidate.resetPasswordVal,
  userController.resetPasswordUser
);

// Auth Protected
route.patch(
  "/change-password",
  validateToken,
  userValidate.changePasswordVal,
  userController.changePasswordUser
);
route.patch(
  "/edit-profile",
  validateToken,
  userValidate.editProfileVal,
  userController.editProfileUser
);

export default route;
