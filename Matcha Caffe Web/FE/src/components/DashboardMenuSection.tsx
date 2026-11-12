import React from 'react';

// Import aset gambar sesuai list kamu
import grafisGunung from '../assets/grafisgunung.svg';
import imgori from '../assets/gambar2lemon.png';
import imgshake from '../assets/menu_matcha_shake.png'; // Asumsi untuk menu 2
import imgmochicrep from '../assets/mochi_crepes.png';   // Asumsi untuk menu 3
import imgmontblanc from '../assets/matcha_mont_blanc.png';   // Asumsi untuk menu 4
import imgicecream from '../assets/mochi_icecream.png';   // Asumsi untuk menu 5
import imgpints from '../assets/pints.png'; // Asumsi untuk menu 6
import imgsoftserve from '../assets/softserve.png'; // Asumsi untuk menu 7
import gambar3Logo from '../assets/gambar3_logo.png'; // Gambar logo di sebelah kanan

const DashboardMenuSection = () => {
  // Mapping menu sesuai urutan yang kamu minta
  const menuItems = [
    { name: 'MATCHA ORIGINAL', image: imgori },
    { name: 'MENU MATCHA SHAKE', image: imgshake },
    { name: 'MOCHI CREPES', image: imgmochicrep },
    { name: 'MATCHA MONT BLANC', image: imgmontblanc },
    { name: 'MOCHI ICE CREAM', image: imgicecream },
    { name: 'PINTS', image: imgpints },
    { name: 'SOFTSERVE', image: imgsoftserve },
  ];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#faf8f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden',
      zIndex: 2
    }}>

      {/* --- BACKGROUND GRAFIS KIRI BAWAH --- */}
      <div style={{
        position: 'absolute',
        bottom: '-5%',
        left: '-5%',
        width: '500px',
        zIndex: 1,
        opacity: 0.3,
      }}>
        <img src={grafisGunung} alt="grafis" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>


      {/* --- KIRI: Teks & Tombol --- */}
      <div style={{ flex: 1, paddingRight: '5%', zIndex: 2 }}>
        <h2 style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: '7rem',
          color: '#005C29',
          margin: '0 0 20px 0',
          lineHeight: '1',
          textTransform: 'uppercase'
        }}>
          MENU
        </h2>
        
        <h3 style={{
          fontSize: '1.8rem',
          color: '#005C29',
          margin: '0 0 30px 0',
          fontWeight: 'bold',
          lineHeight: '1.3',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          RICH FLAVOR,<br />DELIVERED TO YOU.
        </h3>

        <p style={{
          color: '#005C29',
          fontSize: '1rem',
          lineHeight: '1.6',
          maxWidth: '400px',
          marginBottom: '40px',
          fontWeight: '500'
        }}>
          We have prepared special sweets and drinks made with carefully selected matcha. From soft serve and shakes to pint-sized ice cream, our wide variety of menu items will brighten your moments.
        </p>

        <button style={{
          backgroundColor: '#005C29',
          color: 'white',
          border: 'none',
          padding: '12px 35px',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          VIEW MORE <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>•</span>
        </button>
      </div>


      {/* --- KANAN: Grid Menu --- */}
      <div style={{ 
        flex: 1.5, 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '25px 15px',
        zIndex: 2 
      }}>
        
        {/* Render 7 item menu */}
        {menuItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              backgroundColor: '#005C29',
              borderRadius: '15px',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
              overflow: 'hidden'
            }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '90%', height: '90%', objectFit: 'contain' }} 
              />
            </div>
            <p style={{
              color: '#005C29',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              margin: 0
            }}>
              {item.name}
            </p>
          </div>
        ))}

        {/* Item ke-8: Gambar Logo/Ilustrasi */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            width: '100%',
            aspectRatio: '1 / 1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={gambar3Logo} 
              alt="Logo Illustration" 
              style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
            />
          </div>
        </div>

      </div>

    </section>
  );
};

export default DashboardMenuSection;