import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.ts";
import response from "../utils/response.ts";

export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.clientError(res, "Token tidak ditemukan atau format salah", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as any;
    
    if (decoded.employeeRole !== "Admin" && decoded.employeeRole !== "Owner") {
      return response.clientError(res, "Akses ditolak. Hanya Admin yang diizinkan.", 403);
    }

    req.employee = decoded;
    next();
  } catch (error) {
    return response.clientError(res, "Token tidak valid atau kadaluarsa", 401);
  }
};