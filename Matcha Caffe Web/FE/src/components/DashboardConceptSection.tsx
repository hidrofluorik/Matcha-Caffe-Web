import React from 'react';

// Import aset gambar
import prosesMatchaImg from '../assets/proses_matcha.webp';
import readingSvg from '../assets/reading.svg';
import grafisGunungSvg from '../assets/grafisgunung.svg';

const DashboardConceptSection = () => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#faf8f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 10%',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden'
    }}>

      {/* --- KIRI: Gambar Besar --- */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', zIndex: 2 }}>
        <div style={{
          width: '100%',
          maxWidth: '480px',
          height: '650px',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#eaeaea' // Fallback color saat gambar loading
        }}>
          <img 
            src={prosesMatchaImg} 
            alt="Proses Pembuatan Matcha" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>

      {/* --- KANAN: Konten Teks --- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '5%', zIndex: 2 }}>
        
        {/* Ilustrasi Hijau Atas */}
        <div style={{ marginBottom: '20px' }}>
          <img 
            src={readingSvg} 
            alt="Reading Illustration" 
            style={{ width: '120px', height: 'auto', objectFit: 'contain' }} 
          />
        </div>

        {/* Judul */}
        <h2 style={{
          fontSize: '5.5rem',
          fontFamily: "'Times New Roman', Times, serif",
          color: '#005C29',
          margin: '0 0 30px 0',
          fontWeight: 'bold',
          letterSpacing: '2px'
        }}>
          CONCEPT
        </h2>

        {/* Paragraf */}
        <p style={{
          color: '#005C29',
          lineHeight: '1.6',
          maxWidth: '450px',
          marginBottom: '40px',
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          We are a specialty shop offering matcha & mochi sweets, dedicated to bringing the traditional taste of Japanese matcha to the world. We feature rich matcha in a variety of creative arrangements, offering a wide range of products for you to enjoy.
        </p>

        {/* Tombol */}
        <button style={{
          backgroundColor: '#005C29',
          color: 'white',
          border: 'none',
          padding: '12px 35px',
          borderRadius: '50px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          boxShadow: '0 4px 15px rgba(0, 92, 41, 0.2)'
        }}>
          VIEW MORE <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>•</span>
        </button>
      </div>

      {/* --- KANAN BAWAH: Grafis Gunung --- */}
      <div style={{
        position: 'absolute',
        bottom: '-5%',
        right: '-5%',
        width: '600px',
        height: '300px',
        zIndex: 1
      }}>
        <img 
          src={grafisGunungSvg} 
          alt="Grafis Gunung" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>

    </section>
  );
};

export default DashboardConceptSection;