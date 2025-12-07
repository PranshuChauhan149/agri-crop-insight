import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzePlantImage = async (req, res) => {
  let imagePath;

  try {
    // ✅ 1. IMAGE VALIDATION
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // ✅ 2. TEXT DATA FROM FRONTEND (SOIL + WEATHER)
    const { soilMoisture, soilPH, temperature, humidity, cropName } = req.body;

    imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);

    // ✅ ✅ STABLE & WORKING VISION MODEL
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ✅ ✅ SMART COMBINED PROMPT (IMAGE + SOIL + WEATHER)
    const prompt = `
You are an expert agriculture AI.

Crop Name: ${cropName || "Not provided"}
Soil Moisture: ${soilMoisture || "Not provided"}
Soil pH: ${soilPH || "Not provided"}
Temperature: ${temperature || "Not provided"}
Humidity: ${humidity || "Not provided"}

Now analyze the given plant image and give a complete farmer-friendly report with:

1. Disease name
2. Pest name (if any)
3. Confidence %
4. Treatment
5. Spray recommendation
6. Prevention tips
7. Soil condition suggestion
8. Watering advice

Respond in simple, easy-to-understand farmer language.
`;

    // ✅ ✅ GEMINI IMAGE + TEXT CALL
    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: req.file.mimetype,
        },
      },
    ]);

    const response = result.response.text();

    // ✅ ✅ FINAL RESPONSE TO FRONTEND
    return res.status(200).json({
      success: true,
      analysis: response,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: "Gemini Image AI failed",
      error: error.message,
    });
  } finally {
    // ✅ 3. IMAGE CLEANUP (ALWAYS)
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};
