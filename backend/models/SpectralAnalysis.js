import mongoose from "mongoose";

const spectralAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    input: {
      temperature: String,
      climate: String,
      fieldName: String,
      cropType: String,
      location: String,
      landType: String,
      farmingType: String,
      analysisType: String,
      image: String,
    },

    output: {
      vegetationHeatmaps: {
        ndvi: String,
        ndre: String,
        gndvi: String,
      },

      cropHealthScore: Number,
      canopyCoverPercentage: Number,

      diseaseDetectionMap: [String],

      aiRecommendations: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("SpectralAnalysis", spectralAnalysisSchema);
