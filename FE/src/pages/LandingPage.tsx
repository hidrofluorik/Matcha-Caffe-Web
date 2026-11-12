import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#f9fbf9', minHeight: '100vh', fontFamily: 'serif' }}>
      {/* Navbar Minimalis */}
      <nav style={{ padding: '20px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#2d4a22', margin: 0 }}>Caffe Dev.</h1>
        <div>
          <button style={{ background: 'none', border: 'none', marginRight: '20px', cursor: 'pointer' }}>Menu</button>
          <button style={{ backgroundColor: '#2d4a22', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Order Now</button>
        </div>
      </nav>

      {/* Hero Section ala Lapa Ninja */}
      <main style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2 style={{ fontSize: '4rem', color: '#1a1a1a', marginBottom: '20px' }}>
          Crafting the <span style={{ color: '#6d8c54' }}>Perfect</span> Brew.
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto 40px' }}>
          Experience the authentic taste of premium coffee beans roasted with passion. 
          Your daily dose of caffeine, delivered to your soul.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400" alt="Coffee" style={{ borderRadius: '15px', width: '300px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400" alt="Matcha" style={{ borderRadius: '15px', width: '300px', marginTop: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;