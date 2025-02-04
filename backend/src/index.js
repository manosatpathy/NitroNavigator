import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/api/test", (req, res) => {
    return res.json({ message: "Hello from express app" });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
