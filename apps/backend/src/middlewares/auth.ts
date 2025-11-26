import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db, { users } from "../db";
import { eq } from "drizzle-orm";

export type UserRole = "owner" | "admin";

export interface AuthUser {
  id: number;
  name: string;
  role: UserRole;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function auth(...allowedRoles: UserRole[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET!) as AuthUser;

      const [user] = await db
        .select({
          id: users.id,
          name: users.name,
          role: users.role,
        })
        .from(users)
        .where(eq(users.id, decoded.id));

      if (!user) throw new Error("User not found");

      req.user = user;

      if (allowedRoles.length === 0) return next();

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (_) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}
