import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { Play, Pause, Heart } from 'lucide-react';

export default function TrackCard({ track }) {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying, favorites, toggleFavorite } = useContext(AudioContext);

  const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
  const isFavorited = favorites.includes(track.id);

  const handlePlayTrack = (e) => {
  e.stopPropagation();
  if (currentTrack?.id === track.id) {
    setIsPlaying(!isPlaying);
  } else {
    // Quando mudas de música, força o reset do tempo e ativa o play
    setCurrentTrack(track);
    setIsPlaying(true);
  }
};

  return (
    <div 
      style={{ 
        background: '#FFFFFF', 
        padding: '16px', 
        borderRadius: '0px', 
        border: '4px solid #000000',
        boxShadow: '8px 8px 0px #000000', 
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.1s, box-shadow 0.1s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-4px, -4px)';
        e.currentTarget.style.boxShadow = '12px 12px 0px #000000';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '8px 8px 0px #000000';
      }}
      onClick={handlePlayTrack}
    >
      {/* Capa do Álbum */}
      <div style={{ position: 'relative', marginBottom: '16px', border: '3px solid #000000' }}>
        <img 
          src={track.cover} 
          alt={track.title} 
          style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} 
        />
        
        {/* Botão Play */}
        <button 
          onClick={handlePlayTrack}
          style={{ 
            position: 'absolute', 
            bottom: '12px', 
            right: '12px', 
            background: isThisTrackPlaying ? '#FF0055' : '#00FF66', 
            border: '3px solid #000000', 
            borderRadius: '0px', 
            padding: '10px', 
            display: 'flex', 
            cursor: 'pointer',
            boxShadow: '3px 3px 0px #000000'
          }}
        >
          {isThisTrackPlaying ? <Pause size={18} color="#000" /> : <Play size={18} color="#000" />}
        </button>
      </div>

      {/* Info Técnico (Título, Artista e Coração Corrigidos) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', width: '100%' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '13px', 
            fontWeight: '900', 
            textTransform: 'uppercase', 
            color: '#000',
            overflow: 'hidden',
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap'       
          }} title={track.title}>
            {track.title}
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: '11px', 
            color: '#666666', 
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {track.artist}
          </p>
        </div>

        {/* Botão de Favorito rápido */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(track.id);
          }}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: isFavorited ? '#FF0055' : '#000000',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0 
          }}
        >
          <Heart size={18} fill={isFavorited ? '#FF0055' : 'none'} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}