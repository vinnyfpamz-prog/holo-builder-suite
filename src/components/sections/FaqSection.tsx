import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Qual é o prazo médio de entrega?",
    answer: "O prazo varia conforme a complexidade do projeto. Para artes simples como posts e stories, a entrega é feita em 24 a 48 horas. Já projetos mais elaborados, como identidades visuais completas, podem levar de 5 a 15 dias úteis. Sempre informo uma estimativa precisa antes de iniciar o trabalho."
  },
  {
    question: "Como funciona o processo de pagamento?",
    answer: "Trabalho com 50% de entrada para iniciar o projeto e 50% na entrega final aprovada. Aceito PIX (pagamento instantâneo), transferência bancária e cartão de crédito em até 3x sem juros. Para projetos maiores, podemos negociar condições especiais de parcelamento."
  },
  {
    question: "Quantas revisões estão incluídas?",
    answer: "Cada projeto inclui até 3 rodadas de revisões sem custo adicional. Isso garante que o resultado final fique exatamente como você imaginou. Caso precise de ajustes extras além dessas 3 rodadas, podemos negociar um valor adicional de acordo com as alterações solicitadas."
  },
  {
    question: "Você trabalha com urgências?",
    answer: "Sim, atendo projetos urgentes! Para entregas expressas, aplico uma taxa adicional que varia de 30% a 50% dependendo da complexidade e do prazo desejado. Quanto mais apertado o prazo, maior a taxa. Entre em contato pelo WhatsApp para verificar disponibilidade e valores para seu projeto urgente."
  },
  {
    question: "Você faz identidade visual completa?",
    answer: "Sim! Ofereço pacotes completos de identidade visual que incluem: criação de logotipo com variações (colorido, monocromático, versão para fundos escuros), definição da paleta de cores, escolha da tipografia institucional, criação de elementos visuais complementares e um manual de marca digital com todas as aplicações e regras de uso."
  },
  {
    question: "Como é o processo de criação?",
    answer: "O processo segue 4 etapas: 1) Briefing - conversamos sobre suas necessidades, referências e objetivos; 2) Criação - desenvolvo as primeiras propostas criativas; 3) Refinamento - fazemos os ajustes baseados no seu feedback; 4) Entrega - você recebe os arquivos finais em todos os formatos necessários (PNG, JPG, PDF, arquivos editáveis quando aplicável)."
  },
  {
    question: "Você atende fora de Parauapebas?",
    answer: "Com certeza! Atendo clientes de todo o Brasil de forma remota. Todo o processo é feito online: briefing por chamada de vídeo ou WhatsApp, envio de propostas por e-mail, revisões digitais e entrega dos arquivos pela nuvem. A distância não é impedimento para entregarmos um trabalho de excelência!"
  },
  {
    question: "Quais formatos de arquivo você entrega?",
    answer: "Entrego os arquivos nos formatos mais adequados para cada tipo de uso: PNG e JPG para redes sociais e web, PDF para impressão, arquivos vetoriais (CDR, AI, SVG) quando contratado, e arquivos editáveis do Canva quando aplicável. Sempre pergunto sobre suas necessidades específicas para garantir que você tenha tudo o que precisa."
  }
];

const FaqItem = ({ faq, index, isOpen, onToggle }: { 
  faq: FaqItem; 
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
              {faq.question}
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
                  {faq.answer}
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
        badge="FAQ" 
        title="Perguntas Frequentes" 
        subtitle="Respostas para as dúvidas mais comuns" 
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="grid gap-3 sm:gap-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
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
            <span>Ainda tem dúvidas? Entre em contato!</span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
