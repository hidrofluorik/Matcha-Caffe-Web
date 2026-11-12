import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import dashboardImg from '../assets/dashboard.png'; 
import DashboardPhilosophySection from '../components/DashboardPhilosophySection';
import DashboardConceptSection from '../components/DashboardConceptSection';
import DashboardMenuSection from '../components/DashboardMenuSection';
import Footer from '../components/Footer';
// Import aset grafismu di sini
import grafisGunung from '../assets/grafisgunung.svg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#fcfcfc', color: '#005C29', fontFamily: "'Helvetica Neue', Arial, sans-serif", position: 'relative', overflowX: 'hidden' }}>
      
      <style>
        {`
          .hero-section {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 5%;
            position: relative;
            z-index: 2;
            overflow: hidden;
          }
          .logo-box {
            position: absolute;
            top: 0;
            left: 0;
            background-color: #005C29;
            color: white;
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999; 
          }
          .logo-kanji {
            font-size: 40px;
            font-weight: bold;
            font-family: serif;
            line-height: 1;
            margin-bottom: 5px;
          }
          .logo-text {
            font-size: 10px;
            text-align: center;
            letter-spacing: 2px;
            font-weight: bold;
          }
          .text-section h1 {
            font-family: 'Times New Roman', Times, serif;
            font-size: 80px;
            line-height: 1;
            letter-spacing: 5px;
            margin-bottom: 30px;
            color: #005C29;
          }
          .text-section h1 span {
            display: block;
            letter-spacing: 30px;
          }
        `}
      </style>

      {/* Navbar */}
      <Navbar />

      {/* Logo Kiri Atas */}
      <div className="logo-box">
        <div className="logo-kanji">煉</div>
        <div className="logo-text">MATCHA<br/>REN</div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        
        {/* --- AREA GRAFIS RANDOM (Di Bawah Semua) --- */}
        {/* Layer 1: Kiri mentok, besar */}
        <img src={grafisGunung} alt="dekorasi" style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '500px', zIndex: 1, opacity: 0.9 }} />
        
        {/* Layer 2: Agak ke tengah kiri, sedang */}
        <img src={grafisGunung} alt="dekorasi" style={{ position: 'absolute', bottom: '-10%', left: '15%', width: '350px', zIndex: 1, opacity: 0.6 }} />
        
        {/* Layer 3: Tengah, kecil & transparan (efek jauh) */}
        <img src={grafisGunung} alt="dekorasi" style={{ position: 'absolute', bottom: '-5%', left: '35%', width: '250px', zIndex: 1, opacity: 0.4 }} />
        
        {/* Layer 4: Tengah agak ke kanan, besar & transparan */}
        <img src={grafisGunung} alt="dekorasi" style={{ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', width: '650px', zIndex: 1, opacity: 0.3 }} />

        {/* Layer 5: Kanan, sedang */}
        <img src={grafisGunung} alt="dekorasi" style={{ position: 'absolute', bottom: '-12%', right: '20%', width: '400px', zIndex: 1, opacity: 0.7 }} />
        
        {/* Layer 6: Kanan mentok, besar */}
        <img src={grafisGunung} alt="dekorasi" style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '450px', zIndex: 1, opacity: 0.85 }} />


        <div className="text-section" style={{ flex: 1, maxWidth: '400px', zIndex: 2 }}>
          <h1>MATCHA<br/><span>REN</span></h1>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
            REN is a Matcha & Mochi concept brand based in California.
          </p>
          <p style={{ fontSize: '12px', lineHeight: '1.6', marginBottom: '30px' }}>
            We are offering rich, intense matcha in a variety of creative arrangements, delivering it in many different products to everyone
          </p>
          
          <button 
            onClick={() => navigate('/menu')}
            style={{ 
              padding: '12px 35px', 
              backgroundColor: '#005C29', 
              color: 'white', 
              border: 'none', 
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
            EXPLORE MENU
          </button>
        </div>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
          <img 
            src={dashboardImg} 
            alt="Matcha Product" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '75vh', 
              objectFit: 'contain'
            }} 
          />
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 2 }}>
          <svg style={{ width: '350px', height: '350px' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="#005C29"/>
            <ellipse cx="50" cy="35" rx="14" ry="10" fill="#fcfcfc" />
            <ellipse cx="32" cy="50" rx="14" ry="10" fill="#fcfcfc" />
            <ellipse cx="68" cy="50" rx="14" ry="10" fill="#fcfcfc" />
            <ellipse cx="50" cy="62" rx="16" ry="12" fill="#fcfcfc" />
          </svg>
        </div>
      </section>

      {/* Panggil Section Slide 2 */}
      <DashboardPhilosophySection />

      {/* Panggil Section Slide 3 */}
      <DashboardConceptSection />
      
      {/* Panggil Section Slide 3 */}
      <DashboardMenuSection />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;