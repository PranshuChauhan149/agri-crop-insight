import express from "express";

import { login, logout, register } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post("/signUp", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
