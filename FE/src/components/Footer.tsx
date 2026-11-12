import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#fcfcfc',
      padding: '80px 5% 40px 5%',
      color: '#005C29',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      position: 'relative',
      zIndex: 2,
      borderTop: '1px solid rgba(0, 92, 41, 0.1)'
    }}>
      
      {/* Bagian Atas: Navigasi, Logo, & Social */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '100px'
      }}>
        
        {/* Navigasi Kiri */}
        <div style={{ display: 'flex', gap: '40px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>SHOP</span>
            <a href="#" style={{ textDecoration: 'none', color: '#005C29', fontSize: '0.85rem', opacity: 0.7 }}>Menu</a>
            <a href="#" style={{ textDecoration: 'none', color: '#005C29', fontSize: '0.85rem', opacity: 0.7 }}>Locations</a>
            <a href="#" style={{ textDecoration: 'none', color: '#005C29', fontSize: '0.85rem', opacity: 0.7 }}>Licensing</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>ABOUT</span>
            <a href="#" style={{ textDecoration: 'none', color: '#005C29', fontSize: '0.85rem', opacity: 0.7 }}>Story</a>
            <a href="#" style={{ textDecoration: 'none', color: '#005C29', fontSize: '0.85rem', opacity: 0.7 }}>Contact</a>
          </div>
        </div>

        {/* Logo Tengah (Identitas Brand) */}
        <div style={{ 
          textAlign: 'center', 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop: '-15px'
        }}>
          <div style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'serif', 
            lineHeight: '1',
            marginBottom: '5px'
          }}>
            煉
          </div>
          <div style={{ 
            fontSize: '0.7rem', 
            letterSpacing: '4px', 
            fontWeight: 'bold',
            lineHeight: '1.2'
          }}>
            MATCHA<br/>REN
          </div>
        </div>

        {/* Social Media & Back to Top Kanan */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '50px', flex: 1 }}>
          <div style={{ display: 'flex', gap: '25px', fontWeight: 'bold', fontSize: '0.85rem' }}>
            <span style={{ cursor: 'pointer' }}>INSTAGRAM</span>
            <span style={{ cursor: 'pointer' }}>TWITTER</span>
            <span style={{ cursor: 'pointer' }}>FACEBOOK</span>
          </div>
          
          <button 
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: '1px solid #005C29',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#005C29',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#005C29';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#005C29';
            }}
          >
            ↑
          </button>
        </div>
      </div>

      {/* Bagian Bawah: Copyright Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '30px',
        borderTop: '1px solid rgba(0, 92, 41, 0.1)',
        fontSize: '0.7rem',
        opacity: 0.6,
        fontWeight: 'bold',
        letterSpacing: '0.5px'
      }}>
        <div>&copy; 2026 MATCHA REN. ALL RIGHTS RESERVED.</div>
        <div style={{ letterSpacing: '1.5px' }}>DESIGN BY CAFFE.DEV</div>
      </div>
    </footer>
  );
};

export default Footer;