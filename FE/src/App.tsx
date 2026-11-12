import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./pages/Home"; 
import Menu from "./pages/Menu"; 

function App() {
  return (
    <Routes>
      {/* 1. Jadikan Home sebagai Landing Page utama */}
      <Route path="/" element={<Home />} />
      
      {/* 2. Login punya rutenya sendiri */}
      <Route path="/login" element={<Login />} />
      
      {/* 3. Menu tetap di /menu */}
      <Route path="/menu" element={<Menu />} /> 

      {/* 4. Jika user nyasar (404), lempar balik ke Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;