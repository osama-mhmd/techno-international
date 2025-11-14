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
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET!) as AuthUser;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, decoded.id));

      if (!user) throw new Error("User not found");

      req.user = decoded;

      if (!allowedRoles) {
        return next();
      }

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token", error });
    }
  };
}
