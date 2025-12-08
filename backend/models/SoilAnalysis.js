import mongoose from "mongoose";

const soilAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    input: {
      location: String,
      landType: String,
      temperature: String,
      climate: String,
      soilType: String,
      soilColor: String,
      image: String,
    },

    output: {
      soilHealthScore: Number,

      soilTemperature: String,

      npkLevels: {
        nitrogen: Number,
        phosphorus: Number,
        potassium: Number,
      },

      nutrientBalanceOverview: {
        nitrogen: Number,
        phosphorus: Number,
        potassium: Number,
      },

      soilDeficiencyPredictor: {
        name: String,
        impact: String,
        recommendation: String,
        severity: String,
      },

      recommendedCrops: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("SoilAnalysis", soilAnalysisSchema);
