import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use("/", (req, res) => {
  res.send("server is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on this PORT: ${PORT} `);
});
