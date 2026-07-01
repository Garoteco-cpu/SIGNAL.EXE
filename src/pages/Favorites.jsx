import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import tracksData from '../data/tracks.json';
import { Play, Pause, Trash2 } from 'lucide-react';

export default function Favorites() {
  const { 
    favorites, 
    toggleFavorite, 
    currentTrack, 
    setCurrentTrack, 
    isPlaying, 
    setIsPlaying 
  } = useContext(AudioContext);

  // Filtra o JSON para mostrar apenas as músicas que o utilizador adicionou aos favoritos
  const favoriteTracks = tracksData.filter(track => favorites.includes(track.id));

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      // Se for a mesma música, alterna o estado de reprodução
      setIsPlaying(!isPlaying);
    } else {
      // Se for uma música diferente, define-a como atual e força o Play
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>Os Teus Favoritos ❤️</h1>

      {favoriteTracks.length === 0 ? (
        <p style={{ color: '#b3b3b3', fontSize: '14px' }}>
          Ainda não adicionaste nenhuma faixa aos favoritos. Explora a página inicial!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {favoriteTracks.map((track) => {
            const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;

            return (
              <div 
                key={track.id}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  background: '#181818', 
                  padding: '12px 16px', 
                  borderRadius: '6px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#282828'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#181818'}
              >
                {/* Lado Esquerdo: Botão Play + Capa + Info da Faixa */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button 
                    onClick={() => handlePlayTrack(track)}
                    style={{ 
                      background: '#1db954', 
                      border: 'none', 
                      borderRadius: '50%', 
                      padding: '8px', 
                      display: 'flex', 
                      cursor: 'pointer',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    {isThisTrackPlaying ? <Pause size={16} color="#000" /> : <Play size={16} color="#000" />}
                  </button>
                  
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', color: '#fff' }}>{track.title}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#b3b3b3' }}>{track.artist}</p>
                  </div>
                </div>

                {/* Lado Direito: Botão para Remover dos Favoritos */}
                <button 
                  onClick={() => toggleFavorite(track.id)}
                  title="Remover dos favoritos"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#b3b3b3', 
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e91429'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}