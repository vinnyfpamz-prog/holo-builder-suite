import React, { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};

// Ambient music tracks
// Nota: em alguns ambientes/iframes, links externos podem falhar (CORS/403/bloqueio). Por isso,
// tentamos primeiro um arquivo local em /public/audio.
const AMBIENT_TRACKS = [
  "/audio/ambient.mp3",
  "https://cdn.pixabay.com/audio/2024/11/29/audio_47e3f8c622.mp3",
  "https://cdn.pixabay.com/audio/2022/10/25/audio_a00e7dd04e.mp3",
  "https://cdn.pixabay.com/audio/2023/07/30/audio_e4596bdc5f.mp3",
  "https://cdn.pixabay.com/audio/2024/02/14/audio_d0bf2f2a03.mp3",
];

let sharedCtx: globalThis.AudioContext | null = null;
const getCtx = () => {
  if (!sharedCtx) sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return sharedCtx;
};

const playTone = (
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine"
) => {
  try {
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume().catch(() => undefined);

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(Math.max(0.0001, volume * 0.08), ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Audio playback failed:", e);
  }
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.25);
  const [previousVolume, setPreviousVolume] = useState(0.25);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIndex = useRef(0);
  const lastClickAtRef = useRef<number>(0);
  const hasStarted = useRef(false);

  // Initialize audio element
  const initAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";

    // Try loading tracks until one works
    const tryLoadTrack = (index: number) => {
      if (index >= AMBIENT_TRACKS.length) {
        console.warn("All ambient tracks failed to load");
        setIsLoading(false);
        return;
      }

      audio.src = AMBIENT_TRACKS[index];
      currentTrackIndex.current = index;
      // força o browser a iniciar o carregamento do novo src
      try {
        audio.load();
      } catch {
        // ignore
      }
    };

    audio.onerror = () => {
      console.warn(`Track ${currentTrackIndex.current} failed, trying next...`);
      tryLoadTrack(currentTrackIndex.current + 1);
    };

    audio.oncanplaythrough = () => {
      setIsLoading(false);
    };

    audio.onended = () => {
      // Loop to next track for variety
      const nextIndex = (currentTrackIndex.current + 1) % AMBIENT_TRACKS.length;
      tryLoadTrack(nextIndex);
      if (isMusicPlaying) {
        audio.play().catch(() => {});
      }
    };

    tryLoadTrack(0);
    audioRef.current = audio;
    return audio;
  }, [volume, isMusicPlaying]);

  // Apply volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const startMusic = useCallback(async () => {
    if (isMusicPlaying) return;
    
    setIsLoading(true);
    const audio = initAudio();
    
    try {
      await audio.play();
      setIsMusicPlaying(true);
      hasStarted.current = true;
    } catch (e) {
      console.warn("Music autoplay blocked:", e);
      setIsLoading(false);
    }
  }, [isMusicPlaying, initAudio]);

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  }, []);

  // Auto-start on first user interaction
  useEffect(() => {
    if (hasStarted.current) return;

    const tryAutostart = () => {
      if (!hasStarted.current) {
        startMusic();
      }
      window.removeEventListener("pointerdown", tryAutostart);
      window.removeEventListener("keydown", tryAutostart);
      window.removeEventListener("wheel", tryAutostart);
      window.removeEventListener("touchstart", tryAutostart);
    };

    window.addEventListener("pointerdown", tryAutostart, { once: true });
    window.addEventListener("keydown", tryAutostart, { once: true });
    window.addEventListener("wheel", tryAutostart, { once: true, passive: true } as any);
    window.addEventListener("touchstart", tryAutostart, { once: true });

    return () => {
      window.removeEventListener("pointerdown", tryAutostart);
      window.removeEventListener("keydown", tryAutostart);
      window.removeEventListener("wheel", tryAutostart as any);
      window.removeEventListener("touchstart", tryAutostart);
    };
  }, [startMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [isMusicPlaying, startMusic, stopMusic]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const v = Math.max(0, Math.min(1, newVolume));
    setVolumeState(v);
    setPreviousVolume(v);
  }, []);

  const lowerVolumeTemporarily = useCallback(() => {
    if (!isMusicPlaying) return;
    setPreviousVolume(volume);
    const lowered = volume * 0.15;
    setVolumeState(lowered);
  }, [isMusicPlaying, volume]);

  const restoreVolume = useCallback(() => {
    if (!isMusicPlaying) return;
    setVolumeState(previousVolume);
  }, [isMusicPlaying, previousVolume]);

  const playClickSound = useCallback(() => {
    if (isMuted) return;
    const now = Date.now();
    if (now - lastClickAtRef.current < 110) return;
    lastClickAtRef.current = now;

    playTone(600, 0.06, volume, "sine");
    setTimeout(() => playTone(900, 0.08, volume * 0.8, "sine"), 40);
    setTimeout(() => playTone(1200, 0.04, volume * 0.4, "sine"), 80);
  }, [isMuted, volume]);

  const playHoverSound = useCallback(() => {
    if (isMuted) return;
    playTone(500, 0.03, volume * 0.2, "sine");
  }, [isMuted, volume]);

  const playSuccessSound = useCallback(() => {
    if (isMuted) return;
    playTone(523, 0.08, volume, "sine");
    setTimeout(() => playTone(659, 0.08, volume * 0.9, "sine"), 80);
    setTimeout(() => playTone(784, 0.1, volume * 0.8, "sine"), 160);
    setTimeout(() => playTone(1047, 0.15, volume * 0.7, "sine"), 250);
  }, [isMuted, volume]);

  const value = useMemo<AudioContextType>(
    () => ({
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
    }),
    [
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
    ]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
