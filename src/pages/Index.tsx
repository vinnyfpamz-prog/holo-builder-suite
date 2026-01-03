import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Palette, Video, Globe, Printer, FileText, Sparkles, Star, ChevronRight, User, Target, Heart, Lightbulb, Rocket, CheckCircle, Zap, Code, Image, Share2, Megaphone, PenTool, Monitor, Smartphone, Film, Layout, Search, FileCheck, FolderOpen, ExternalLink, Filter, Quote, ChevronLeft, MessageCircle, Instagram, Mail, MapPin, Phone, Send, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { NeonCard } from "@/components/ui/neon-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import vinnyPhoto from "@/assets/vinny-photo.png";

// Types for database items
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

type VideoTestimonial = {
  id: string;
  title: string;
  client_name: string | null;
  client_role: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
};

// ========== DATA ==========

const services = [{
  icon: Palette,
  title: "Design Digital",
  description: "Artes para redes sociais, flyers, banners e identidade visual com acabamento premium."
}, {
  icon: Printer,
  title: "Impressos",
  description: "Banners, windbanners, cartões de visita, adesivos e materiais gráficos profissionais."
}, {
  icon: Video,
  title: "Edição de Vídeo",
  description: "Edição profissional de vídeos para suas campanhas digitais e redes sociais."
}, {
  icon: Globe,
  title: "Web e Landing Pages",
  description: "Sites profissionais, landing pages de alta conversão e portfólios digitais."
}, {
  icon: FileText,
  title: "Soluções Digitais",
  description: "Catálogos, PDFs interativos, documentos digitais e materiais personalizados."
}];
const stats = [{
  value: "500+",
  label: "Projetos Entregues"
}, {
  value: "200+",
  label: "Clientes Satisfeitos"
}, {
  value: "6+",
  label: "Anos de Experiência"
}, {
  value: "100%",
  label: "Dedicação"
}];
const timeline = [{
  year: "2020",
  title: "Início da Jornada",
  description: "Comecei a explorar o mundo do design gráfico, aprendendo as bases fundamentais e conquistando os primeiros clientes."
}, {
  year: "2021",
  title: "Expansão de Serviços",
  description: "Adicionei edição de vídeo ao meu portfólio e desenvolvi projetos de identidade visual."
}, {
  year: "2022",
  title: "Web Design",
  description: "Expandi para criação de sites e landing pages, oferecendo soluções digitais completas."
}, {
  year: "2023",
  title: "Parceria Gráfica",
  description: "Estabeleci parcerias com gráficas para oferecer materiais impressos de qualidade."
}, {
  year: "2024",
  title: "Crescimento e Inovação",
  description: "Incorporei novas ferramentas de IA e tecnologias para entregar projetos ainda mais impactantes."
}, {
  year: "2025",
  title: "Novos Horizontes",
  description: "Ampliação do portfólio com soluções digitais avançadas e atendimento personalizado."
}, {
  year: "2026",
  title: "Atualidade",
  description: "Atendendo clientes em toda a região de Parauapebas e entregando projetos de alto impacto."
}];
const skills = [{
  name: "Corel Draw",
  level: 95
}, {
  name: "CapCut",
  level: 90
}, {
  name: "Canva",
  level: 95
}, {
  name: "PicsArt",
  level: 85
}, {
  name: "Pacote Office",
  level: 88
}, {
  name: "Marketing Digital",
  level: 85
}, {
  name: "Técnicas em Vendas",
  level: 80
}, {
  name: "Ferramentas IA",
  level: 88
}, {
  name: "Fotografia",
  level: 85
}];
const values = [{
  icon: Target,
  title: "Foco no Cliente",
  description: "Cada projeto é único. Dedico atenção total às necessidades e objetivos de cada cliente."
}, {
  icon: Heart,
  title: "Paixão pelo Design",
  description: "O design não é apenas meu trabalho, é minha paixão. Isso reflete em cada pixel que crio."
}, {
  icon: Lightbulb,
  title: "Inovação Constante",
  description: "Busco sempre as últimas tendências e tecnologias para entregar resultados modernos."
}, {
  icon: Rocket,
  title: "Resultados Reais",
  description: "Meu objetivo é criar designs que não apenas impressionam, mas geram resultados."
}];
const processSteps = [{
  step: "01",
  icon: Lightbulb,
  title: "Conceito",
  description: "Entendo suas necessidades, objetivos e visão. Pesquiso referências e defino a direção criativa."
}, {
  step: "02",
  icon: Palette,
  title: "Criação",
  description: "Desenvolvo propostas criativas, explorando diferentes abordagens e estilos visuais."
}, {
  step: "03",
  icon: Zap,
  title: "Refinamento",
  description: "Ajustes e melhorias baseadas no seu feedback até alcançar a perfeição desejada."
}, {
  step: "04",
  icon: CheckCircle,
  title: "Entrega",
  description: "Arquivos finais em todos os formatos necessários, prontos para uso imediato."
}];
const faqs = [{
  question: "Qual é o prazo médio de entrega?",
  answer: "O prazo varia de acordo com a complexidade do projeto. Artes simples podem ser entregues em 24-48h, enquanto projetos maiores como identidades visuais podem levar de 5 a 15 dias úteis."
}, {
  question: "Como funciona o processo de pagamento?",
  answer: "Trabalho com 50% de entrada e 50% na entrega final. Aceito PIX, transferência bancária e cartão de crédito."
}, {
  question: "Quantas revisões estão incluídas?",
  answer: "Incluo até 3 rodadas de revisões em cada projeto. Revisões adicionais podem ser negociadas à parte."
}, {
  question: "Você trabalha com urgências?",
  answer: "Sim! Para projetos urgentes, aplico uma taxa adicional de acordo com a complexidade e o prazo desejado."
}, {
  question: "Você faz identidade visual completa?",
  answer: "Sim! Ofereço pacotes completos de identidade visual incluindo logo, paleta de cores, tipografia e manual da marca."
}];
const serviceCategories = [{
  id: "digital",
  icon: Palette,
  title: "Design Digital",
  description: "Artes profissionais para sua presença digital",
  items: [{
    icon: Image,
    title: "Artes para Redes Sociais",
    description: "Posts, stories, reels, carrosséis e thumbnails otimizados para engajamento.",
    features: ["Posts para Feed", "Stories", "Capas de Destaque", "Thumbnails YouTube"]
  }, {
    icon: Megaphone,
    title: "Flyers e Banners",
    description: "Material promocional digital para suas campanhas e divulgações.",
    features: ["Flyers Digitais", "Banners Web", "E-mail Marketing", "Ads para Redes"]
  }, {
    icon: PenTool,
    title: "Identidade Visual",
    description: "Criação de marca completa que representa a essência do seu negócio.",
    features: ["Logo e Variações", "Paleta de Cores", "Tipografia", "Manual da Marca"]
  }, {
    icon: Star,
    title: "Edições Criativas",
    description: "Manipulação de imagens e criação de composições impactantes.",
    features: ["Tratamento de Fotos", "Montagens", "Mockups", "Efeitos Especiais"]
  }]
}, {
  id: "impressos",
  icon: Printer,
  title: "Impressos",
  description: "Materiais gráficos em parceria com gráfica",
  items: [{
    icon: Layout,
    title: "Banners e Faixas",
    description: "Materiais de grande formato para eventos, lojas e promoções.",
    features: ["Banners Lona", "Windbanners", "Faixas", "Backdrops"]
  }, {
    icon: FileCheck,
    title: "Cartões e Papelaria",
    description: "Materiais impressos essenciais para seu negócio.",
    features: ["Cartões de Visita", "Papel Timbrado", "Envelopes", "Pastas"]
  }, {
    icon: Share2,
    title: "Adesivos e Etiquetas",
    description: "Personalização completa para produtos e embalagens.",
    features: ["Adesivos Recortados", "Etiquetas", "Selos", "QR Codes"]
  }, {
    icon: FolderOpen,
    title: "Materiais Especiais",
    description: "Cavaletes, placas e materiais diferenciados.",
    features: ["Cavaletes A", "Placas PVC", "Totens", "Displays"]
  }],
  note: "Trabalhamos em parceria com gráficas certificadas para garantir a melhor qualidade de impressão."
}, {
  id: "video",
  icon: Video,
  title: "Edição de Vídeo",
  description: "Edição profissional para suas mídias",
  items: [{
    icon: Film,
    title: "Edição de Vídeos",
    description: "Edição profissional para YouTube, Instagram, TikTok e mais.",
    features: ["Cortes Dinâmicos", "Correção de Cor", "Legendas", "Trilha Sonora"]
  }, {
    icon: Smartphone,
    title: "Vídeos para Redes",
    description: "Conteúdo otimizado para engajamento nas redes sociais.",
    features: ["Reels", "TikToks", "Stories", "Shorts"]
  }, {
    icon: Megaphone,
    title: "Vídeos Comerciais",
    description: "Trailers e vídeos promocionais para seu negócio.",
    features: ["Vídeos de Produto", "Trailers", "Apresentações", "Depoimentos"]
  }]
}, {
  id: "web",
  icon: Globe,
  title: "Web e Landing Pages",
  description: "Presença digital profissional",
  items: [{
    icon: Monitor,
    title: "Sites Institucionais",
    description: "Sites completos para apresentar seu negócio de forma profissional.",
    features: ["Design Responsivo", "SEO Básico", "Formulários", "Integrações"]
  }, {
    icon: Megaphone,
    title: "Landing Pages",
    description: "Páginas de alta conversão para suas campanhas e lançamentos.",
    features: ["Copy Persuasiva", "CTAs Otimizados", "A/B Testing", "Analytics"]
  }, {
    icon: Image,
    title: "Portfólios",
    description: "Mostre seu trabalho de forma elegante e impactante.",
    features: ["Galeria de Projetos", "Categorias", "Filtros", "Lightbox"]
  }, {
    icon: Layout,
    title: "Páginas de Captura",
    description: "Capture leads e construa sua lista de contatos.",
    features: ["Formulários", "Pop-ups", "Exit Intent", "Automações"]
  }],
  note: "Inclui orientação sobre hospedagem, domínio e configurações básicas de SEO."
}, {
  id: "solucoes",
  icon: FileText,
  title: "Soluções Digitais",
  description: "Documentos e materiais personalizados",
  items: [{
    icon: FileCheck,
    title: "Catálogos Digitais",
    description: "Apresente seus produtos de forma organizada e profissional.",
    features: ["Layout Profissional", "Fotos Otimizadas", "Preços", "Contatos"]
  }, {
    icon: FolderOpen,
    title: "PDFs Interativos",
    description: "Documentos com links, botões e elementos clicáveis.",
    features: ["Links Internos", "Botões de Ação", "Índice Navegável", "Formulários"]
  }, {
    icon: PenTool,
    title: "Cards e Convites",
    description: "Materiais personalizados para eventos e ocasiões especiais.",
    features: ["Convites Digitais", "Save the Date", "Cards", "Menu Digital"]
  }, {
    icon: Share2,
    title: "Apresentações",
    description: "Slides profissionais que impressionam seu público.",
    features: ["Design Moderno", "Infográficos", "Templates"]
  }]
}];
// Icon mapping for portfolio categories
const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Printer,
  Video,
  Globe,
  PenTool,
  Star,
};
const testimonials = [{
  id: 1,
  name: "Maria Silva",
  role: "Empresária - Loja de Roupas",
  content: "O Vinny transformou completamente a identidade visual da minha loja. As artes para redes sociais aumentaram muito o engajamento. Super recomendo!",
  rating: 5,
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
}, {
  id: 2,
  name: "João Pedro",
  role: "Dono de Restaurante",
  content: "Profissional excepcional! O cardápio digital e as artes para delivery ficaram perfeitas. Meus clientes sempre elogiam o visual.",
  rating: 5,
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
}, {
  id: 3,
  name: "Ana Carolina",
  role: "Influencer Digital",
  content: "Trabalho com o Vinny há mais de 1 ano. Ele entende exatamente o que preciso e sempre entrega no prazo. Meu feed nunca esteve tão bonito!",
  rating: 5,
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
}, {
  id: 4,
  name: "Carlos Eduardo",
  role: "CEO - Startup de Tech",
  content: "A identidade visual da nossa startup ficou incrível. Logo, site, apresentações... tudo com uma qualidade impressionante!",
  rating: 5,
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
}, {
  id: 5,
  name: "Fernanda Lima",
  role: "Personal Trainer",
  content: "Os vídeos promocionais que o Vinny fez para minha academia trouxeram muitos alunos novos. Criatividade e qualidade!",
  rating: 5,
  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"
}, {
  id: 6,
  name: "Roberto Alves",
  role: "Advogado",
  content: "Site institucional impecável e cartões de visita premium. A atenção aos detalhes é impressionante!",
  rating: 5,
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
}];
const contactInfo = [{
  icon: MessageCircle,
  label: "WhatsApp",
  value: "(94) 99102-2124",
  link: "https://wa.me/5594991022124",
  color: "text-[#25D366]"
}, {
  icon: Instagram,
  label: "Instagram",
  value: "@vinny.artz",
  link: "https://instagram.com/vinny.artz",
  color: "text-[#E4405F]"
}, {
  icon: Mail,
  label: "E-mail",
  value: "vinnyfpamz@gmail.com",
  link: "mailto:vinnyfpamz@gmail.com",
  color: "text-primary"
}];

// Video testimonials - now fetched from database
const businessHours = [{
  day: "Segunda - Sexta",
  hours: "08:00 - 18:00"
}, {
  day: "Sábado",
  hours: "09:00 - 14:00"
}, {
  day: "Domingo",
  hours: "Fechado"
}];

// ========== COMPONENT ==========

const Index = () => {
  const {
    toast
  } = useToast();
  const [activeServiceTab, setActiveServiceTab] = useState("digital");
  const [activePortfolioCategory, setActivePortfolioCategory] = useState("all");
  const [hoveredPortfolioItem, setHoveredPortfolioItem] = useState<string | null>(null);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Portfolio data from Supabase
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [portfolioCategories, setPortfolioCategories] = useState<PortfolioCategory[]>([]);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  
  // Video testimonials from Supabase
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // Fetch portfolio data from Supabase
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setIsLoadingPortfolio(true);
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('portfolio_categories')
        .select('*')
        .order('display_order');
      
      // Fetch items with category info
      const { data: itemsData } = await supabase
        .from('portfolio_items')
        .select(`
          id,
          title,
          description,
          image_url,
          video_url,
          external_link,
          category_id,
          portfolio_categories (slug)
        `)
        .order('display_order');

      if (categoriesData) {
        setPortfolioCategories(categoriesData);
      }
      
      if (itemsData) {
        const mappedItems = itemsData.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          image_url: item.image_url,
          video_url: item.video_url,
          external_link: item.external_link,
          category_slug: item.portfolio_categories?.slug || null,
        }));
        setPortfolioItems(mappedItems);
      }
      
      setIsLoadingPortfolio(false);
    };

    fetchPortfolioData();
  }, []);

  // Fetch video testimonials from Supabase
  useEffect(() => {
    const fetchVideoTestimonials = async () => {
      const { data } = await supabase
        .from('video_testimonials')
        .select('*')
        .eq('is_published', true)
        .order('display_order');

      if (data) {
        setVideoTestimonials(data);
      }
    };

    fetchVideoTestimonials();
  }, []);

  const testimonialsPerPage = 3;
  const totalTestimonialSlides = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(currentTestimonialSlide * testimonialsPerPage, (currentTestimonialSlide + 1) * testimonialsPerPage);
  const filteredPortfolioItems = activePortfolioCategory === "all" ? portfolioItems : portfolioItems.filter(item => item.category_slug === activePortfolioCategory);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Mensagem enviada!",
      description: "Entrarei em contato em breve. Obrigado pelo interesse!"
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };
  return <>
      {/* ========== HERO SECTION ========== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
        <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 0%, hsl(24 95% 53% / 0.1) 0%, transparent 50%)"
      }} />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="text-center lg:text-left order-2 lg:order-1">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6 flex-wrap">
                <img src={logo} alt="Vinny Artz" className="h-8 sm:h-10" />
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-display uppercase tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5 whitespace-nowrap">
                  Designer Gráfico
                </span>
              </motion.div>

              <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6">
                <span className="text-foreground">Vinny</span>{" "}
                <span className="text-gradient animate-glow-text">Artz</span>
              </motion.h1>

              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4">
                Designer Gráfico e Criativo Multimídia
              </motion.p>

              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
                Transformo ideias em experiências visuais impactantes. 
                Artes digitais, vídeos, impressos, web e tecnologia visual 
                para elevar sua marca ao próximo nível.
              </motion.p>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6
            }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                <Button variant="hero" size="lg" asChild className="w-full sm:w-auto text-sm sm:text-base">
                  <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto text-sm sm:text-base">
                  <a href="#portfolio">
                    Ver Portfólio
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="relative flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-md">
                <div className="absolute inset-0 bg-primary/20 blur-[60px] sm:blur-[80px] rounded-full" />
                
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsl(24_95%_53%/0.3)] sm:shadow-[0_0_60px_hsl(24_95%_53%/0.3)]">
                  <img src={vinnyPhoto} alt="Vinny Artz" className="w-full object-cover" style={{
                  filter: "drop-shadow(0 0 30px hsl(24 95% 53% / 0.3))"
                }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5
      }} className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
          <motion.div animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <motion.div animate={{
            y: [0, 12, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }} className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-10 sm:py-16 border-y border-border bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="sobre" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 0%, hsl(24 95% 53% / 0.05) 0%, transparent 50%)"
      }} />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader badge="Sobre" title="Quem Sou Eu" subtitle="Designer gráfico apaixonado por criar experiências visuais que contam histórias" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }}>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Com mais de 6 anos de experiência no mercado, já ajudei centenas de clientes 
                a transformar suas ideias em realidade. Minha jornada começou em 2020 por curiosidade 
                e se transformou em uma carreira dedicada a entregar excelência em cada projeto.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Acredito que o bom design é aquele que resolve problemas de forma elegante e impactante. 
                Cada pixel, cada cor, cada elemento tem um propósito: comunicar, conectar e converter.
              </p>
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                  Vamos Conversar
                </a>
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {values.map((value, index) => <motion.div key={value.title} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }}>
                  <NeonCard className="h-full text-center p-3 sm:p-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <value.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xs sm:text-sm font-semibold mb-1">{value.title}</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-3">{value.description}</p>
                  </NeonCard>
                </motion.div>)}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16 sm:mb-20">
            <SectionHeader badge="Trajetória" title="Minha Jornada" subtitle="Uma linha do tempo das principais conquistas e evoluções" />
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
              {timeline.map((item, index) => <motion.div key={item.year} initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className={`relative pl-6 sm:pl-8 md:pl-0 pb-8 sm:pb-12 last:pb-0 ${index % 2 === 0 ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"}`}>
                  <div className="absolute top-0 left-0 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 shadow-[0_0_20px_hsl(24_95%_53%/0.5)]" />
                  <div className="font-display text-primary text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{item.year}</div>
                  <h3 className="font-display text-base sm:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                </motion.div>)}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16 sm:mb-20">
            <SectionHeader badge="Habilidades" title="Minhas Ferramentas" subtitle="As principais tecnologias e softwares que domino" />
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
              {skills.map((skill, index) => <motion.div key={skill.name} initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }}>
                  <div className="flex justify-between mb-1 sm:mb-2">
                    <span className="text-sm sm:text-base font-medium">{skill.name}</span>
                    <span className="text-sm sm:text-base text-primary font-display">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div initial={{
                  width: 0
                }} whileInView={{
                  width: `${skill.level}%`
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 1,
                  delay: index * 0.1
                }} className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full" style={{
                  boxShadow: "0 0 10px hsl(24 95% 53% / 0.5)"
                }} />
                  </div>
                </motion.div>)}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16 sm:mb-20">
            <SectionHeader badge="Processo" title="Como Trabalho" subtitle="Um processo estruturado para garantir qualidade e sua satisfação" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {processSteps.map((step, index) => <motion.div key={step.step} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.15
            }} className="relative">
                  <NeonCard className="h-full p-3 sm:p-6">
                    <div className="font-display text-3xl sm:text-5xl font-bold text-primary/20 mb-2 sm:mb-4">{step.step}</div>
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-4">
                      <step.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-sm sm:text-xl font-semibold mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3">{step.description}</p>
                  </NeonCard>
                  {index < processSteps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/30" />}
                </motion.div>)}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <SectionHeader badge="FAQ" title="Perguntas Frequentes" subtitle="Respostas para as dúvidas mais comuns" />
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-4 sm:px-6 data-[state=open]:border-primary/50">
                    <AccordionTrigger className="font-display text-left hover:text-primary text-sm sm:text-base py-3 sm:py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-3 sm:pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section id="servicos" className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader badge="Serviços" title="O Que Eu Faço" subtitle="Soluções criativas completas para transformar sua presença visual e digital" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {services.map((service, index) => <motion.div key={service.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <NeonCard className="h-full text-center p-3 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-4 mx-auto">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xs sm:text-lg font-semibold mb-1 sm:mb-2">{service.title}</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">{service.description}</p>
                </NeonCard>
              </motion.div>)}
          </div>

          {/* Service Details Tabs */}
          <Tabs value={activeServiceTab} onValueChange={setActiveServiceTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-transparent h-auto mb-6 sm:mb-8 px-2">
              {serviceCategories.map(category => <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-display text-[10px] sm:text-xs uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-card data-[state=inactive]:border data-[state=inactive]:border-border data-[state=inactive]:hover:border-primary/50 transition-all">
                  <category.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline sm:inline">{category.title}</span>
                </TabsTrigger>)}
            </TabsList>

            {serviceCategories.map(category => <TabsContent key={category.id} value={category.id}>
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }}>
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{category.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    {category.items.map((item, index) => <motion.div key={item.title} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.1
                }}>
                        <NeonCard className="h-full">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-base sm:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{item.description}</p>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {item.features.map(feature => <span key={feature} className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-secondary text-muted-foreground">
                                    <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary flex-shrink-0" />
                                    <span className="truncate">{feature}</span>
                                  </span>)}
                              </div>
                            </div>
                          </div>
                        </NeonCard>
                      </motion.div>)}
                  </div>
                  {category.note && <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.5
              }} className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-primary inline mr-1 sm:mr-2" />
                        {category.note}
                      </p>
                    </motion.div>}
                </motion.div>
              </TabsContent>)}
          </Tabs>
        </div>
      </section>

      {/* ========== PORTFOLIO SECTION ========== */}
      <section id="portfolio" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader badge="Portfólio" title="Meus Trabalhos" subtitle="Uma seleção dos projetos que tive o prazer de desenvolver" />

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-2">
            <Button 
              key="all" 
              variant={activePortfolioCategory === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActivePortfolioCategory("all")} 
              className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Todos</span>
            </Button>
            {portfolioCategories.map(category => {
              const IconComponent = categoryIconMap[category.icon || 'Star'] || Star;
              return (
                <Button 
                  key={category.id} 
                  variant={activePortfolioCategory === category.slug ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActivePortfolioCategory(category.slug)} 
                  className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto"
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{category.name}</span>
                </Button>
              );
            })}
          </motion.div>

          {isLoadingPortfolio ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[4/3] rounded-lg sm:rounded-xl bg-secondary animate-pulse" />
              ))}
            </div>
          ) : filteredPortfolioItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum projeto encontrado nesta categoria.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredPortfolioItems.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  transition={{ delay: index * 0.1 }} 
                  className="group relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer border-2 border-primary/30 hover:border-primary shadow-[0_0_15px_hsl(24_95%_53%/0.15)] hover:shadow-[0_0_30px_hsl(24_95%_53%/0.3)] transition-all duration-300" 
                  onMouseEnter={() => setHoveredPortfolioItem(item.id)} 
                  onMouseLeave={() => setHoveredPortfolioItem(null)}
                >
                  {item.video_url ? (
                    <video 
                      src={item.video_url}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  ) : (
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop'} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  {item.video_url && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                      <Play className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end">
                    <span className="text-[10px] sm:text-xs font-display uppercase tracking-wider text-primary mb-1 sm:mb-2">
                      {portfolioCategories.find(c => c.slug === item.category_slug)?.name || 'Projeto'}
                    </span>
                    <h3 className="font-display text-sm sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{item.description}</p>
                    {item.external_link ? (
                      <a href={item.external_link} target="_blank" rel="noopener noreferrer">
                        <Button variant="hero" size="sm" className="w-full text-xs flex items-center justify-center gap-1.5">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          Ver Projeto
                        </Button>
                      </a>
                    ) : (
                      <Button variant="hero" size="sm" className="w-full text-xs flex items-center justify-center gap-1.5">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        Ver Detalhes
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="mt-8 sm:mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-primary/5 border border-primary/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Portfólio atualizado dinamicamente
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section id="depoimentos" className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader badge="Depoimentos" title="O Que Dizem Meus Clientes" subtitle="A satisfação dos meus clientes é minha maior motivação" />

          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 sm:mb-12">
            {[{
            value: "200+",
            label: "Clientes"
          }, {
            value: "5.0",
            label: "Avaliação"
          }, {
            value: "100%",
            label: "Satisfação"
          }].map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="text-center">
                <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>)}
          </div>

          <div className="relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentTestimonials.map((testimonial, index) => <motion.div key={testimonial.id} initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                  <NeonCard className="h-full p-4 sm:p-6">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20 mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-none">"{testimonial.content}"</p>
                    <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />)}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary/30" />
                      <div className="min-w-0">
                        <div className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground truncate">{testimonial.role}</div>
                      </div>
                    </div>
                  </NeonCard>
                </motion.div>)}
            </div>

            {totalTestimonialSlides > 1 && <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Button variant="outline" size="icon" onClick={() => setCurrentTestimonialSlide(prev => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides)} className="rounded-full w-8 h-8 sm:w-10 sm:h-10">
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <div className="flex gap-1.5 sm:gap-2">
                  {[...Array(totalTestimonialSlides)].map((_, i) => <button key={i} onClick={() => setCurrentTestimonialSlide(i)} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${i === currentTestimonialSlide ? "w-6 sm:w-8 bg-primary" : "bg-primary/30 hover:bg-primary/50"}`} />)}
                </div>
                <Button variant="outline" size="icon" onClick={() => setCurrentTestimonialSlide(prev => (prev + 1) % totalTestimonialSlides)} className="rounded-full w-8 h-8 sm:w-10 sm:h-10">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>}
          </div>

          {/* Video Testimonials Section */}
          <div className="mt-16 sm:mt-20">
            <SectionHeader 
              badge="Vídeos" 
              title="Depoimentos em Vídeo" 
              subtitle="Relatos reais de clientes satisfeitos" 
            />
            
            {videoTestimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Vídeos em breve...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {videoTestimonials.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <NeonCard 
                      className="h-full aspect-[9/16] relative overflow-hidden group cursor-pointer"
                      onClick={() => setPlayingVideo(playingVideo === video.id ? null : video.id)}
                    >
                      {playingVideo === video.id ? (
                        <video 
                          src={video.video_url || ''}
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          autoPlay
                          playsInline
                        />
                      ) : (
                        <>
                          {/* Video thumbnail or first frame */}
                          <video 
                            src={video.video_url || ''}
                            className="absolute inset-0 w-full h-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-background/30" />
                          
                          {/* Play button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/30 transition-all"
                              style={{
                                boxShadow: "0 0 30px hsl(24 95% 53% / 0.3)"
                              }}
                            >
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary ml-1" />
                            </motion.div>
                          </div>
                          
                          {/* Title at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-background/90 to-transparent">
                            <p className="text-[10px] sm:text-xs font-medium text-foreground line-clamp-2">{video.title}</p>
                            {video.client_name && (
                              <p className="text-[9px] sm:text-[10px] text-muted-foreground">{video.client_name}</p>
                            )}
                          </div>
                        </>
                      )}
                    </NeonCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contato" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeader badge="Contato" title="Vamos Criar Algo Incrível Juntos?" subtitle="Estou pronto para transformar suas ideias em realidade" />

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <h3 className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6">Informações de Contato</h3>
                <div className="space-y-3 sm:space-y-4">
                  {contactInfo.map((info, index) => <motion.a key={info.label} href={info.link} target={info.link.startsWith("http") ? "_blank" : undefined} rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  delay: index * 0.1
                }} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                        <info.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-muted-foreground">{info.label}</div>
                        <div className="font-medium text-sm sm:text-base truncate">{info.value}</div>
                      </div>
                    </motion.a>)}
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.3
            }}>
                <h3 className="font-display text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Horário de Atendimento
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {businessHours.map(item => <div key={item.day} className="flex justify-between text-xs sm:text-sm py-1.5 sm:py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>)}
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.4
            }} className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="font-display text-base sm:text-lg font-semibold mb-1 sm:mb-2">Resposta Rápida</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  Para atendimento imediato, entre em contato pelo WhatsApp!
                </p>
                <Button variant="hero" className="w-full" asChild>
                  <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="lg:col-span-3">
              <NeonCard>
                <h3 className="font-display text-2xl font-bold mb-6">Envie uma Mensagem</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Seu Nome *</label>
                      <Input type="text" placeholder="Digite seu nome" value={formData.name} onChange={e => setFormData({
                      ...formData,
                      name: e.target.value
                    })} required className="bg-secondary/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Seu E-mail *</label>
                      <Input type="email" placeholder="seu@email.com" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} required className="bg-secondary/50" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">WhatsApp</label>
                      <Input type="tel" placeholder="(00) 00000-0000" value={formData.phone} onChange={e => setFormData({
                      ...formData,
                      phone: e.target.value
                    })} className="bg-secondary/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Assunto *</label>
                      <Input type="text" placeholder="Sobre o que deseja falar?" value={formData.subject} onChange={e => setFormData({
                      ...formData,
                      subject: e.target.value
                    })} required className="bg-secondary/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sua Mensagem *</label>
                    <Textarea placeholder="Descreva seu projeto ou dúvida..." value={formData.message} onChange={e => setFormData({
                    ...formData,
                    message: e.target.value
                  })} required rows={6} className="bg-secondary/50 resize-none" />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <>
                        <span className="animate-spin">⏳</span>
                        Enviando...
                      </> : <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    Responderei sua mensagem em até 24 horas úteis.
                  </p>
                </form>
              </NeonCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="section-padding relative overflow-hidden bg-secondary/20">
        <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 100%, hsl(24 95% 53% / 0.1) 0%, transparent 50%)"
      }} />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto Para{" "}
              <span className="text-gradient">Começar</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Estou pronto para transformar suas ideias em realidade visual. 
              Entre em contato e vamos conversar sobre seu projeto.
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                <Sparkles className="w-5 h-5" />
                Iniciar Projeto
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>;
};
export default Index;