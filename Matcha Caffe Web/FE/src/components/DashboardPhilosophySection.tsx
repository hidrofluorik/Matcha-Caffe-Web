import React from 'react';

// Import aset gambar dari folder assets
import gambar2samping from '../assets/gambar2samping.png';
import gambar2biru from '../assets/gambar2biru.png';
import gambar2jeruk from '../assets/gambar2jeruk.png';
import gambar2lava from '../assets/gambar2lava.png';
import gambar2lemon from '../assets/gambar2lemon.png';
import gambar2ungu from '../assets/gambar2ungu.png';

const DashboardPhilosophySection = () => {
  const cupImages = [
    gambar2lemon, 
    gambar2jeruk, 
    gambar2lava, 
    gambar2ungu, 
    gambar2biru
  ];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#005C29', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden' // Mencegah gambar bocor keluar
    }}>
      
      {/* GAMBAR KIRI (MENTOK & POTONGAN BESAR) */}
      <img 
        src={gambar2samping} 
        alt="Side Element" 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '28%', // Atur persentase ini untuk memperbesar/memperkecil potongan
          height: 'calc(100% - 140px)', // Mentok sampai area putih di bawah
          objectFit: 'cover', // Kunci agar jadi potongan penuh
          objectPosition: 'right', // Fokuskan crop ke sisi kanan gambar
          zIndex: 2
        }} 
      />

      {/* --- BAGIAN ATAS: Konten Teks --- */}
      {/* padding-left diset 32% supaya teks gak nabrak gambar absolut di atas */}
      <div style={{ display: 'flex', flex: 1, padding: '5% 5% 0 32%', zIndex: 2 }}>

        {/* Kolom 1: Teks Vertikal */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{
            writingMode: 'vertical-rl', 
            fontSize: '5rem',
            fontFamily: "'Times New Roman', Times, serif",
            margin: 0,
            lineHeight: '0.9',
            letterSpacing: '5px'
          }}>
            WHAT IS <br/> "MATCHA"?
          </h2>
        </div>

        {/* Kolom 2: Subjudul Tengah */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '80px', paddingLeft: '50px' }}>
          <div>
            <p style={{ fontSize: '1.1rem', margin: '0 0 5px 0', letterSpacing: '2px', fontWeight: 'bold' }}>JAPANESE CULTURE</p>
            <p style={{ fontSize: '1.1rem', margin: '0 0 5px 0', letterSpacing: '2px', fontWeight: 'bold' }}>SPANNING A</p>
            <p style={{ fontSize: '1.1rem', margin: 0, letterSpacing: '2px', fontWeight: 'bold' }}>THOUSAND YEARS</p>
          </div>
          <div>
            <p style={{ fontSize: '1.1rem', margin: 0, letterSpacing: '2px', fontWeight: 'bold' }}>SUPERFOOD</p>
          </div>
        </div>

        {/* Kolom 3: Paragraf Kanan */}
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px' }}>
          <p style={{ lineHeight: '1.8', fontSize: '1rem', opacity: 0.9, margin: 0 }}>
            Matcha is a special presence with a history of over a thousand years in Japan. It was popularized by Zen monks and has been cherished as the centerpiece of the tea ceremony. Its vibrant green color and rich flavor are symbols of Japanese culture, continuing to captivate many people to this day.
          </p>
          <p style={{ lineHeight: '1.8', fontSize: '1rem', opacity: 0.9, margin: 0 }}>
            Matcha is rich in catechins, which have powerful antioxidant properties. In addition to helping control fat and cholesterol levels, it is also abundant in theanine, which promotes relaxation. Matcha is a superfood that supports a healthy lifestyle.
          </p>
        </div>
      </div>

      {/* --- BAGIAN BAWAH: Latar Putih & Barisan Cup --- */}
      <div style={{ position: 'relative', height: '350px', width: '100%', marginTop: 'auto' }}>
        
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '140px', backgroundColor: '#fcfcfc', zIndex: 1 }}></div>

        <div style={{
          position: 'absolute',
          bottom: '20px', 
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly', 
          alignItems: 'flex-end',
          padding: '0 5%',
          boxSizing: 'border-box',
          zIndex: 2
        }}>
          {cupImages.map((imgSrc, index) => (
            <div key={index} style={{
              width: '16%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
              <img 
                src={imgSrc} 
                alt={`Matcha Cup ${index + 1}`} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  maxHeight: '300px', 
                  objectFit: 'contain'
                }} 
              />
            </div>
          ))}
        </div>

        <button style={{
          position: 'absolute',
          bottom: '50px',
          right: '5%',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'white',
          color: '#005C29',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 3,
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
        }}>
          ||
        </button>

      </div>

    </section>
  );
};

export default DashboardPhilosophySection;