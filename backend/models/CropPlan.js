import mongoose from "mongoose";

const cropPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    cropName: String,
    season: String,
    location: String,
    landSize: String,

    soilRequirement: {
      type: Object,
      default: {}
    },

    seedInfo: {
      type: Object,
      default: {}
    },

    schedule: [
      {
        day: Number,
        task: String,
        important: Boolean
      }
    ],

    expectedYield: String,
    aiTips: [String]

  },
  { timestamps: true }
);

export default mongoose.model("CropPlan", cropPlanSchema);
