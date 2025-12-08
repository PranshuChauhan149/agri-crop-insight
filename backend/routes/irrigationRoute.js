import express from "express";
import { analyzeIrrigationPlan } from "../controllers/irrigationController.js";

const Irrirouter = express.Router();

Irrirouter.post("/irrigation-analysis", analyzeIrrigationPlan);

export default Irrirouter;
