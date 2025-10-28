import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends NextApiRequest {
  user?: { id: string; role: string };
}

export const authenticateAdmin =
  (handler: NextApiHandler) => async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };

      if (decoded.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
      }

      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
