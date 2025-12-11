import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },
    location: {
      type: String,
    },
    resetOtp: {
      type: String,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    otpExpires: {
      type: Date,
    },

    history: [
      {
        analysisType: {
          type: String,
          enum: [
            "SpectralAnalysis",
            "SoilAnalysis",
            "PestAnalysis",
            "IrrigationPlan",
          ],
        },

        analysisId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "history.analysisType",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
