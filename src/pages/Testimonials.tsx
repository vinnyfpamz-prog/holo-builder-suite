import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { NeonCard } from "@/components/ui/neon-card";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Empresária - Loja de Roupas",
    content: "O Vinny transformou completamente a identidade visual da minha loja. As artes para redes sociais aumentaram muito o engajamento. Super recomendo!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "João Pedro",
    role: "Dono de Restaurante",
    content: "Profissional excepcional! O cardápio digital e as artes para delivery ficaram perfeitas. Meus clientes sempre elogiam o visual.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Ana Carolina",
    role: "Influencer Digital",
    content: "Trabalho com o Vinny há mais de 1 ano. Ele entende exatamente o que preciso e sempre entrega no prazo. Meu feed nunca esteve tão bonito!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    role: "CEO - Startup de Tech",
    content: "A identidade visual da nossa startup ficou incrível. Logo, site, apresentações... tudo com uma qualidade impressionante. Valeu cada centavo!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
  {
    id: 5,
    name: "Fernanda Lima",
    role: "Personal Trainer",
    content: "Os vídeos promocionais que o Vinny fez para minha academia trouxeram muitos alunos novos. Criatividade e qualidade no mesmo pacote!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
  },
  {
    id: 6,
    name: "Roberto Alves",
    role: "Advogado",
    content: "Site institucional impecável e cartões de visita premium. A atenção aos detalhes é impressionante. Cliente satisfeito com certeza!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentTestimonials = testimonials.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

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
              Depoimentos
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              O Que Dizem{" "}
              <span className="text-gradient">Meus Clientes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A satisfação dos meus clientes é minha maior motivação. 
              Veja o que eles têm a dizer sobre nosso trabalho juntos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
            {[
              { value: "200+", label: "Clientes Atendidos" },
              { value: "5.0", label: "Avaliação Média" },
              { value: "100%", label: "Satisfação" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NeonCard className="h-full">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </NeonCard>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            {totalSlides > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex gap-2">
                  {[...Array(totalSlides)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentSlide
                          ? "w-8 bg-primary"
                          : "bg-primary/30 hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
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
              Quer Ser o Próximo{" "}
              <span className="text-gradient">Cliente Satisfeito</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Junte-se a centenas de clientes que transformaram sua presença visual. 
              Vamos conversar sobre seu projeto!
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
