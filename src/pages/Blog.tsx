import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NeonCard } from "@/components/ui/neon-card";

const categories = [
  { id: "all", name: "Todos" },
  { id: "design", name: "Dicas de Design" },
  { id: "marketing", name: "Marketing e Negócios" },
  { id: "web", name: "Web e Tecnologia" },
  { id: "criatividade", name: "Criatividade" },
  { id: "tendencias", name: "Tendências" },
];

const blogPosts = [
  {
    id: 1,
    slug: "como-criar-identidade-visual-memoravel",
    title: "Como Criar uma Identidade Visual Memorável para Sua Marca",
    excerpt: "Descubra os elementos essenciais para construir uma identidade visual que se destaca no mercado e conecta com seu público-alvo de forma autêntica.",
    category: "design",
    author: "Vinny Artz",
    date: "2024-12-10",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 2,
    slug: "tendencias-design-grafico-2025",
    title: "Tendências de Design Gráfico para 2025",
    excerpt: "As principais tendências visuais que vão dominar o mercado no próximo ano. Prepare-se para inovar em seus projetos!",
    category: "tendencias",
    author: "Vinny Artz",
    date: "2024-12-08",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 3,
    slug: "ferramentas-design-gratuitas",
    title: "10 Ferramentas Gratuitas para Designers Iniciantes",
    excerpt: "Uma seleção das melhores ferramentas gratuitas para você começar sua jornada no design gráfico sem gastar nada.",
    category: "design",
    author: "Vinny Artz",
    date: "2024-12-05",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 4,
    slug: "marketing-visual-redes-sociais",
    title: "Marketing Visual nas Redes Sociais: Guia Completo",
    excerpt: "Aprenda a criar conteúdo visual que engaja e converte seguidores em clientes. Estratégias comprovadas para Instagram, TikTok e mais.",
    category: "marketing",
    author: "Vinny Artz",
    date: "2024-12-01",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 5,
    slug: "psicologia-das-cores-design",
    title: "A Psicologia das Cores no Design: Como Usar a Seu Favor",
    excerpt: "Entenda como as cores influenciam emoções e comportamentos, e aprenda a usá-las estrategicamente em seus projetos.",
    category: "criatividade",
    author: "Vinny Artz",
    date: "2024-11-28",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 6,
    slug: "landing-pages-alta-conversao",
    title: "Criando Landing Pages de Alta Conversão",
    excerpt: "Os segredos por trás de páginas que vendem. Design, copy e UX trabalhando juntos para maximizar suas conversões.",
    category: "web",
    author: "Vinny Artz",
    date: "2024-11-25",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    featured: false,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

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
              Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Insights e{" "}
              <span className="text-gradient">Inspirações</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artigos sobre design, marketing, criatividade e tendências. 
              Conteúdo para inspirar e educar profissionais e entusiastas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-2xl font-bold mb-8">Em Destaque</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-xl overflow-hidden"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-display uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                      {categories.find((c) => c.id === post.category)?.name}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <NeonCard className="h-full flex flex-col p-0 overflow-hidden">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-xs font-display uppercase tracking-wider text-primary">
                        {categories.find((c) => c.id === post.category)?.name}
                      </span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="font-display text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </NeonCard>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
