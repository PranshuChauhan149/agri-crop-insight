import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PestAnalysis from "../models/PestAnalysis.js";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Gemini API key missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzePestAndFertilizer = async (req, res) => {
  let imagePath;

  try {
    const { plantName } = req.body;

    if (!plantName) {
      return res.status(400).json({
        success: false,
        message: "Plant name is required",
      });
    }

    if (req.file) {
      imagePath = req.file.path;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a plant disease prediction and fertilizer recommendation engine.

INPUT DATA:
Plant Name: ${plantName}

If image is provided, analyze the image too.

Return ONLY strict JSON in this format:

{
  "plantOverview": {
    "plantName": "name",
    "plantType": "climber / creeper / vegetable / flower / tree"
  },
  "possibleDisease": "name of the disease",
  "diseaseCause": "why this disease occurs",
  "safeSpraySuggestions": [
    "spray1",
    "spray2",
    "spray3"
  ],
  "recommendedFertilizers": [
    {
      "name": "fertilizer name",
      "dosage": "exact dosage",
      "timing": "best time for application"
    }
  ],
  "applicationGuide": [
    {
      "heading": "Step 1 title",
      "content": "Step 1 detailed instruction"
    },
    {
      "heading": "Step 2 title",
      "content": "Step 2 detailed instruction"
    },
    {
      "heading": "Step 3 title",
      "content": "Step 3 detailed instruction"
    },
    {
      "heading": "Step 4 title",
      "content": "Step 4 detailed instruction"
    }
  ],
  "proTip": "one simple farming tip in one short line"
}

IMPORTANT RULES:
- Do NOT add explanation
- Do NOT add markdown
- Do NOT add headings outside JSON
- Return ONLY pure valid JSON
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

    await PestAnalysis.create({
      user: req?.userId,
      input: { plantName },
      output: aiData,
    });

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error) {
    console.error("Pest AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Pest AI analysis failed",
      error: error.message,
    });
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};
