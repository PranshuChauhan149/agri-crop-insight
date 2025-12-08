import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SpectralAnalysis from "../models/SpectralAnalysis.js";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Gemini API key missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeSpectralData = async (req, res) => {
  let imagePath;

  try {
    const {
      temperature,
      climate,
      fieldName,
      cropType,
      location,
      landType,
      farmingType,
      analysisType,
    } = req.body;

    if (!fieldName || !cropType || !analysisType) {
      return res.status(400).json({
        success: false,
        message: "Missing required spectral inputs",
      });
    }

    if (req.file) {
      imagePath = req.file.path;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an agricultural spectral analysis engine.

INPUT DATA:
Field: ${fieldName}
Crop Type: ${cropType}
Location: ${location}
Land Type: ${landType}
Farming Type: ${farmingType}
Temperature: ${temperature}
Climate: ${climate}
Analysis Type: ${analysisType}

If image is provided, analyze it as a satellite/drone crop image.

Return ONLY strict JSON in this format:

{
  "vegetationHeatmaps": {
    "ndvi": "low / medium / high vegetation zones",
    "ndre": "low / medium / high red-edge response",
    "gndvi": "low / medium / high green vegetation response"
  },
  "cropHealthScore": number (0 to 100),
  "canopyCoverPercentage": number (0 to 100),
  "diseaseDetectionMap": [
    "Blight",
    "Rust",
    "Mildew",
    "Leaf Spot"
  ],
  "aiRecommendations": [
    "short action sentence 1",
    "short action sentence 2",
    "short action sentence 3"
  ]
}

IMPORTANT RULES:
- Do NOT return explanation
- Do NOT return markdown
- Do NOT return text outside JSON
- Return ONLY valid raw JSON
`;

    let result;

    if (req.file) {
      const imageBuffer = fs.readFileSync(imagePath);

      result = await model.generateContent([
        { text: prompt },
        {
          inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType: req.file.mimetype,
          },
        },
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    const rawText = result.response.text().trim();

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

    await SpectralAnalysis.create({
      user: req?.userId,
      input: req.body,
      output: aiData,
    });

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error) {
    console.error("Spectral AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Spectral analysis failed",
      error: error.message,
    });
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};
