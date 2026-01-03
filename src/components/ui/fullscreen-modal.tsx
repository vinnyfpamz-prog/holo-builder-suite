import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'image' | 'video';
  src: string;
  title?: string;
}

export const FullscreenModal = ({ isOpen, onClose, type, src, title }: FullscreenModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-card/80 border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:bg-card"
          >
            <X className="w-6 h-6 text-foreground" />
          </motion.button>

          {/* Title */}
          {title && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 z-50 px-4 py-2 rounded-lg bg-card/80 border border-border backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-foreground">{title}</p>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-[95vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {type === 'video' ? (
              <video
                src={src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[90vh] rounded-lg shadow-[0_0_60px_hsl(24_95%_53%/0.3)] border-2 border-primary/30"
              />
            ) : (
              <img
                src={src}
                alt={title || 'Portfolio item'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_60px_hsl(24_95%_53%/0.3)] border-2 border-primary/30"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
