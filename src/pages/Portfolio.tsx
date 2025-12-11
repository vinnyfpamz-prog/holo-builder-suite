import { motion } from "framer-motion";
import { useState } from "react";
import {
  Palette,
  Printer,
  Video,
  Globe,
  PenTool,
  Star,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const categories = [
  { id: "all", name: "Todos", icon: Star },
  { id: "digital", name: "Artes Digitais", icon: Palette },
  { id: "impressos", name: "Impressos", icon: Printer },
  { id: "video", name: "Vídeos", icon: Video },
  { id: "web", name: "Web", icon: Globe },
  { id: "identidade", name: "Identidade Visual", icon: PenTool },
];

// Placeholder portfolio items - these will be replaced with Supabase data
const portfolioItems = [
  {
    id: 1,
    title: "Identidade Visual - Tech Startup",
    category: "identidade",
    description: "Desenvolvimento completo de marca para startup de tecnologia",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Social Media - Restaurante",
    category: "digital",
    description: "Pacote de artes para redes sociais de restaurante gourmet",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Vídeo Promocional - Academia",
    category: "video",
    description: "Vídeo institucional com motion graphics para academia fitness",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Landing Page - E-commerce",
    category: "web",
    description: "Página de vendas de alta conversão para loja online",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Cartão de Visita Premium",
    category: "impressos",
    description: "Design de cartão com acabamento especial dourado",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Logo - Cafeteria Artesanal",
    category: "identidade",
    description: "Marca completa para cafeteria com conceito artesanal",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Instagram Stories - Moda",
    category: "digital",
    description: "Templates animados para marca de moda feminina",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Banner Evento - Festival",
    category: "impressos",
    description: "Material gráfico completo para festival de música",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  },
  {
    id: 9,
    title: "Site Institucional - Advocacia",
    category: "web",
    description: "Website profissional para escritório de advocacia",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(24 95% 53% / 0.1) 0%, transparent 50%)" }} 
        />
        
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-display uppercase tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
              Portfólio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Meus{" "}
              <span className="text-gradient">Trabalhos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma seleção dos projetos que tive o prazer de desenvolver. 
              Cada trabalho representa dedicação, criatividade e resultados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </Button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs font-display uppercase tracking-wider text-primary mb-2">
                    {categories.find((c) => c.id === item.category)?.name}
                  </span>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <Button variant="glass" size="sm" className="w-fit">
                    Ver Projeto
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                {/* Border glow on hover */}
                <div 
                  className={`absolute inset-0 border-2 rounded-xl transition-all duration-300 ${
                    hoveredItem === item.id 
                      ? "border-primary shadow-[0_0_30px_hsl(24_95%_53%/0.3)]" 
                      : "border-transparent"
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Info about uploads */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/5 border border-primary/20">
              <Filter className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                O portfólio completo será atualizado via banco de dados. Cada categoria receberá projetos específicos.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Quer Ver Seu Projeto{" "}
              <span className="text-gradient">Aqui</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Entre em contato e vamos criar algo incrível juntos. 
              Seu próximo projeto pode ser o destaque deste portfólio.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                Iniciar Projeto
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
