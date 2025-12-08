import express from "express";
import multer from "multer";

import { analyzeSpectralData } from "../controllers/spectralController.js";

const airouter = express.Router();

const upload = multer({ dest: "uploads/" });

airouter.post(
  "/spectral-analysis",
  upload.single("image"),
  analyzeSpectralData
);
export default airouter;
