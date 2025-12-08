import mongoose from "mongoose";

const pestAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    input: {
      plantName: String,
      image: String,
    },

    output: {
      plantOverview: {
        plantName: String,
        plantType: String,
      },

      possibleDisease: String,
      diseaseCause: String,

      safeSpraySuggestions: [String],

      recommendedFertilizers: [
        {
          name: String,
          dosage: String,
          timing: String,
        },
      ],

      applicationGuide: [
        {
          heading: String,
          content: String,
        },
      ],

      proTip: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PestAnalysis", pestAnalysisSchema);
