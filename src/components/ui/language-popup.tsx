import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { Button } from "./button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";

export const LanguagePopup = () => {
  const { showLanguagePopup, setShowLanguagePopup, setLanguage, language } = useLanguage();
  const { playClickSound } = useAudio();

  const handleSelectLanguage = (lang: 'pt' | 'en') => {
    playClickSound();
    setLanguage(lang);
    setShowLanguagePopup(false);
  };

  return (
    <AnimatePresence>
      {showLanguagePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative max-w-md w-full mx-4 p-8 rounded-2xl bg-card border border-primary/30 shadow-[0_0_60px_hsl(24_95%_53%/0.3)]"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-2xl" />
            
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[0_0_30px_hsl(24_95%_53%/0.5)]"
            >
              <Globe className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-2xl font-bold text-center mb-2"
            >
              🇧🇷 Escolha seu idioma
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-center mb-8"
            >
              🇺🇸 Select your preferred language
            </motion.p>

            {/* Language buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => handleSelectLanguage('pt')}
                className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                  language === 'pt' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50 bg-secondary/30'
                }`}
              >
                <span className="text-4xl">🇧🇷</span>
                <div className="text-left">
                  <div className="font-display font-semibold">Português</div>
                  <div className="text-sm text-muted-foreground">Continuar em Português</div>
                </div>
                {language === 'pt' && (
                  <motion.div
                    layoutId="language-indicator"
                    className="absolute right-4 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(24_95%_53%)]"
                  />
                )}
              </button>

              <button
                onClick={() => handleSelectLanguage('en')}
                className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                  language === 'en' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50 bg-secondary/30'
                }`}
              >
                <span className="text-4xl">🇺🇸</span>
                <div className="text-left">
                  <div className="font-display font-semibold">English</div>
                  <div className="text-sm text-muted-foreground">Continue in English</div>
                </div>
                {language === 'en' && (
                  <motion.div
                    layoutId="language-indicator"
                    className="absolute right-4 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(24_95%_53%)]"
                  />
                )}
              </button>
            </motion.div>

            {/* Continue button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <Button
                variant="hero"
                className="w-full"
                onClick={() => {
                  playClickSound();
                  setShowLanguagePopup(false);
                  localStorage.setItem('vinnyartz-language-popup-seen', 'true');
                }}
              >
                {language === 'pt' ? 'Continuar' : 'Continue'}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
