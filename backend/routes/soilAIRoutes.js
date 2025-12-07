import express from "express";
import multer from "multer";
import { analyzeSoilImage } from "../controllers/soilAIController.js";

const soilRouter = express.Router();
const upload = multer({ dest: "uploads/" });

soilRouter.post("/soil-analysis", upload.single("image"), analyzeSoilImage);

export default soilRouter;
