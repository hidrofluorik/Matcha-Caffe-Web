import type { Request, Response } from "express";
import response from "../utils/response.ts";
import Product from "../models/product.model.ts";
// Pastikan kamu menyesuaikan path import model Order jika kamu menggunakannya
// import Order from "../models/order.model.ts"; 

export const createOrder = async (req: any, res: Response) => {
  try {
    const { items, totalPayment } = req.body;
    
    // Ambil ID pengguna dari token (disimpan oleh middleware verifyToken)
    const userId = req.employee?.employeeId; 

    // 1. Validasi awal jika data keranjang kosong
    if (!items || items.length === 0) {
      return response.clientError(res, "Gagal: Keranjang belanja kosong.");
    }

    // 2. Cek ketersediaan stok untuk semua produk di dalam keranjang terlebih dahulu
    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return response.notFound(res, `Produk dengan ID ${item.productId} tidak ditemukan.`);
      }

      if (Number(product.stock) < item.quantity) {
        return response.clientError(
          res, 
          `Stok tidak mencukupi! ${product.name} tersisa ${product.stock}, sedangkan kamu memesan ${item.quantity}.`
        );
      }
    }

    // 3. Jika semua stok aman, lakukan pemotongan stok di database
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock = Number(product.stock) - item.quantity;
        
        // Jika stok habis setelah dipotong, otomatis set isAvailable jadi false
        if (product.stock === 0) {
          product.isAvailable = false;
        }
        
        await product.save();
      }
    }

    // 4. Proses penyimpanan data transaksi ke database
    // Jika kamu punya Order model di MongoDB, kamu bisa pasang di sini:
    // const newOrder = await Order.create({ customer: userId, items, totalPayment, status: "Selesai" });
    
    const orderData = {
      customer: userId || "Guest/Pelanggan",
      items,
      totalPayment: Number(totalPayment),
      status: "Selesai",
      createdAt: new Date()
    };

    // Kirim response sukses ke frontend
    return response.successCreate(res, "Pembelian berhasil diproses!", 201, {
      order: orderData
    });

  } catch (error: any) {
    console.error("DETAIL ERROR ORDER:", error.message);
    return response.serverError(res, "Terjadi kesalahan di server saat memproses order: " + error.message);
  }
};

// Fungsi tambahan jika kamu butuh melihat riwayat order (Opsional)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Jika menggunakan model: const orders = await Order.find();
    // Sementara return array kosong jika belum pakai collection order terpisah
    return response.successCreate(res, "Berhasil mendapatkan semua data order", 200, {
      orders: []
    });
  } catch (error: any) {
    return response.serverError(res, "Gagal mendapatkan data order");
  }
};