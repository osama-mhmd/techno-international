// THIS IS A ONE TIME SCRIPT TO GENERATE AN OWNER.
// AN OWNER IS DIFFERENT FROM ADMINS.
// THE OWNER HAS THE SUPERIOUR ACCESS.
// THEREFORE WE DIDN'T IMPLEMENT AN ENDPOINT FOR THAT

import bcrypt from "bcryptjs";
import db, { users } from "../src/db";
import { eq } from "drizzle-orm";

// --------------------
// CLI ARG PARSING
// --------------------
const [, , email, password] = process.argv;

if (!email || !password) {
  console.log("Usage: ts-node scripts/create-admin.ts <email> <password>");
  process.exit(1);
}

async function main() {
  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing.length > 0) {
      console.error("User already exists:", email);
      process.exit(1);
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      name: "Owner",
      password: hashed,
      role: "owner",
    });

    console.log(`Owner created successfully! Email: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

main();
