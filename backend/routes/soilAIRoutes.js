import express from "express";
import multer from "multer";
import { analyzeSoilImage } from "../controllers/soilAIController.js";
import isAuth from "../middlewares/isAuth.js";

const soilRouter = express.Router();
const upload = multer({ dest: "uploads/" });

soilRouter.post("/soil-analysis", upload.single("image"),isAuth, analyzeSoilImage);

export default soilRouter;
