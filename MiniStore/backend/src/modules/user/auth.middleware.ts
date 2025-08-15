import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import { UserService } from "./user.service";

export interface AuthRequest extends Request {
  user?: any;
}

const userService = new UserService();

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; userId: string };

    // Use service to check if user exists
    const dbUser = await userService.findUserByEmail(decoded.email);

    if (!dbUser) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }
    dbUser.password = "";
    req.user = dbUser;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
