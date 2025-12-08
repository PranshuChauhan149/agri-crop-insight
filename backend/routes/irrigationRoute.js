import express from "express";
import { analyzeIrrigationPlan } from "../controllers/irrigationController.js";
import isAuth from "../middlewares/isAuth.js";

const Irrirouter = express.Router();

Irrirouter.post("/irrigation-analysis", isAuth, analyzeIrrigationPlan);

export default Irrirouter;
