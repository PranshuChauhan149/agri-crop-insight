import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeSoilImage = async (req, res) => {
  let imagePath;

  try {
    const { location, landType, temperature, climate, soilType, soilColor } =
      req.body;

    if (req.file) {
      imagePath = req.file.path;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an agricultural soil analysis engine.

INPUT DATA:
Location: ${location}
Land Type: ${landType}
Temperature: ${temperature}
Climate / Season: ${climate}
Soil Type: ${soilType}
Soil Color: ${soilColor}

Return ONLY strict JSON in the following format:

{
  "soilHealthScore": number (0 to 100),
  "soilTemperature": "temperature in °C",
  "npkLevels": {
    "nitrogen": number (0 to 100),
    "phosphorus": number (0 to 100),
    "potassium": number (0 to 100)
  },
  "nutrientBalanceOverview": {
    "nitrogen": number,
    "phosphorus": number,
    "potassium": number
  },
  "soilDeficiencyPredictor": {
    "name": "Phosphorus Deficiency / Nitrogen Deficiency / Potassium Deficiency / Magnesium Deficiency",
    "impact": "Short impact in 3-5 words",
    "recommendation": "Exact fertilizer name to add",
    "severity": "low / medium / high"
  },
  "recommendedCrops": ["crop1", "crop2", "crop3", "crop4"]
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

    return res.status(200).json({
      success: true,
      data: aiData,
    });
  } catch (error) {
    console.error("Soil AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Soil AI analysis failed",
      error: error.message,
    });
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};
