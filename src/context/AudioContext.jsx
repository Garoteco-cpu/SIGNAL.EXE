import { createContext, useState, useEffect, useRef } from 'react';
import tracksData from '../data/tracks.json';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [favorites, setFavorites] = useState([]);

  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio();
  }

  // Efeito 1: Controlar Play e Pause reais do áudio nativo
  useEffect(() => {
    if (!currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.log("Reprodução automática barrada. Aguarda clique do utilizador:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Efeito 2: Controlar a mudança de faixa e ouvir os tempos da música
  useEffect(() => {
    if (!currentTrack) return;

    setCurrentTime(0);
    setDuration(0);

    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }

    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    const updateDuration = () => setDuration(audioRef.current.duration || 0);
    
    // 🚨 CORRIGIDO: Agora chama a função certa quando a música chega ao fim
    const handleEnded = () => {
      playNext();
    };

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (currentTrack) setIsPlaying(!isPlaying);
  };

  /* ==========================================================================
     🕹️ FUNÇÕES DE NAVEGAÇÃO (Nomes separados dos Ícones)
     ========================================================================== */
  
  const playNext = () => {
    if (!currentTrack || !tracksData || tracksData.length === 0) return;
    const currentIndex = tracksData.findIndex(track => track.id === currentTrack.id);
    
    if (currentIndex !== -1 && currentIndex < tracksData.length - 1) {
      setCurrentTrack(tracksData[currentIndex + 1]);
    } else {
      setCurrentTrack(tracksData[0]);
    }
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (!currentTrack || !tracksData || tracksData.length === 0) return;
    const currentIndex = tracksData.findIndex(track => track.id === currentTrack.id);
    
    if (currentIndex > 0) {
      setCurrentTrack(tracksData[currentIndex - 1]);
    } else {
      setCurrentTrack(tracksData[tracksData.length - 1]);
    }
    setIsPlaying(true);
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFavorite = (trackId) => {
    setFavorites(prev => 
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    );
  };

  return (
    <AudioContext.Provider value={{
      currentTrack, setCurrentTrack,
      isPlaying, setIsPlaying, togglePlay,
      playNext, playPrevious, // 🚨 Nomes corretos enviados para fora
      currentTime, setCurrentTime,
      duration, setDuration,
      seek,
      volume, setVolume,
      favorites, toggleFavorite
    }}>
      {children}
    </AudioContext.Provider>
  );
};