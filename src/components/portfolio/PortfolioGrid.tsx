import { useState, useMemo, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyVideo } from '@/components/ui/lazy-video';
import { LazyImage } from '@/components/ui/lazy-image';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateCategoryName, translateContent } from '@/lib/contentTranslation';

type PortfolioItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  external_link: string | null;
  category_slug: string | null;
};

type PortfolioCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
};

interface PortfolioGridProps {
  items: PortfolioItem[];
  categories: PortfolioCategory[];
  activeCategory: string;
  onOpenFullscreen: (type: 'image' | 'video', src: string, title: string) => void;
  initialItemsToShow?: number;
  loadMoreIncrement?: number;
}

export const PortfolioGrid = memo(({
  items,
  categories,
  activeCategory,
  onOpenFullscreen,
  initialItemsToShow = 6,
  loadMoreIncrement = 6
}: PortfolioGridProps) => {
  const { t, language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(initialItemsToShow);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setVisibleCount(initialItemsToShow);
  }, [activeCategory, initialItemsToShow]);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMoreItems = visibleCount < items.length;
  const remainingCount = items.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + loadMoreIncrement, items.length));
  };

  const getCategoryName = (slug: string | null) => {
    const category = categories.find(c => c.slug === slug);
    return translateCategoryName(category?.name, slug, language);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              transition={{ delay: Math.min(index * 0.05, 0.3) }} 
              className="group relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer border-2 border-primary/30 hover:border-primary shadow-[0_0_15px_hsl(24_95%_53%/0.15)] hover:shadow-[0_0_30px_hsl(24_95%_53%/0.3)] transition-all duration-300" 
              onMouseEnter={() => setHoveredItem(item.id)} 
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                if (!item.external_link) {
                  if (item.video_url) {
                    onOpenFullscreen('video', item.video_url, item.title);
                  } else if (item.image_url) {
                    onOpenFullscreen('image', item.image_url, item.title);
                  }
                }
              }}
            >
              {/* Media content with lazy loading */}
              {item.video_url ? (
                <LazyVideo 
                  src={item.video_url}
                  className="w-full h-full"
                  showPlayButton
                  autoPlayOnHover
                />
              ) : (
                <LazyImage 
                  src={item.image_url || 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              
              {/* Video indicator */}
              {item.video_url && (
                <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                  <Play className="w-3 h-3 text-primary" />
                </div>
              )}
              
              {/* Content */}
              <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs font-display uppercase tracking-wider text-primary mb-1 sm:mb-2">
                  {getCategoryName(item.category_slug)}
                </span>
                <h3 className="font-display text-sm sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-1">
                  {translateContent(item.title, language)}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                  {translateContent(item.description, language)}
                </p>
                {item.external_link ? (
                  <a 
                    href={item.external_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="hero" size="sm" className="w-full text-xs flex items-center justify-center gap-1.5">
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      {t('portfolio.view')}
                    </Button>
                  </a>
                ) : (
                  <Button variant="hero" size="sm" className="w-full text-xs flex items-center justify-center gap-1.5">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                    {translateContent('Ver Tela Cheia', language)}
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load more button */}
      {hasMoreItems && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleLoadMore}
            className="group flex items-center gap-2 px-6 py-3 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <span>{translateContent('Carregar mais', language)}</span>
            <span className="text-primary">({remainingCount})</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </Button>
        </motion.div>
      )}
    </div>
  );
});

PortfolioGrid.displayName = 'PortfolioGrid';
