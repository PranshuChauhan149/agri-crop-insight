import express from "express";

import {
  googleAuth,
  login,
  logout,
  register,
  resetPassword,
  sendContactMessage,
  sendOtp,
  updateProfile,
  verifyOtp,
} from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.post("/signUp", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify", verifyOtp);
userRouter.post("/reset-password", resetPassword);

userRouter.post("/google-auth", googleAuth);
userRouter.put(
  "/update-profile",
  isAuth,
  upload.single("image"),
  isAuth,
  updateProfile
);
userRouter.post("/contact", sendContactMessage);
export default userRouter;
