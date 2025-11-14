import { Router } from "express";
import db, { users } from "../db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth";

const router = Router();

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWTSECRET!,
    {
      expiresIn: "7d",
    }
  );

  res.json({ token });
});

router.get("/me", auth("owner", "admin"), async (req, res) => {
  res.json({
    name: req.user!.name,
    role: req.user!.role,
  });
});

export default router;
