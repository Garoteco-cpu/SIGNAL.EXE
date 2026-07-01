import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AudioProvider>
      <BrowserRouter>
        <div className="app-container">
          
          {/* 📱 BARRA DE TOPO MOBILE */}
          <header className="mobile-top-bar">
            <div className="mobile-logo">STREAM//RAW</div>
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
              {isSidebarOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
              <span>{isSidebarOpen ? 'FECHAR' : 'MENU'}</span>
            </button>
          </header>

          <div className="main-layout">
            
            <div 
              className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}
              onClick={() => setIsSidebarOpen(false)} 
            >
              <Sidebar />
            </div>

            <main className="content-panel">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </div>

          <Player />
          <Footer />

        </div>

       
      </BrowserRouter>
    </AudioProvider>
  );
}