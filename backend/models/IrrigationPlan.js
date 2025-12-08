import mongoose from "mongoose";

const irrigationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:"sdsad"
    },

    input: {
      soilType: String,
      soilTemperature: String,
      fieldArea: String,
      irrigationMethod: String,
      cropType: String,
      cropStage: String,
      weatherTemperature: String,
      irrigationTimePreference: String,
    },

    output: {
      requiredWaterVolume: String,
      irrigationDuration: String,
      irrigationStartTime: String,

      sevenDayIrrigationSchedule: [
        {
          day: String,
          water: String,
          duration: String,
          startTime: String,
        },
      ],

      soilMoistureProjection: String,

      aiRecommendations: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("IrrigationPlan", irrigationSchema);
