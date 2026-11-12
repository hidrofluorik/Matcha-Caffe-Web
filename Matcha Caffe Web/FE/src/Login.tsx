import { useState } from 'react';
import api from './utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Tunggu sebentar...');
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'; 
      const payload = isLogin ? { email, password } : { name: email.split('@')[0], email, password };

      const res = await api.post(endpoint, payload);
      
      if (isLogin) {
        const token = res.data?.data?.token;

        if (token) {
          localStorage.setItem('token', token);
          
          // Ambil role asli dari response body backend (mendukung beberapa variasi nested object backend)
          const backendRole = res.data?.data?.role || res.data?.data?.employee?.role || 'User';

          const userData = {
            name: email.split('@')[0].toUpperCase(),
            email: email,
            role: backendRole 
          };

          // Menyimpan objek user lengkap ke localStorage
          localStorage.setItem('user', JSON.stringify(userData)); 
          
          // Menyimpan string role secara terpisah agar langsung terbaca oleh Menu.tsx
          localStorage.setItem('role', backendRole);

          setMessage('Login berhasil!');
          setTimeout(() => navigate('/menu'), 1000);
        }
      } else {
        setMessage('Berhasil daftar! Silakan Login.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      setMessage("Gagal: " + (error.response?.data?.message || "Terjadi kesalahan!"));
    }
  };

  return (
    <div style={containerStyle}>
        <div style={cardStyle}>
            <div style={{ marginBottom: '40px' }}>
                <div style={{ fontSize: '3.5rem', fontFamily: 'serif', color: '#005C29', fontWeight: 'bold', lineHeight: '1' }}>煉</div>
                <div style={{ fontSize: '0.8rem', letterSpacing: '4px', color: '#005C29', fontWeight: 'bold', marginTop: '15px' }}>MATCHA REN</div>
            </div>
            <h2 style={titleStyle}>{isLogin ? 'Selamat Datang' : 'Registrasi'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle}/>
                <button type="submit" style={buttonStyle}>{isLogin ? 'SIGN IN' : 'REGISTER'}</button>
            </form>
            
            <div style={{ marginTop: '20px' }}>
              <button 
                type="button" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage('');
                }} 
                style={{ background: 'none', border: 'none', color: '#005C29', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', padding: '5px' }}
              >
                {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login di sini'}
              </button>
            </div>

            {message && <div style={{marginTop:'20px', color: message.includes('berhasil') || message.includes('Berhasil') ? 'green' : 'red'}}>{message}</div>}
        </div>
    </div>
  );
}

// Styles tetap utuh seperti kode bawaanmu
const containerStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf8f5', zIndex: 99999 };
const cardStyle: React.CSSProperties = { width: '100%', maxWidth: '450px', padding: '50px', backgroundColor: '#ffffff', borderRadius: '30px', textAlign: 'center' };
const titleStyle = { fontFamily: 'serif', color: '#005C29', fontSize: '2.5rem', marginBottom: '10px' };
const inputStyle = { width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #ddd', marginBottom: '10px' };
const buttonStyle = { width: '100%', padding: '18px', background: '#005C29', color: '#fff', border: 'none', borderRadius: '14px', cursor: 'pointer' };

export default Login;