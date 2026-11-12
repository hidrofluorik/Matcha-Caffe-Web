import type { Request, Response } from "express";
import response from "../utils/response.ts";
import cloudinary from "../utils/cloudinary.ts";
import Product from "../models/product.model.ts";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, isAvailable, category } = req.body;
    let photoUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photoUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      isAvailable: isAvailable === "false" ? false : true,
      category: category || "Matcha", // Menambahkan category agar sinkron dengan filter frontend
      photo: photoUrl,
    });

    response.successCreate(res, "berhasil buat product", 201, { product });
  } catch (error) {
    response.serverError(res, "gagal pas buat product");
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    response.successCreate(res, "berhasil dapetin semua product", 200, {
      products,
    });
  } catch (error) {
    return response.serverError(res, "gagal pas getAllProduct");
  }
};

// --- TAMBAHAN FUNGSI UPDATE PRODUCT ---
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock, isAvailable, category } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return response.notFound(res, "produk tidak ditemukan");
    }

    let photoUrl = product.photo; // Default pakai foto lama

    // Jika admin mengunggah file foto baru
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photoUrl = result.secure_url;
    }

    // Update data di MongoDB
    product.name = name || product.name;
    product.price = price ? Number(price) : product.price;
    product.stock = stock ? Number(stock) : product.stock;
    if (isAvailable !== undefined) {
      product.isAvailable = isAvailable === "false" ? false : true;
    }
    product.category = category || product.category;
    product.photo = photoUrl;

    await product.save();

    response.successCreate(res, "berhasil memperbarui product", 200, { product });
  } catch (error) {
    response.serverError(res, "gagal pas updateProduct");
  }
};

// --- TAMBAHAN FUNGSI DELETE PRODUCT ---
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return response.notFound(res, "produk tidak ditemukan");
    }

    response.successCreate(res, "berhasil menghapus product", 200, null);
  } catch (error) {
    response.serverError(res, "gagal pas deleteProduct");
  }
};