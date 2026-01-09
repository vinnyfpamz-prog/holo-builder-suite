import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useAudio } from "@/contexts/AudioContext";

export const AudioControls = () => {
  const { isMusicPlaying, isMuted, volume, toggleMusic, toggleMute, setVolume, playClickSound } = useAudio();
  const [open, setOpen] = useState(false);

  const handleMainClick = () => {
    playClickSound();
    // First click: open panel. If already open, toggle music.
    if (!open) {
      setOpen(true);
      return;
    }
    toggleMusic();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 140 }}
            exit={{ opacity: 0, width: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 rounded-full bg-card border border-primary/30 px-3 py-2 shadow-[0_0_18px_hsl(24_95%_53%/0.22)]">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  toggleMute();
                }}
                className="w-8 h-8 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary hover:bg-primary/15 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <input
                aria-label="Volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, hsl(24 95% 53%) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%)`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMainClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-[0_0_18px_hsl(24_95%_53%/0.28)] ${
          isMusicPlaying ? "bg-primary text-primary-foreground border-primary/40" : "bg-card text-primary border-primary/30 hover:bg-primary/10"
        }`}
        title={open ? (isMusicPlaying ? "Pause ambience" : "Play ambience") : "Sound settings"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      {open && (
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setOpen(false);
          }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Close
        </button>
      )}
    </motion.div>
  );
};
