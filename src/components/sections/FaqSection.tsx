import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";

const FaqItemComponent = ({ 
  question, 
  answer,
  index, 
  isOpen, 
  onToggle 
}: { 
  question: string;
  answer: string;
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative group"
    >
      {/* Glow effect behind card */}
      <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 blur-md transition-all duration-500 ${isOpen ? 'opacity-70' : 'group-hover:opacity-40'}`} />
      
      <div 
        className={`relative bg-card/80 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-500 ${
          isOpen 
            ? 'border-primary shadow-[0_0_30px_rgba(249,115,22,0.3)]' 
            : 'border-border/50 hover:border-primary/40'
        }`}
      >
        {/* Question button */}
        <button
          onClick={onToggle}
          className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Icon with glow */}
            <div className={`relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
              isOpen 
                ? 'bg-primary shadow-[0_0_20px_rgba(249,115,22,0.5)]' 
                : 'bg-secondary group-hover:bg-primary/20'
            }`}>
              <motion.div
                animate={{ rotate: isOpen ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <HelpCircle className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                  isOpen ? 'text-primary-foreground' : 'text-primary'
                }`} />
              </motion.div>
              
              {/* Sparkle effect on open */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <span className={`font-display text-sm sm:text-base md:text-lg font-medium transition-colors duration-300 ${
              isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary/80'
            }`}>
              {question}
            </span>
          </div>
          
          {/* Arrow with rotation */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen 
                ? 'bg-primary shadow-[0_0_15px_rgba(249,115,22,0.5)]' 
                : 'bg-secondary group-hover:bg-primary/20'
            }`}
          >
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
              isOpen ? 'text-primary-foreground' : 'text-primary'
            }`} />
          </motion.div>
        </button>
        
        {/* Answer content with smooth expand */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.3, delay: 0.1 }
              }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                {/* Decorative line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4"
                />
                
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed pl-14 sm:pl-16"
                >
                  {answer}
                </motion.p>
                
                {/* Floating particles effect */}
                <div className="relative mt-3 pl-14 sm:pl-16 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3], 
                        y: [0, -3, 0],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqs = [
    { question: t('faq.1.q'), answer: t('faq.1.a') },
    { question: t('faq.2.q'), answer: t('faq.2.a') },
    { question: t('faq.3.q'), answer: t('faq.3.a') },
    { question: t('faq.4.q'), answer: t('faq.4.a') },
    { question: t('faq.5.q'), answer: t('faq.5.a') },
    { question: t('faq.6.q'), answer: t('faq.6.a') },
    { question: t('faq.7.q'), answer: t('faq.7.a') },
    { question: t('faq.8.q'), answer: t('faq.8.a') },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <SectionHeader 
        badge={t('faq.badge')} 
        title={t('faq.title')} 
        subtitle={t('faq.subtitle')} 
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="grid gap-3 sm:gap-4">
          {faqs.map((faq, index) => (
            <FaqItemComponent
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 sm:mt-12"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>{t('faq.cta')}</span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
