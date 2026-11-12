import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';

const categories = ['All', 'Matcha', 'Coffee', 'Snack'];

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  
  // State Kontrol Admin & Keranjang
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // State Fitur Keranjang (Cart)
  const [cart, setCart] = useState<any[]>([]);

  // State Form Admin
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Matcha',
    stock: '100',
    isAvailable: 'true'
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Cek Status Admin
  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole === 'Admin' || userRole === 'Owner') {
      setIsAdmin(true);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/products', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setProducts(res.data?.data?.products || res.data?.data || []);
    } catch (error) {
      console.error("Gagal mengambil data menu:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- LOGIKA KERANJANG (ADD TO CART) ---
  const handleAddToCart = (product: any) => {
    // Cek apakah item sudah ada di dalam keranjang
    const existingItem = cart.find(item => item.productId === product._id);
    
    if (existingItem) {
      // Jika ada, tambahkan quantity-nya
      setCart(cart.map(item => 
        item.productId === product._id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Jika belum ada, masukkan data baru
      setCart([...cart, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const handleUpdateQuantity = (productId: string, amount: number) => {
    setCart(cart.map(item => {
      if (item.productId === productId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean)); // Menghapus item jika qty menjadi 0
  };

  // --- AKSI CHECKOUT / PEMBELIAN ---
  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu untuk melakukan pembelian!');
      return;
    }

    try {
      const totalPayment = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const payload = {
        items: cart,
total: totalPayment
      };

      await api.post('/orders', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('🎉 Pembelian Berhasil! Terima kasih sudah memesan.');
      setCart([]); // Kosongkan keranjang setelah sukses belanja
      fetchProducts(); // Refresh stok produk terbaru dari backend
    } catch (error: any) {
      alert('Gagal memproses pembelian: ' + (error.response?.data?.message || error.message));
    }
  };

  // --- AKSI ADMIN (CRUD) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('stock', formData.stock);
      data.append('isAvailable', formData.isAvailable);
      if (photoFile) data.append('photo', photoFile);

      await api.post('/products', data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      alert('Produk berhasil ditambahkan!');
      setShowAddModal(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      alert('Gagal menambah produk: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleOpenEditModal = (product: any) => {
    setSelectedProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category || 'Matcha',
      stock: product.stock?.toString() || '100',
      isAvailable: product.isAvailable?.toString() || 'true'
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('stock', formData.stock);
      data.append('isAvailable', formData.isAvailable);
      if (photoFile) data.append('photo', photoFile);

      await api.put(`/products/${selectedProductId}`, data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      alert('Produk berhasil diperbarui!');
      setShowEditModal(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      alert('Gagal memperbarui produk: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus menu "${name}"?`)) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        alert('Produk berhasil dihapus!');
        fetchProducts();
      } catch (error: any) {
        alert('Gagal menghapus produk: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', category: 'Matcha', stock: '100', isAvailable: 'true' });
    setPhotoFile(null);
    setSelectedProductId(null);
  };

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  // Hitung Total Belanja Keseluruhan
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', width: '100%', margin: 0, padding: 0, overflowX: 'hidden', display: 'block' }}>
      <Navbar />

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '160px', paddingBottom: '100px', boxSizing: 'border-box' }}>
        <main style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '4.5rem', color: '#005C29', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              Our Menu
            </h1>
            <div style={{ width: '80px', height: '2px', backgroundColor: '#005C29', margin: '0 auto 25px auto' }}></div>
            <p style={{ color: '#666', fontSize: '1.1rem', letterSpacing: '1px' }}>
              Pilih minuman atau cemilan favoritmu.
            </p>

            {isAdmin && (
              <button 
                onClick={() => { resetForm(); setShowAddModal(true); }}
                style={{ marginTop: '20px', padding: '12px 25px', backgroundColor: '#005C29', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '0.5px' }}
              >
                + TAMBAH MENU BARU (ADMIN)
              </button>
            )}
          </div>

          {/* Filter Kategori */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '60px' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{ padding: '12px 30px', border: '1px solid #005C29', borderRadius: '50px', backgroundColor: activeFilter === cat ? '#005C29' : 'transparent', color: activeFilter === cat ? '#fff' : '#005C29', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.3s ease', letterSpacing: '1px' }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Grid Menu */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px', width: '100%' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product._id || product.id} style={cardStyle}>
                  <div style={imageContainerStyle}>
                    {product.photo ? (
                        <img src={product.photo} alt={product.name} style={imageStyle} />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc' }}>No Image</div>
                    )}
                  </div>
                  <div style={{ padding: '25px', textAlign: 'center' }}>
                    <h3 style={productTitleStyle}>{product.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#777', margin: '5px 0' }}>Stok: {product.stock || 0}</p>
                    <p style={{ color: '#005C29', fontWeight: 'bold', fontSize: '1.3rem', margin: '10px 0' }}>
                      Rp {product.price?.toLocaleString('id-ID')}
                    </p>
                    
                    {isAdmin ? (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleOpenEditModal(product)} style={{ flex: 1, padding: '10px', backgroundColor: '#e67e22', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>EDIT</button>
                        <button onClick={() => handleDeleteProduct(product._id, product.name)} style={{ flex: 1, padding: '10px', backgroundColor: '#c0392b', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>HAPUS</button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                        style={{ ...cartButtonStyle, backgroundColor: product.stock <= 0 ? '#ccc' : '#005C29', cursor: product.stock <= 0 ? 'not-allowed' : 'pointer' }}
                      >
                        {product.stock <= 0 ? 'HABIS' : '+ ADD TO CART'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', color: '#999', fontSize: '1.1rem', fontStyle: 'italic' }}>
                Belum ada menu tersedia untuk kategori ini.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- PANEL KERANJANG BELANJA (Hanya Muncul Jika Ada Item & Bukan Admin) --- */}
      {!isAdmin && cart.length > 0 && (
        <div style={cartPanelStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#005C29', fontFamily: 'serif', borderBottom: '2px solid #f4f4f4', paddingBottom: '10px' }}>🛒 Keranjang Belanja</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto', marginBottom: '15px' }}>
            {cart.map(item => (
              <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</div>
                  <div style={{ color: '#005C29' }}>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => handleUpdateQuantity(item.productId, -1)} style={qtyBtnStyle}>-</button>
                  <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.productId, 1)} style={qtyBtnStyle}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', margin: '15px 0', borderTop: '2px solid #f4f4f4', paddingTop: '10px' }}>
            <span>Total:</span>
            <span style={{ color: '#005C29' }}>Rp {totalCartPrice.toLocaleString('id-ID')}</span>
          </div>
          <button onClick={handleCheckout} style={checkoutButtonStyle}>
            KONFIRMASI PEMBELIAN (CHECKOUT)
          </button>
        </div>
      )}

      {/* --- MODAL INPUT TAMBAH PRODUK (ADMIN) --- */}
      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ color: '#005C29', fontFamily: "'Times New Roman', Times, serif", marginBottom: '20px' }}>Tambah Menu Baru</h2>
            <form onSubmit={handleSubmitProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={inputGroupStyle}><label>Nama Produk:</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={inputStyle} /></div>
              <div style={inputGroupStyle}><label>Harga (Rp):</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required style={inputStyle} /></div>
              <div style={inputGroupStyle}>
                <label>Kategori:</label>
                <select name="category" value={formData.category} onChange={handleInputChange} style={inputStyle}>
                  <option value="Matcha">Matcha</option><option value="Coffee">Coffee</option><option value="Snack">Snack</option>
                </select>
              </div>
              <div style={inputGroupStyle}><label>Upload Foto:</label><input type="file" accept="image/*" onChange={handleFileChange} required style={inputStyle} /></div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#005C29', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Simpan</button>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: '#999', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL EDIT PRODUK (ADMIN) --- */}
      {showEditModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ color: '#e67e22', fontFamily: "'Times New Roman', Times, serif", marginBottom: '20px' }}>Edit Data Menu</h2>
            <form onSubmit={handleUpdateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={inputGroupStyle}><label>Nama Produk:</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={inputStyle} /></div>
              <div style={inputGroupStyle}><label>Harga (Rp):</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required style={inputStyle} /></div>
              <div style={inputGroupStyle}>
                <label>Kategori:</label>
                <select name="category" value={formData.category} onChange={handleInputChange} style={inputStyle}>
                  <option value="Matcha">Matcha</option><option value="Coffee">Coffee</option><option value="Snack">Snack</option>
                </select>
              </div>
              <div style={inputGroupStyle}><label>Ganti Foto (Opsional):</label><input type="file" accept="image/*" onChange={handleFileChange} style={inputStyle} /></div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#e67e22', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Perbarui</button>
                <button type="button" onClick={() => { setShowEditModal(false); resetForm(); }} style={{ flex: 1, padding: '12px', backgroundColor: '#999', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// --- STYLES ---
const cardStyle: React.CSSProperties = { backgroundColor: '#fff', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0, 92, 41, 0.06)', transition: 'transform 0.3s ease' };
const imageContainerStyle: React.CSSProperties = { width: '100%', height: '260px', overflow: 'hidden', backgroundColor: '#f4f4f4' };
const imageStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
const productTitleStyle = { fontFamily: "'Times New Roman', Times, serif", margin: '0', fontSize: '1.5rem', color: '#005C29', letterSpacing: '0.5px', fontWeight: 'bold' as const };
const cartButtonStyle = { width: '100%', padding: '14px', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold' as const, fontSize: '0.85rem', letterSpacing: '1px' };

const modalOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle: React.CSSProperties = { backgroundColor: '#fff', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '450px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' };
const inputGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' };
const inputStyle: React.CSSProperties = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' };

// Styles baru untuk Panel Keranjang Belanja Pelanggan (Floating di Kanan Bawah)
const cartPanelStyle: React.CSSProperties = { position: 'fixed', bottom: '30px', right: '30px', width: '350px', backgroundColor: '#fff', padding: '20px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 99, border: '2px solid #005C29' };
const qtyBtnStyle: React.CSSProperties = { width: '25px', height: '25px', backgroundColor: '#f4f4f4', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const checkoutButtonStyle: React.CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#005C29', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' };

export default Menu;