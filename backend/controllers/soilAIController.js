import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeSoilImage = async (req, res) => {
  let imagePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No soil image uploaded",
      });
    }

    const { location } = req.body;

    imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);

    // ✅ STABLE VISION MODEL
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ✅ SOIL + LOCATION SMART PROMPT
    const prompt = `
You are a soil science expert.

Location: ${location}

Analyze this soil image and give a complete farmer-friendly soil health report with:

1. Soil type (clay, sandy, loamy, black, red etc.)
2. Estimated soil moisture condition
3. Estimated soil pH condition (acidic, neutral, alkaline)
4. Fertility level (low, medium, high)
5. Which crops are suitable for this soil
6. Which crops should be avoided
7. Fertilizer recommendation (organic + chemical)
8. Water holding capacity advice
9. Major soil problems (salinity, erosion, compaction if any)
10. Improvement tips to make soil more productive

Use simple farmer-friendly language.
`;

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

    return res.status(200).json({
      success: true,
      analysis: response,
    });
  } catch (error) {
    console.error("Soil Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: "Soil Image AI failed",
      error: error.message,
    });
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};
