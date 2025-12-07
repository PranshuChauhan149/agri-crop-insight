import express from "express";
import { pestPredictionAI,  } from "../controllers/pestPredictionController.js";

const pestRouter = express.Router();

pestRouter.post("/predict", pestPredictionAI);


export default pestRouter;
