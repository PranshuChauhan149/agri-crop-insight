// models/Farm.js
const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema(
  {
    // Kis user ka farm hai
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    location: {
      type: String, // simple: "Village, District, State"
      required: true,
    },

    cropType: {
      type: String,
      required: true,
    },

    // Farm ka area or size (optional)
    area: {
      type: Number, // acres / hectare
      default: 1,
    },

    // Images that the user uploads for AI analysis
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Imagery",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", FarmSchema);
