import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Music2 } from "lucide-react";
import { useState } from "react";
import { useAudio } from "@/contexts/AudioContext";

export const AudioControls = () => {
  const { isMusicPlaying, isMuted, volume, toggleMusic, toggleMute, setVolume, playClickSound } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {/* Volume slider */}
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 100 }}
            exit={{ opacity: 0, width: 0 }}
            className="overflow-hidden"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, hsl(24 95% 53%) ${volume * 100}%, hsl(0 0% 15%) ${volume * 100}%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClickSound();
          toggleMute();
        }}
        className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors shadow-[0_0_15px_hsl(24_95%_53%/0.3)]"
        title={isMuted ? 'Ativar som' : 'Mutar'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      {/* Music toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClickSound();
          toggleMusic();
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_hsl(24_95%_53%/0.4)] ${
          isMusicPlaying 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-card border border-primary/30 text-primary hover:bg-primary/10'
        }`}
        title={isMusicPlaying ? 'Pausar música' : 'Tocar música'}
      >
        {isMusicPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Music2 className="w-6 h-6" />
          </motion.div>
        ) : (
          <Music className="w-6 h-6" />
        )}
      </motion.button>
    </motion.div>
  );
};
