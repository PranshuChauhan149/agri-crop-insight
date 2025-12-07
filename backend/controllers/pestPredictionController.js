import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const pestPredictionAI = async (req, res) => {
  try {
    const {
      temperature,
      humidity,
      rainfall,
      windSpeed,
      windDirection,
      location,
      scenario,
    } = req.body;

    // ✅ FIXED & WORKING MODEL
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ✅ 50 WORDS + STRUCTURED OUTPUT PROMPT
    const prompt = `
You are an agriculture AI.
Give output in EXACTLY this JSON format, in under 50 words, simple English:

{
  "pestRisk": "Low/Medium/High",
  "diseaseRiskPercent": "number%",
  "spray": "short name",
  "prevention": "one simple line",
  "forecast7Days": "Low/Medium/High trend",
  "migrationRisk": "Low/Medium/High"
}

Data:
Location: ${location}
Temperature: ${temperature}C
Humidity: ${humidity}%
Rainfall: ${rainfall}mm
Wind Speed: ${windSpeed}km/h
Wind Direction: ${windDirection}
Scenario: ${scenario || "Normal"}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.status(200).json({
      success: true,
      report: response,
    });

  } catch (error) {
    console.error("Pest AI Error:", error);
    res.status(500).json({
      success: false,
      message: "Pest AI Prediction Failed",
      error: error.message,
    });
  }
};
