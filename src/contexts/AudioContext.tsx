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

type AmbientGraph = {
  ctx: globalThis.AudioContext;
  master: GainNode;
  ambientGain: GainNode;
  nodes: Array<{ stop: () => void }>;
};

let sharedCtx: globalThis.AudioContext | null = null;
const getCtx = () => {
  if (!sharedCtx) sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return sharedCtx;
};

const makeNoiseBuffer = (ctx: globalThis.AudioContext, seconds = 2) => {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.25;
  return buffer;
};

const safeResume = async (ctx: globalThis.AudioContext) => {
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      // ignore
    }
  }
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
  const [volume, setVolumeState] = useState(0.22);
  const [previousVolume, setPreviousVolume] = useState(0.22);
  const [isLoading] = useState(false);

  const ambientRef = useRef<AmbientGraph | null>(null);
  const lastClickAtRef = useRef<number>(0);

  const applyGains = useCallback(
    (nextVolume: number, nextMuted: boolean) => {
      const graph = ambientRef.current;
      if (!graph) return;
      const v = nextMuted ? 0 : Math.max(0, Math.min(1, nextVolume));
      graph.ambientGain.gain.setTargetAtTime(v, graph.ctx.currentTime, 0.03);
    },
    []
  );

  const stopAmbient = useCallback(() => {
    const graph = ambientRef.current;
    if (!graph) return;

    // fade out quickly
    graph.ambientGain.gain.setTargetAtTime(0.0001, graph.ctx.currentTime, 0.05);

    // stop nodes after fade
    window.setTimeout(() => {
      graph.nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          // ignore
        }
      });
      ambientRef.current = null;
      setIsMusicPlaying(false);
    }, 250);
  }, []);

  const startAmbient = useCallback(async () => {
    if (ambientRef.current) return;

    const ctx = getCtx();
    await safeResume(ctx);

    const master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);

    const ambientGain = ctx.createGain();
    ambientGain.gain.value = isMuted ? 0 : volume;
    ambientGain.connect(master);

    // A calm "cosmic" pad: detuned oscillators + filtered noise + slow LFO
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 0.7;
    filter.connect(ambientGain);

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.03; // very slow
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    osc1.type = "sine";
    osc2.type = "triangle";
    osc3.type = "sine";

    // Warm chord-ish bed (A minor-ish): 55, 110, 164.8
    osc1.frequency.value = 55;
    osc2.frequency.value = 110;
    osc3.frequency.value = 164.81;
    osc2.detune.value = -9;
    osc3.detune.value = 7;

    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.22;

    osc1.connect(oscGain);
    osc2.connect(oscGain);
    osc3.connect(oscGain);
    oscGain.connect(filter);

    const noise = ctx.createBufferSource();
    noise.buffer = makeNoiseBuffer(ctx, 2);
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 280;
    noiseFilter.Q.value = 0.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.06;

    // subtle movement in noise too
    const noiseLfo = ctx.createOscillator();
    noiseLfo.type = "sine";
    noiseLfo.frequency.value = 0.07;
    const noiseLfoGain = ctx.createGain();
    noiseLfoGain.gain.value = 120;
    noiseLfo.connect(noiseLfoGain);
    noiseLfoGain.connect(noiseFilter.frequency);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(filter);

    // Start all
    const now = ctx.currentTime;
    lfo.start(now);
    noiseLfo.start(now);
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    noise.start(now);

    ambientRef.current = {
      ctx,
      master,
      ambientGain,
      nodes: [
        { stop: () => lfo.stop() },
        { stop: () => noiseLfo.stop() },
        { stop: () => osc1.stop() },
        { stop: () => osc2.stop() },
        { stop: () => osc3.stop() },
        { stop: () => noise.stop() },
      ],
    };

    applyGains(volume, isMuted);
    setIsMusicPlaying(true);
  }, [applyGains, isMuted, volume]);

  // Start passively on first user interaction (autoplay-safe)
  useEffect(() => {
    const tryAutostart = () => {
      if (!isMusicPlaying) startAmbient();
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
  }, [isMusicPlaying, startAmbient]);

  useEffect(() => {
    applyGains(volume, isMuted);
  }, [applyGains, volume, isMuted]);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) stopAmbient();
    else startAmbient();
  }, [isMusicPlaying, startAmbient, stopAmbient]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback(
    (newVolume: number) => {
      const v = Math.max(0, Math.min(1, newVolume));
      setVolumeState(v);
      setPreviousVolume(v);
      applyGains(v, isMuted);
    },
    [applyGains, isMuted]
  );

  const lowerVolumeTemporarily = useCallback(() => {
    if (!isMusicPlaying) return;
    setPreviousVolume(volume);
    const lowered = volume * 0.15;
    setVolumeState(lowered);
    applyGains(lowered, isMuted);
  }, [applyGains, isMuted, isMusicPlaying, volume]);

  const restoreVolume = useCallback(() => {
    if (!isMusicPlaying) return;
    setVolumeState(previousVolume);
    applyGains(previousVolume, isMuted);
  }, [applyGains, isMuted, isMusicPlaying, previousVolume]);

  const playClickSound = useCallback(() => {
    if (isMuted) return;
    const now = Date.now();
    if (now - lastClickAtRef.current < 110) return; // prevent doubles
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
