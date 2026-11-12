import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import response from "../utils/response.ts";
import Employee from "../models/employee.model.ts";
import ENV from "../utils/ENV.ts";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    
    if (!employee) {
      return response.notFound(res, "user gaketemu");
    }

    const isPasswordCorrect = await bcrypt.compare(password, employee.password as string);
    if (!isPasswordCorrect) {
      return response.clientError(res, "password salah");
    }

    const token = jwt.sign(
      { employeeId: employee._id, employeeRole: employee.role },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES },
    );

    response.successCreate(res, "berhasil bikin token", 200, { 
      token,
      employee: {
        name: employee.name,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (error) {
    response.serverError(res, "error di login");
  }
};

// Pakai 'any' di req supaya tidak error saat akses req.employee
export const meController = async (req: any, res: Response) => {
  try {
    // Pastikan middleware 'verifyToken' kamu nyimpen data di req.employee
    const userId = req.employee?.employeeId; 
    
    const employee = await Employee.findById(userId);
    if (!employee) {
      return response.notFound(res, "user gaketemu");
    }

    const { password: _, ...employeeData } = employee.toObject();
    response.successCreate(res, "berhasil dapet data user", 200, {
      employee: employeeData,
    });
  } catch (error) {
    response.serverError(res, "error dapetin data employee");
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return response.clientError(res, "email dan password wajib diisi");
    }

    const name = req.body.name || email.split('@')[0];
    
    // 1. Ambil role dari req.body jika ada, jika tidak ada default ke "Pelanggan" (P kapital)
    const roleInput = req.body.role || "Pelanggan";
    
    // 2. Format string agar huruf pertamanya selalu kapital, sisanya huruf kecil (Capitalize)
    // Contoh: "pelanggan" atau "PELANGGAN" akan otomatis diubah menjadi "Pelanggan"
    const finalRole = roleInput.charAt(0).toUpperCase() + roleInput.slice(1).toLowerCase();

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return response.clientError(res, "email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      role: finalRole as any, // Cast ke 'any' agar tidak konflik dengan type enum strict Mongoose
      photo: "default.jpg"
    });

    await newEmployee.save();

    return response.successCreate(res, "berhasil daftar pegawai", 201, {
      employeeId: newEmployee._id,
      email: newEmployee.email
    });
  } catch (error: any) {
    console.error("DETAIL ERROR DAFTAR:", error.message);
    return response.serverError(res, "error di pendaftaran: " + error.message);
  }
};