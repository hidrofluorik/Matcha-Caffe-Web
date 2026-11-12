import type { NextFunction, Request, Response } from "express";
import response from "../utils/response.ts";

const isUserAuthorized =
  (ROLES: string[]) => (req: any, res: Response, next: NextFunction) => {
    // Membaca data dari JWT (mendukung employeeRole atau role)
    const currentRole = req.employee?.employeeRole || req.employee?.role;
    
    // 1. Jika token tidak membawa data role sama sekali
    if (!currentRole) {
      return response.unauthorized(
        res, 
        "Akses Ditolak: Data role tidak ditemukan di dalam token login kamu."
      );
    }

    // 2. Jika role ada, tapi tidak terdaftar di rute ini (misal: Pelanggan mau akses fitur Admin)
    if (!ROLES.includes(currentRole)) {
      return response.unauthorized(
        res, 
        `Akses Ditolak: Role '${currentRole}' tidak diizinkan di rute ini. Role yang sah: [${ROLES.join(", ")}]`
      );
    }

    // Jika lolos semua pengecekan, lanjut ke controller
    next();
  };

export default isUserAuthorized;