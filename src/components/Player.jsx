import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from 'lucide-react';


export default function Player() {
  const { 
    currentTrack, isPlaying, togglePlay, playNext, playPrevious,
    currentTime, duration, seek, 
    volume, setVolume, favorites, toggleFavorite
  } = useContext(AudioContext);

  if (!currentTrack) return <div className="player-empty" />;

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="brutal-player">
      
      {/* 1. Info Faixa */}
      <div className="player-info">
        <img src={currentTrack.cover} alt={currentTrack.title} />
        <div className="track-details">
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
        <button onClick={() => toggleFavorite(currentTrack.id)}>
          <Heart size={20} fill={favorites.includes(currentTrack.id) ? '#FF0055' : 'none'} strokeWidth={2.5} color={favorites.includes(currentTrack.id) ? '#FF0055' : '#000'} />
        </button>
      </div>

      {/* 2. Controlos de Áudio */}
      <div className="player-controls">
       <div className="buttons-row">

{/* O teu Player.jsx tem de extrair as funções com os nomes corretos lá no topo:
    const { isPlaying, togglePlay, playNext, playPrevious } = useContext(AudioContext); 
*/}

<div className="buttons-row">

  {/* A função chama-se playPrevious, mas o desenho chama-se SkipBack */}
  <button className="play-btn" onClick={playPrevious}>
    <SkipBack size={20} color="#000" />
  </button>

  <button className="play-btn" onClick={togglePlay}>
    {isPlaying ? <Pause size={18} color="#000" strokeWidth={3} /> : <Play size={18} color="#000" strokeWidth={3} />}
  </button>

  {/* A função chama-se playNext, mas o desenho chama-se SkipForward */}
  <button className="play-btn" onClick={playNext}>
    <SkipForward size={20} color="#000" />
  </button>

</div>
</div>

        {/* Linha de Tempo */}
        <div className="timeline-row">
          <span>{formatTime(currentTime)}</span>
          <input 
            type="range" min={0} max={duration || 0} value={currentTime} 
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Volume (Desaparece no Telemóvel) */}
      <div className="player-volume">
        <Volume2 size={18} color="#000" strokeWidth={2.5} />
        <input 
          type="range" min={0} max={1} step={0.01} value={volume} 
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>


      

      {/* MAGIA DO DESIGN RESPONSIVO AQUI */}
      <style>{`
        .player-empty { height: 100px; background: #FFFFFF; border-top: 4px solid #000000; }
        
        .brutal-player { 
          background: #FFFFFF; border-top: 4px solid #000000; 
          display: flex; align-items: center; justify-content: space-between; 
          padding: 0 24px; position: sticky; bottom: 0; z-index: 99;
          height: 100px;
        }

        .player-info { display: flex; align-items: center; gap: 16px; width: 30%; min-width: 200px; }
        .player-info img { width: 60px; height: 60px; border: 3px solid #000000; object-fit: cover; }
        .track-details { min-width: 0; flex: 1; }
        .track-details h4 { margin: 0; font-size: 13px; font-weight: 900; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .track-details p { margin: 4px 0 0 0; font-size: 11px; color: #555; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .player-info button { background: none; border: none; cursor: pointer; padding: 0; flex-shrink: 0; }

        .player-controls { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 40%; }
        .buttons-row { display: flex; align-items: center; gap: 24px; }
        .icon-btn { cursor: pointer; color: #000; stroke-width: 2.5px; }
        
        .play-btn { 
          background: #00FF66; border: 3px solid #000000; border-radius: 0px; 
          padding: 8px 16px; display: flex; cursor: pointer; box-shadow: 3px 3px 0px #000000; 
        }
        .play-btn:active { box-shadow: 0px 0px 0px #000000; transform: translate(3px, 3px); }

        .timeline-row { display: flex; align-items: center; gap: 12px; width: 100%; font-size: 11px; font-weight: bold; }
        
        .player-volume { display: flex; align-items: center; gap: 12px; width: 30%; justify-content: flex-end; }
        
        input[type="range"] { flex: 1; -webkit-appearance: none; background: transparent; height: 6px; border: 2px solid #000; cursor: pointer; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; background: #00FF66; border: 2px solid #000; }
        .player-volume input[type="range"] { max-width: 80px; }

        /* REGRAS PARA O TELEMÓVEL */
        @media (max-width: 768px) {
          .brutal-player { 
            flex-direction: column; height: auto; padding: 16px; gap: 16px;
          }
          .player-info { width: 100%; min-width: auto; justify-content: space-between; }
          .player-controls { width: 100%; }
          .player-volume { display: none; } /* Esconde o volume para poupar espaço */
        }
      `}</style>
    </div>
  );
}