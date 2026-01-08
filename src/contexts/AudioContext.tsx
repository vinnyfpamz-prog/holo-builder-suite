import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface AudioContextType {
  isMusicPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isLoading: boolean;
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

// Generate click sound - futuristic beep
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
    
    gainNode.gain.setValueAtTime(volume * 0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
};

// Ambient music URLs - calm futuristic ambient tracks (verified working URLs)
const AMBIENT_TRACKS = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.25);
  const [previousVolume, setPreviousVolume] = useState(0.25);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background music with multiple fallback tracks
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';
    
    // Try to load the first track
    audio.src = AMBIENT_TRACKS[currentTrackIndex];
    
    // Handle errors - try next track
    audio.onerror = () => {
      console.warn('Track failed to load, trying next...');
      if (currentTrackIndex < AMBIENT_TRACKS.length - 1) {
        setCurrentTrackIndex(prev => prev + 1);
        audio.src = AMBIENT_TRACKS[currentTrackIndex + 1];
      }
      setIsLoading(false);
    };
    
    audio.oncanplaythrough = () => {
      setIsLoading(false);
    };
    
    audio.onwaiting = () => {
      setIsLoading(true);
    };
    
    audio.onplaying = () => {
      setIsLoading(false);
      setIsMusicPlaying(true);
    };
    
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update source when track index changes
  useEffect(() => {
    if (audioRef.current && currentTrackIndex > 0) {
      audioRef.current.src = AMBIENT_TRACKS[currentTrackIndex];
      if (isMusicPlaying) {
        audioRef.current.play().catch(console.warn);
      }
    }
  }, [currentTrackIndex]);

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
      setIsMusicPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
          setIsLoading(false);
        })
        .catch(e => {
          console.warn('Playback failed:', e);
          setIsLoading(false);
          // Try next track on error
          if (currentTrackIndex < AMBIENT_TRACKS.length - 1) {
            setCurrentTrackIndex(prev => prev + 1);
          }
        });
    }
  }, [isMusicPlaying, currentTrackIndex]);

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
      setVolumeState(volume * 0.15);
    }
  }, [volume, isMusicPlaying]);

  const restoreVolume = useCallback(() => {
    if (audioRef.current && isMusicPlaying) {
      setVolumeState(previousVolume);
    }
  }, [previousVolume, isMusicPlaying]);

  // Futuristic click sound
  const playClickSound = useCallback(() => {
    if (isMuted) return;
    // Rising double beep
    playTone(600, 0.06, volume, 'sine');
    setTimeout(() => playTone(900, 0.08, volume * 0.8, 'sine'), 40);
    setTimeout(() => playTone(1200, 0.04, volume * 0.4, 'sine'), 80);
  }, [isMuted, volume]);

  // Soft hover sound
  const playHoverSound = useCallback(() => {
    if (isMuted) return;
    playTone(500, 0.03, volume * 0.2, 'sine');
  }, [isMuted, volume]);

  // Success sound - ascending arpeggio
  const playSuccessSound = useCallback(() => {
    if (isMuted) return;
    playTone(523, 0.08, volume, 'sine');
    setTimeout(() => playTone(659, 0.08, volume * 0.9, 'sine'), 80);
    setTimeout(() => playTone(784, 0.1, volume * 0.8, 'sine'), 160);
    setTimeout(() => playTone(1047, 0.15, volume * 0.7, 'sine'), 250);
  }, [isMuted, volume]);

  return (
    <AudioContext.Provider value={{
      isMusicPlaying,
      isMuted,
      volume,
      isLoading,
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
