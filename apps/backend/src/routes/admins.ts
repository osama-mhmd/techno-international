import { Router } from "express";
import db, { users } from "../db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { auth } from "../middlewares/auth";

const router = Router();

/**
 * GET /admins
 * Accessible: admin + owner
 */
router.get("/", auth("owner", "admin"), async (req, res) => {
  const admins = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      name: users.name,
    })
    .from(users);

  res.json(admins);
});

/**
 * POST /admins
 * Create new admin (owner only)
 */
router.post("/", auth("owner"), async (req, res) => {
  const { email, password, name } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (user) {
    res.status(409).json({
      message: "This email is already in use.",
    });
  }

  await db.insert(users).values({
    email,
    name,
    password: hashed,
    role: "admin",
  });

  res.json({ message: "Admin user created successfully." });
});

/**
 * DELETE /admins/:id
 * Remove admin (owner only, can't delete owner)
 */
router.delete("/:id", auth("owner"), async (req, res) => {
  const adminId = Number(req.params.id);

  // Prevent deleting owner
  const [user] = await db.select().from(users).where(eq(users.id, adminId));
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.role === "owner") {
    return res.status(403).json({ message: "Owner cannot be removed" });
  }

  await db.delete(users).where(eq(users.id, adminId));

  res.json({ message: "Admin removed" });
});

export default router;
