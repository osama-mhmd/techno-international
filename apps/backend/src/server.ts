import dotenv from "dotenv";
dotenv.config();

import express from "express";
import auth from "./routes/auth";
import admins from "./routes/admins";
import pages from "./routes/pages";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", auth);
app.use("/admins", admins);
app.use("/pages", pages);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT! || 4000;

app.listen(PORT, () => console.log("Server running on port " + PORT));
