import express from "express";

import {
  googleAuth,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.post("/signUp", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/google-auth", googleAuth);
userRouter.put(
  "/update-profile",
  isAuth,
  upload.single("image"),
  updateProfile
);
export default userRouter;
