import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("API is running...");
});

app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.use("/api/auth",authRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});