import express from "express";
import { analyzePestAndFertilizer } from "../controllers/pestPredictionController.js";
import multer from "multer";

const pestRouter = express.Router();
const upload = multer({ dest: "uploads/" });
pestRouter.post(
  "/pest-analysis",
  upload.single("image"),
  analyzePestAndFertilizer
);

// soilRouter.post("/pest-analysis", upload.single("image"), analyzeSoilImage);

export default pestRouter;
