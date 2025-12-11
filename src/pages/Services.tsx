import { motion } from "framer-motion";
import { useState } from "react";
import {
  Palette,
  Printer,
  Video,
  Globe,
  FileText,
  CheckCircle,
  Star,
  Sparkles,
  Image,
  Share2,
  Megaphone,
  PenTool,
  Monitor,
  Smartphone,
  Film,
  Play,
  Layout,
  Search,
  FileCheck,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { NeonCard } from "@/components/ui/neon-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const serviceCategories = [
  {
    id: "digital",
    icon: Palette,
    title: "Design Digital",
    description: "Artes profissionais para sua presença digital",
    items: [
      {
        icon: Image,
        title: "Artes para Redes Sociais",
        description: "Posts, stories, reels, carrosséis e thumbnails otimizados para engajamento.",
        features: ["Posts para Feed", "Stories Animados", "Capas de Destaque", "Thumbnails YouTube"],
      },
      {
        icon: Megaphone,
        title: "Flyers e Banners",
        description: "Material promocional digital para suas campanhas e divulgações.",
        features: ["Flyers Digitais", "Banners Web", "E-mail Marketing", "Ads para Redes"],
      },
      {
        icon: PenTool,
        title: "Identidade Visual",
        description: "Criação de marca completa que representa a essência do seu negócio.",
        features: ["Logo e Variações", "Paleta de Cores", "Tipografia", "Manual da Marca"],
      },
      {
        icon: Star,
        title: "Edições Criativas",
        description: "Manipulação de imagens e criação de composições impactantes.",
        features: ["Tratamento de Fotos", "Montagens", "Mockups", "Efeitos Especiais"],
      },
    ],
  },
  {
    id: "impressos",
    icon: Printer,
    title: "Impressos",
    description: "Materiais gráficos em parceria com gráfica",
    items: [
      {
        icon: Layout,
        title: "Banners e Faixas",
        description: "Materiais de grande formato para eventos, lojas e promoções.",
        features: ["Banners Lona", "Windbanners", "Faixas", "Backdrops"],
      },
      {
        icon: FileCheck,
        title: "Cartões e Papelaria",
        description: "Materiais impressos essenciais para seu negócio.",
        features: ["Cartões de Visita", "Papel Timbrado", "Envelopes", "Pastas"],
      },
      {
        icon: Share2,
        title: "Adesivos e Etiquetas",
        description: "Personalização completa para produtos e embalagens.",
        features: ["Adesivos Recortados", "Etiquetas", "Selos", "QR Codes"],
      },
      {
        icon: FolderOpen,
        title: "Materiais Especiais",
        description: "Cavaletes, placas e materiais diferenciados.",
        features: ["Cavaletes A", "Placas PVC", "Totens", "Displays"],
      },
    ],
    note: "Trabalhamos em parceria com gráficas certificadas para garantir a melhor qualidade de impressão, papel e acabamento.",
  },
  {
    id: "video",
    icon: Video,
    title: "Vídeo e Motion",
    description: "Edição e animações para suas mídias",
    items: [
      {
        icon: Film,
        title: "Edição de Vídeos",
        description: "Edição profissional para YouTube, Instagram, TikTok e mais.",
        features: ["Cortes Dinâmicos", "Correção de Cor", "Legendas", "Trilha Sonora"],
      },
      {
        icon: Play,
        title: "Motion Graphics",
        description: "Animações e efeitos visuais para destacar seu conteúdo.",
        features: ["Intros e Outros", "Lower Thirds", "Transições", "Efeitos"],
      },
      {
        icon: Smartphone,
        title: "Vídeos para Redes",
        description: "Conteúdo otimizado para engajamento nas redes sociais.",
        features: ["Reels", "TikToks", "Stories", "Shorts"],
      },
      {
        icon: Megaphone,
        title: "Vídeos Comerciais",
        description: "Trailers e vídeos promocionais para seu negócio.",
        features: ["Vídeos de Produto", "Trailers", "Apresentações", "Depoimentos"],
      },
    ],
  },
  {
    id: "web",
    icon: Globe,
    title: "Web e Landing Pages",
    description: "Presença digital profissional",
    items: [
      {
        icon: Monitor,
        title: "Sites Institucionais",
        description: "Sites completos para apresentar seu negócio de forma profissional.",
        features: ["Design Responsivo", "SEO Básico", "Formulários", "Integrações"],
      },
      {
        icon: Megaphone,
        title: "Landing Pages",
        description: "Páginas de alta conversão para suas campanhas e lançamentos.",
        features: ["Copy Persuasiva", "CTAs Otimizados", "A/B Testing", "Analytics"],
      },
      {
        icon: Image,
        title: "Portfólios",
        description: "Mostre seu trabalho de forma elegante e impactante.",
        features: ["Galeria de Projetos", "Categorias", "Filtros", "Lightbox"],
      },
      {
        icon: Layout,
        title: "Páginas de Captura",
        description: "Capture leads e construa sua lista de contatos.",
        features: ["Formulários", "Pop-ups", "Exit Intent", "Automações"],
      },
    ],
    note: "Inclui orientação sobre hospedagem, domínio e configurações básicas de SEO para seu site aparecer no Google.",
  },
  {
    id: "solucoes",
    icon: FileText,
    title: "Soluções Digitais",
    description: "Documentos e materiais personalizados",
    items: [
      {
        icon: FileCheck,
        title: "Catálogos Digitais",
        description: "Apresente seus produtos de forma organizada e profissional.",
        features: ["Layout Profissional", "Fotos Otimizadas", "Preços", "Contatos"],
      },
      {
        icon: FolderOpen,
        title: "PDFs Interativos",
        description: "Documentos com links, botões e elementos clicáveis.",
        features: ["Links Internos", "Botões de Ação", "Índice Navegável", "Formulários"],
      },
      {
        icon: PenTool,
        title: "Cards e Convites",
        description: "Materiais personalizados para eventos e ocasiões especiais.",
        features: ["Convites Digitais", "Save the Date", "Cards Animados", "Menu Digital"],
      },
      {
        icon: Share2,
        title: "Apresentações",
        description: "Slides profissionais que impressionam seu público.",
        features: ["Design Moderno", "Animações", "Infográficos", "Templates"],
      },
    ],
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("digital");

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
              Serviços
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Soluções Criativas{" "}
              <span className="text-gradient">Completas</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Do conceito à entrega final, ofereço uma gama completa de serviços 
              para transformar sua presença visual e digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-12">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-card data-[state=inactive]:border data-[state=inactive]:border-border data-[state=inactive]:hover:border-primary/50 transition-all"
                >
                  <category.icon className="w-4 h-4" />
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <NeonCard className="h-full">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display text-xl font-semibold mb-2">
                                {item.title}
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                {item.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {item.features.map((feature) => (
                                  <span
                                    key={feature}
                                    className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground"
                                  >
                                    <CheckCircle className="w-3 h-3 text-primary" />
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </NeonCard>
                      </motion.div>
                    ))}
                  </div>

                  {category.note && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20 text-center"
                    >
                      <p className="text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-primary inline mr-2" />
                        {category.note}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Pronto Para{" "}
              <span className="text-gradient">Começar</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Entre em contato para discutir seu projeto. Estou pronto para 
              transformar suas ideias em realidade visual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="w-5 h-5" />
                  Solicitar Orçamento
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/portfolio">Ver Portfólio</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
