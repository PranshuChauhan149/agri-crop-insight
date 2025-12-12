import { GoogleGenerativeAI } from "@google/generative-ai";
import IrrigationPlan from "../models/IrrigationPlan.js";
import User from "../models/User.model.js";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Gemini API key missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeIrrigationPlan = async (req, res) => {
  try {
    const {
      soilType,
      soilTemperature,
      fieldArea,
      irrigationMethod,
      cropType,
      cropStage,
      weatherTemperature,
      irrigationTimePreference,
    } = req.body;

    if (
      !soilType ||
      !soilTemperature ||
      !fieldArea ||
      !irrigationMethod ||
      !cropType ||
      !cropStage ||
      !irrigationTimePreference
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required irrigation inputs",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI irrigation planning system.

INPUT DATA:
Soil Type: ${soilType}
Soil Temperature: ${soilTemperature}°C
Field Area: ${fieldArea}
Irrigation Method: ${irrigationMethod}
Crop Type: ${cropType}
Crop Growth Stage: ${cropStage}
Weather Temperature: ${weatherTemperature || "Not provided"}
Irrigation Time Preference: ${irrigationTimePreference}

Return ONLY strict JSON in this exact format:

{
  "requiredWaterVolume": "exact liters required today",
  "irrigationDuration": "exact irrigation run time",
  "irrigationStartTime": "best time of day to start irrigation",
  "sevenDayIrrigationSchedule": [
    { "day": "Day 1", "water": "liters", "duration": "time", "startTime": "time" },
    { "day": "Day 2", "water": "liters", "duration": "time", "startTime": "time" },
    { "day": "Day 3", "water": "liters", "duration": "time", "startTime": "time" },
    { "day": "Day 4", "water": "liters", "duration": "time", "startTime": "time" },
    { "day": "Day 5", "water": "liters", "duration": "time", "startTime": "time" },
    { "day": "Day 6", "water": "liters", "duration": "time", "startTime": "time" },
    { "day": "Day 7", "water": "liters", "duration": "time", "startTime": "time" }
  ],
  "soilMoistureProjection": "one-line moisture forecast after irrigation",
  "aiRecommendations": [
    "short irrigation recommendation 1",
    "short irrigation recommendation 2",
    "short irrigation recommendation 3"
  ]
}

IMPORTANT RULES:
- Do NOT return explanations
- Do NOT return markdown
- Do NOT return any extra text
- Return ONLY valid raw JSON
`;

    const result = await model.generateContent(prompt);

    let rawText = result.response.text().trim();

    rawText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let aiData;
    try {
      aiData = JSON.parse(rawText);
    } catch {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    const irrigation = await IrrigationPlan.create({
      user: req?.userId,
      input: req.body,
      output: aiData,
    });

    // IrrigationPlan.create(...) ke turant baad ye ADD karo
    await User.findByIdAndUpdate(req?.userId, {
      $push: {
        history: {
          analysisType: "IrrigationPlan",
          analysisId: irrigation._id,
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error) {
    console.error("Irrigation AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Irrigation AI analysis failed",
      error: error.message,
    });
  }
};
