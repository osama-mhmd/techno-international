import dotenv from "dotenv";
dotenv.config();

import express from "express";
import auth from "./routes/auth";
import admins from "./routes/admins";
import pages from "./routes/pages";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use("/auth", auth);
app.use("/admins", admins);
app.use("/pages", pages);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT! || 4000;

app.listen(PORT, () => console.log("Server running on port " + PORT));
