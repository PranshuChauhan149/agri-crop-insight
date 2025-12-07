import express from "express";
import { generateCropPlan } from "../controllers/cropAIController.js";

const croprouter = express.Router();

croprouter.post("/generate", generateCropPlan);

export default croprouter;
