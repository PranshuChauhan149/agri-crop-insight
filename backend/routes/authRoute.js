import express from "express";

import { currentUser } from "../controllers/currentUser.js";
import isAuth from "../middlewares/isAuth.js";

const authRouter = express.Router();

authRouter.get("/current", isAuth, currentUser);

export default authRouter;
