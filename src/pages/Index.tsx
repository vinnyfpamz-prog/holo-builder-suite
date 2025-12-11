import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Palette,
  Video,
  Globe,
  Printer,
  FileText,
  Sparkles,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { NeonCard } from "@/components/ui/neon-card";
import logo from "@/assets/logo.png";
import vinnyPhoto from "@/assets/vinny-photo.png";

const services = [
  {
    icon: Palette,
    title: "Design Digital",
    description: "Artes para redes sociais, flyers, banners e identidade visual com acabamento premium.",
  },
  {
    icon: Printer,
    title: "Impressos",
    description: "Banners, windbanners, cartões de visita, adesivos e materiais gráficos profissionais.",
  },
  {
    icon: Video,
    title: "Vídeo e Motion",
    description: "Edição de vídeos, motion graphics e animações para suas campanhas digitais.",
  },
  {
    icon: Globe,
    title: "Web e Landing Pages",
    description: "Sites profissionais, landing pages de alta conversão e portfólios digitais.",
  },
  {
    icon: FileText,
    title: "Soluções Digitais",
    description: "Catálogos, PDFs interativos, documentos digitais e materiais personalizados.",
  },
];

const stats = [
  { value: "500+", label: "Projetos Entregues" },
  { value: "200+", label: "Clientes Satisfeitos" },
  { value: "5+", label: "Anos de Experiência" },
  { value: "100%", label: "Dedicação" },
];

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Hero gradient background */}
        <div 
          className="absolute inset-0" 
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(24 95% 53% / 0.1) 0%, transparent 50%)" }} 
        />
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-6"
              >
                <img src={logo} alt="Vinny Artz" className="h-10" />
                <span className="px-3 py-1 text-xs font-display uppercase tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
                  Designer Gráfico
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              >
                <span className="text-foreground">Vinny</span>{" "}
                <span className="text-gradient animate-glow-text">Artz</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground mb-4"
              >
                Designer Gráfico e Criativo Multimídia
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Transformo ideias em experiências visuais impactantes. 
                Artes digitais, vídeos, impressos, web e tecnologia visual 
                para elevar sua marca ao próximo nível.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://wa.me/5594991022124"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Sparkles className="w-5 h-5" />
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/portfolio">
                    Ver Portfólio
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
                
                {/* Image container with border */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_hsl(24_95%_53%/0.2)]">
                  <img
                    src={vinnyPhoto}
                    alt="Vinny Artz"
                    className="w-full max-w-md object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-1/4 glass rounded-lg p-3 border border-primary/30"
                >
                  <Star className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Floating badge 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 bottom-1/3 glass rounded-lg px-4 py-2 border border-primary/30"
                >
                  <span className="font-display text-sm text-primary">+5 Anos</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Serviços"
            title="O Que Eu Faço"
            subtitle="Soluções criativas completas para transformar sua presença visual e digital"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <NeonCard className="h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </NeonCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link to="/servicos">
                Ver Todos os Serviços
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(24 95% 53% / 0.1) 0%, transparent 50%)" }} 
        />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Vamos Criar Algo{" "}
              <span className="text-gradient">Incrível</span> Juntos?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Estou pronto para transformar suas ideias em realidade visual. 
              Entre em contato e vamos conversar sobre seu projeto.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a
                href="https://wa.me/5594991022124"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Sparkles className="w-5 h-5" />
                Iniciar Projeto
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
