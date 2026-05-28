import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import response from "../utils/response.ts";
import Employee from "../models/employee.model.ts";

// Fungsi untuk Admin membuat akun pegawai baru (Barista, Kasir, dll)
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return response.clientError(res, "Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Tangkap nama file foto jika Admin mengupload gambar (dari multer)
    const photo = req.file ? req.file.filename : "default.jpg";

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      role,
      photo
    });

    await newEmployee.save();

    return response.successCreate(res, "Berhasil membuat pegawai baru", 201, {
      employeeId: newEmployee._id,
      email: newEmployee.email,
      role: newEmployee.role
    });
  } catch (error: any) {
    return response.serverError(res, "Error menambah pegawai: " + error.message);
  }
};

// Fungsi untuk Admin melihat daftar semua pegawai
export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    // Ambil data semua pegawai, tapi sembunyikan kolom password demi keamanan
    const employees = await Employee.find().select("-password");
    
    return response.successCreate(res, "Berhasil mendapatkan data pegawai", 200, {
      employees
    });
  } catch (error: any) {
    return response.serverError(res, "Error mengambil data pegawai: " + error.message);
  }
};