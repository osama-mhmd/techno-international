import { Router } from "express";
import db, { pages } from "../db";
import { and, eq } from "drizzle-orm";
import { auth } from "../middlewares/auth";

const router = Router();

/**
 * GET /pages/:page
 * Public endpoint to fetch landing content
 */
router.get("/:page", async (req, res) => {
  const page = req.params.page;

  const content = await db.select().from(pages).where(eq(pages.page, page));
  res.json(content);
});

/**
 * GET /pages/:page/:section
 * Public endpoint to fetch landing content
 */
router.get("/:page/:section", async (req, res) => {
  const { page, section } = req.params;

  const content = await db
    .select()
    .from(pages)
    .where(and(eq(pages.page, page), eq(pages.section, section)));
  res.json(content);
});

/**
 * POST /pages/:page
 * Admin/owner can create or update content
 */
router.post("/:page", auth("owner", "admin"), async (req, res) => {
  const { section, key, value } = req.body;
  const page = req.params.page;

  const existing = await db
    .select()
    .from(pages)
    .where(
      and(eq(pages.page, page), eq(pages.section, section), eq(pages.key, key))
    );

  if (existing.length > 0) {
    await db.update(pages).set({ value }).where(eq(pages.id, existing[0].id));
  } else {
    await db.insert(pages).values({ page, section, key, value });
  }

  res.json({ message: "Content saved" });
});

/**
 * DELETE /pages/:id
 * Admin/owner can delete content
 */
router.delete("/:id", auth("owner"), async (req, res) => {
  await db.delete(pages).where(eq(pages.id, Number(req.params.id)));
  res.json({ message: "Content deleted" });
});

export default router;
