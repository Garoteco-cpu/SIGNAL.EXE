import { useState } from 'react';
import TrackCard from '../components/TrackCard';
import tracksData from '../data/tracks.json';


export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState('ALL');

  // Extrai os géneros musicais únicos do teu JSON dinamicamente
  const genres = ['ALL', ...new Set(tracksData.map(track => track.genre))];

  // Filtra as faixas com base no género selecionado
  const filteredTracks = selectedGenre === 'ALL' 
    ? tracksData 
    : tracksData.filter(track => track.genre === selectedGenre);

  return (
    <div style={{ padding: '8px' }}>
      <h1 className='title' style={{ marginBottom: '32px', fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px' }}>
        //AUDIO_DATABASE
      </h1>

      {/* Menu de Filtros Brutalista (Bordas duras, sem raio) */}
      <div className="filter-container">
        {genres.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              style={{
                background: isActive ? '#00FF66' : '#FFFFFF',
                color: '#000000',
                border: '3px solid #000000',
                padding: '10px 20px',
                fontWeight: '900',
                fontSize: '12px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: isActive ? '4px 4px 0px #000000' : '2px 2px 0px #000000',
                transform: isActive ? 'translate(-2px, -2px)' : 'none',
                transition: 'all 0.1s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
                }
              }}
            >
              {genre.replace('_', ' ')}
            </button>
          );
        })}
      </div>
      
      {/* Grid de Faixas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '32px' 
      }}>
        {filteredTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <p style={{ fontWeight: 'bold', color: '#666666' }}>// NENHUMA_FAIXA_ENCONTRADA_NESTE_GENERO</p>
      )}
    </div>
  );
}