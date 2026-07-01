import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Music } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside style={{
      width: '290px',
      background: '#FFFFFF',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      
   {/* Logótipo Superior Puro (Sem ícone) */}
<div style={{
  background: '#000000',
  color: '#FFFFFF',
  border: '4px solid #000000',
  padding: '16px',
  fontWeight: '900',
  fontSize: '14px',
  letterSpacing: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '4px 4px 0px #000000'
}}>
  <span>STREAM//RAW</span>
</div>
      {/* Navegação por Rotas Reais */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            // Se estiver na rota "/", pinta o botão de verde néon
            background: location.pathname === '/' ? '#00FF66' : '#FFFFFF',
            color: '#000000',
            border: '4px solid #000000',
            padding: '14px',
            fontWeight: '900',
            fontSize: '13px',
            textAlign: 'left',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'monospace'
          }}>
            <Home size={18} strokeWidth={2.5} />
            <span>INÍCIO</span>
          </button>
        </Link>

        <Link to="/favorites" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            // Se estiver na rota "/favorites", pinta o botão de verde néon
            background: location.pathname === '/favorites' ? '#00FF66' : '#FFFFFF',
            color: '#000000',
            border: '4px solid #000000',
            padding: '14px',
            fontWeight: '900',
            fontSize: '13px',
            textAlign: 'left',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'monospace'
          }}>
            <Heart size={18} strokeWidth={2.5} />
            <span>FAVORITOS</span>
          </button>
        </Link>

      </nav>
    </aside>
  );
}