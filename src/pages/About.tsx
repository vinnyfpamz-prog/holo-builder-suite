import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  Target,
  Heart,
  Lightbulb,
  Rocket,
  CheckCircle,
  Award,
  Clock,
  Zap,
  Palette,
  Code,
  Video,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { NeonCard } from "@/components/ui/neon-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import vinnyPhoto from "@/assets/vinny-photo.png";

const timeline = [
  {
    year: "2019",
    title: "Início da Jornada",
    description: "Comecei a explorar o mundo do design gráfico, aprendendo as bases fundamentais.",
  },
  {
    year: "2020",
    title: "Primeiros Clientes",
    description: "Conquistei meus primeiros clientes e iniciei projetos de identidade visual.",
  },
  {
    year: "2021",
    title: "Expansão de Serviços",
    description: "Adicionei edição de vídeo e motion graphics ao meu portfólio de serviços.",
  },
  {
    year: "2022",
    title: "Web Design",
    description: "Expandi para criação de sites e landing pages, oferecendo soluções completas.",
  },
  {
    year: "2023",
    title: "Parceria Gráfica",
    description: "Estabeleci parcerias com gráficas para oferecer materiais impressos de qualidade.",
  },
  {
    year: "2024",
    title: "Vinny Artz Studio",
    description: "Consolidação como estúdio criativo completo, atendendo clientes em todo Brasil.",
  },
];

const skills = [
  { name: "Adobe Photoshop", level: 95 },
  { name: "Adobe Illustrator", level: 90 },
  { name: "Adobe Premiere", level: 85 },
  { name: "After Effects", level: 80 },
  { name: "Figma", level: 90 },
  { name: "Web Design", level: 85 },
];

const values = [
  {
    icon: Target,
    title: "Foco no Cliente",
    description: "Cada projeto é único. Dedico atenção total às necessidades e objetivos de cada cliente.",
  },
  {
    icon: Heart,
    title: "Paixão pelo Design",
    description: "O design não é apenas meu trabalho, é minha paixão. Isso reflete em cada pixel que crio.",
  },
  {
    icon: Lightbulb,
    title: "Inovação Constante",
    description: "Busco sempre as últimas tendências e tecnologias para entregar resultados modernos.",
  },
  {
    icon: Rocket,
    title: "Resultados Reais",
    description: "Meu objetivo é criar designs que não apenas impressionam, mas geram resultados.",
  },
];

const processSteps = [
  {
    step: "01",
    icon: Lightbulb,
    title: "Conceito",
    description: "Entendo suas necessidades, objetivos e visão. Pesquiso referências e defino a direção criativa.",
  },
  {
    step: "02",
    icon: Palette,
    title: "Criação",
    description: "Desenvolvo propostas criativas, explorando diferentes abordagens e estilos visuais.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Refinamento",
    description: "Ajustes e melhorias baseadas no seu feedback até alcançar a perfeição desejada.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Entrega",
    description: "Arquivos finais em todos os formatos necessários, prontos para uso imediato.",
  },
];

const tools = [
  { icon: Palette, name: "Adobe Creative Suite" },
  { icon: Code, name: "Figma" },
  { icon: Video, name: "DaVinci Resolve" },
  { icon: Code, name: "VS Code" },
];

const faqs = [
  {
    question: "Qual é o prazo médio de entrega?",
    answer: "O prazo varia de acordo com a complexidade do projeto. Artes simples podem ser entregues em 24-48h, enquanto projetos maiores como identidades visuais podem levar de 5 a 15 dias úteis. Sempre informo o prazo estimado antes de iniciar.",
  },
  {
    question: "Como funciona o processo de pagamento?",
    answer: "Trabalho com 50% de entrada e 50% na entrega final. Para projetos menores, pode ser feito pagamento integral adiantado com desconto. Aceito PIX, transferência bancária e cartão de crédito.",
  },
  {
    question: "Quantas revisões estão incluídas?",
    answer: "Incluo até 3 rodadas de revisões em cada projeto. Revisões adicionais podem ser negociadas à parte. Meu objetivo é garantir sua total satisfação com o resultado final.",
  },
  {
    question: "Você trabalha com urgências?",
    answer: "Sim! Para projetos urgentes, aplico uma taxa adicional de acordo com a complexidade e o prazo desejado. Entre em contato para verificar disponibilidade.",
  },
  {
    question: "Como posso enviar os materiais para o projeto?",
    answer: "Após fecharmos o projeto, envio um briefing detalhado e você pode compartilhar os materiais via Google Drive, WeTransfer ou diretamente pelo WhatsApp.",
  },
  {
    question: "Você faz identidade visual completa?",
    answer: "Sim! Ofereço pacotes completos de identidade visual incluindo logo, paleta de cores, tipografia, aplicações em papelaria, redes sociais e manual da marca.",
  },
];

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(24 95% 53% / 0.1) 0%, transparent 50%)" }} 
        />
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-display uppercase tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
                Sobre Mim
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Olá, Eu Sou{" "}
                <span className="text-gradient">Vinny Artz</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Designer gráfico apaixonado por criar experiências visuais que contam histórias 
                e conectam marcas com seu público. Com mais de 5 anos de experiência no mercado, 
                já ajudei centenas de clientes a transformar suas ideias em realidade.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Minha jornada começou por curiosidade e se transformou em uma carreira dedicada 
                a entregar excelência em cada projeto. Acredito que o bom design é aquele que 
                resolve problemas de forma elegante e impactante.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="https://wa.me/5594991022124" target="_blank" rel="noopener noreferrer">
                  Vamos Conversar
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_hsl(24_95%_53%/0.2)]">
                <img
                  src={vinnyPhoto}
                  alt="Vinny Artz"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              
              {/* Experience badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-4 bottom-1/4 glass rounded-lg p-4 border border-primary/30"
              >
                <div className="text-3xl font-display font-bold text-primary">5+</div>
                <div className="text-xs text-muted-foreground uppercase">Anos de Exp.</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Valores"
            title="O Que Me Move"
            subtitle="Os princípios que guiam cada projeto e cada interação com meus clientes"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <NeonCard className="h-full text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </NeonCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Trajetória"
            title="Minha Jornada"
            subtitle="Uma linha do tempo das principais conquistas e evoluções na minha carreira"
          />

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative pl-8 md:pl-0 pb-12 last:pb-0 ${
                  index % 2 === 0 ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"
                }`}
              >
                {/* Dot */}
                <div 
                  className={`absolute top-0 left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 shadow-[0_0_20px_hsl(24_95%_53%/0.5)]`}
                />
                
                <div className="font-display text-primary text-2xl font-bold mb-2">{item.year}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Habilidades"
            title="Minhas Ferramentas"
            subtitle="As principais tecnologias e softwares que domino para entregar resultados excepcionais"
          />

          <div className="max-w-2xl mx-auto space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-primary font-display">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                    style={{
                      boxShadow: "0 0 10px hsl(24 95% 53% / 0.5)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <tool.icon className="w-8 h-8 text-primary" />
                <span className="text-sm text-center">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Processo"
            title="Como Trabalho"
            subtitle="Um processo estruturado para garantir qualidade e sua satisfação em cada projeto"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <NeonCard className="h-full">
                  <div className="font-display text-5xl font-bold text-primary/20 mb-4">{step.step}</div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </NeonCard>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            badge="FAQ"
            title="Perguntas Frequentes"
            subtitle="Respostas para as dúvidas mais comuns sobre meus serviços e processo de trabalho"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="font-display text-left hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">Ainda tem dúvidas?</p>
            <Button variant="outline" asChild>
              <Link to="/contato">
                Entre em Contato
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
