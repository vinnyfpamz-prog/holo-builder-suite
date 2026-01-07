import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const { playClickSound } = useAudio();

  const toggleLanguage = () => {
    playClickSound();
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-primary/30 hover:border-primary/60 transition-all text-sm font-medium shadow-[0_0_10px_hsl(24_95%_53%/0.2)]"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe className="w-4 h-4 text-primary" />
      <span className="text-foreground">{language === 'pt' ? 'EN' : 'PT'}</span>
      <span className="text-lg">{language === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
    </motion.button>
  );
};
