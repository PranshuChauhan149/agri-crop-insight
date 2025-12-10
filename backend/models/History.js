import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    
  },
  { timestamps: true }
);
