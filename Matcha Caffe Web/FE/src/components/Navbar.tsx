import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fungsi untuk ambil data user dari storage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]); // Re-run setiap pindah halaman

  const handleLogout = () => {
    localStorage.clear(); // Hapus token & user
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={navContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
        <Link to="/" style={navLinkStyle}>HOME</Link>
        <Link to="/menu" style={navLinkStyle}>MENU</Link>
        
        {/* Dashboard Admin hanya muncul jika role Admin */}
        {user?.role === 'Admin' && (
          <Link to="/admin" style={{ ...navLinkStyle, color: '#d9534f' }}>ADMIN</Link>
        )}

        {/* LOGIKA PROFILE vs LOGIN BUTTON */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Indikator Profil */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: 'bold' }}>LOGGED IN AS</div>
              <div style={{ fontSize: '0.85rem', color: '#005C29', fontWeight: 'bold' }}>
                {user.name?.toUpperCase()}
              </div>
            </div>
            
            {/* Tombol Logout */}
            <button onClick={handleLogout} style={logoutButtonStyle}>
              LOGOUT
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            style={loginButtonStyle}
          >
            PESAN SEKARANG!
          </button>
        )}
      </div>
    </nav>
  );
};

// --- STYLES ---

const navContainerStyle: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, right: 0,
  display: 'flex', justifyContent: 'flex-end',
  alignItems: 'center', padding: '30px 5%',
  zIndex: 10000,
  backgroundColor: 'transparent'
};

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#005C29',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  letterSpacing: '1px'
};

const loginButtonStyle = {
  backgroundColor: '#005C29',
  color: 'white',
  border: 'none',
  padding: '12px 25px',
  borderRadius: '50px',
  fontWeight: 'bold' as const,
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(0, 92, 41, 0.2)'
};

const logoutButtonStyle = {
  backgroundColor: 'transparent',
  color: '#d9534f',
  border: '1px solid #d9534f',
  padding: '8px 15px',
  borderRadius: '5px',
  fontWeight: 'bold' as const,
  cursor: 'pointer',
  fontSize: '0.7rem'
};

export default Navbar;