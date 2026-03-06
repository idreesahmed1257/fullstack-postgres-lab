import { Request, Response, NextFunction } from "express";
import { auth } from "../../auth";


export interface AuthRequest extends Request {
  user?: any;
}


const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(",") : value);
    }

    const session = await auth.api.getSession({ headers });
    if (!session) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    (req as any).user = session.user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default requireAuth;
