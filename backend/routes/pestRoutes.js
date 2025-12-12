import express from "express";
import { analyzePestAndFertilizer } from "../controllers/pestPredictionController.js";
import multer from "multer";
import isAuth from "../middlewares/isAuth.js";

const pestRouter = express.Router();
const upload = multer({ dest: "uploads/" });
pestRouter.post(
  "/pest-analysis",
  upload.single("image"),
  isAuth,
  analyzePestAndFertilizer
);

// soilRouter.post("/pest-analysis", upload.single("image"), analyzeSoilImage);

export default pestRouter;
