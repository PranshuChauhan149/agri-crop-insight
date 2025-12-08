import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/Db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

import soilRouter from "./routes/soilAIRoutes.js";
import pestRouter from "./routes/pestRoutes.js";
import airouter from "./routes/spectralRoute.js";
import Irrirouter from "./routes/irrigationRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", soilRouter);
app.use("/api/ai", pestRouter);
app.use("/api/ai", airouter);
app.use("/api/ai", Irrirouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
