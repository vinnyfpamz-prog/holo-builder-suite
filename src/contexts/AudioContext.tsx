import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface AudioContextType {
  isMusicPlaying: boolean;
  isMuted: boolean;
  volume: number;
  toggleMusic: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  lowerVolumeTemporarily: () => void;
  restoreVolume: () => void;
  playClickSound: () => void;
  playHoverSound: () => void;
  playSuccessSound: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Create audio context once
let audioContext: globalThis.AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Generate click sound
const playTone = (frequency: number, duration: number, volume: number, type: OscillatorType = 'sine') => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(volume * 0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [previousVolume, setPreviousVolume] = useState(0.3);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background music
  useEffect(() => {
    // Create audio element for ambient music
    const audio = new Audio();
    // Use a royalty-free ambient electronic track URL
    audio.src = 'https://cdn.pixabay.com/audio/2024/11/29/audio_d93c2ad31e.mp3';
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.warn('Playback failed:', e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  }, [isMusicPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    setPreviousVolume(newVolume);
  }, []);

  const lowerVolumeTemporarily = useCallback(() => {
    if (audioRef.current && isMusicPlaying) {
      setPreviousVolume(volume);
      setVolumeState(volume * 0.2);
    }
  }, [volume, isMusicPlaying]);

  const restoreVolume = useCallback(() => {
    if (audioRef.current && isMusicPlaying) {
      setVolumeState(previousVolume);
    }
  }, [previousVolume, isMusicPlaying]);

  const playClickSound = useCallback(() => {
    if (isMuted) return;
    playTone(800, 0.08, volume, 'sine');
    setTimeout(() => playTone(1200, 0.05, volume * 0.6, 'sine'), 30);
  }, [isMuted, volume]);

  const playHoverSound = useCallback(() => {
    if (isMuted) return;
    playTone(600, 0.04, volume * 0.3, 'sine');
  }, [isMuted, volume]);

  const playSuccessSound = useCallback(() => {
    if (isMuted) return;
    playTone(523, 0.1, volume, 'sine');
    setTimeout(() => playTone(659, 0.1, volume, 'sine'), 100);
    setTimeout(() => playTone(784, 0.15, volume, 'sine'), 200);
  }, [isMuted, volume]);

  return (
    <AudioContext.Provider value={{
      isMusicPlaying,
      isMuted,
      volume,
      toggleMusic,
      toggleMute,
      setVolume,
      lowerVolumeTemporarily,
      restoreVolume,
      playClickSound,
      playHoverSound,
      playSuccessSound,
    }}>
      {children}
    </AudioContext.Provider>
  );
};
