import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.home': { pt: 'Home', en: 'Home' },
  'nav.about': { pt: 'Sobre', en: 'About' },
  'nav.services': { pt: 'Serviços', en: 'Services' },
  'nav.portfolio': { pt: 'Portfólio', en: 'Portfolio' },
  'nav.testimonials': { pt: 'Depoimentos', en: 'Testimonials' },
  'nav.contact': { pt: 'Contato', en: 'Contact' },
  
  // Hero
  'hero.badge': { pt: 'Designer Gráfico', en: 'Graphic Designer' },
  'hero.subtitle': { pt: 'Designer Gráfico e Criativo Multimídia', en: 'Graphic Designer & Multimedia Creative' },
  'hero.description': { pt: 'Transformo ideias em experiências visuais impactantes. Artes digitais, vídeos, impressos, web e tecnologia visual para elevar sua marca ao próximo nível.', en: 'I transform ideas into impactful visual experiences. Digital art, videos, print, web and visual technology to elevate your brand to the next level.' },
  'hero.cta': { pt: 'Solicitar Orçamento', en: 'Request Quote' },
  'hero.portfolio': { pt: 'Ver Portfólio', en: 'View Portfolio' },
  
  // Stats
  'stats.projects': { pt: 'Projetos Entregues', en: 'Projects Delivered' },
  'stats.clients': { pt: 'Clientes Satisfeitos', en: 'Satisfied Clients' },
  'stats.experience': { pt: 'Anos de Experiência', en: 'Years of Experience' },
  'stats.dedication': { pt: 'Dedicação', en: 'Dedication' },
  
  // About
  'about.badge': { pt: 'Sobre', en: 'About' },
  'about.title': { pt: 'Quem Sou Eu', en: 'Who Am I' },
  'about.subtitle': { pt: 'Designer gráfico apaixonado por criar experiências visuais que contam histórias', en: 'Graphic designer passionate about creating visual experiences that tell stories' },
  'about.p1': { pt: 'Com mais de 6 anos de experiência no mercado, já ajudei centenas de clientes a transformar suas ideias em realidade. Minha jornada começou em 2020 por curiosidade e se transformou em uma carreira dedicada a entregar excelência em cada projeto.', en: 'With over 6 years of experience in the market, I have helped hundreds of clients transform their ideas into reality. My journey began in 2020 out of curiosity and became a career dedicated to delivering excellence in every project.' },
  'about.p2': { pt: 'Acredito que o bom design é aquele que resolve problemas de forma elegante e impactante. Cada pixel, cada cor, cada elemento tem um propósito: comunicar, conectar e converter.', en: 'I believe that good design is one that solves problems in an elegant and impactful way. Every pixel, every color, every element has a purpose: to communicate, connect, and convert.' },
  'about.cta': { pt: 'Vamos Conversar', en: "Let's Talk" },
  
  // Values
  'values.focus.title': { pt: 'Foco no Cliente', en: 'Client Focus' },
  'values.focus.desc': { pt: 'Cada projeto é único. Dedico atenção total às necessidades e objetivos de cada cliente.', en: 'Every project is unique. I dedicate full attention to the needs and goals of each client.' },
  'values.passion.title': { pt: 'Paixão pelo Design', en: 'Passion for Design' },
  'values.passion.desc': { pt: 'O design não é apenas meu trabalho, é minha paixão. Isso reflete em cada pixel que crio.', en: 'Design is not just my job, it is my passion. This reflects in every pixel I create.' },
  'values.innovation.title': { pt: 'Inovação Constante', en: 'Constant Innovation' },
  'values.innovation.desc': { pt: 'Busco sempre as últimas tendências e tecnologias para entregar resultados modernos.', en: 'I always seek the latest trends and technologies to deliver modern results.' },
  'values.results.title': { pt: 'Resultados Reais', en: 'Real Results' },
  'values.results.desc': { pt: 'Meu objetivo é criar designs que não apenas impressionam, mas geram resultados.', en: 'My goal is to create designs that not only impress, but generate results.' },
  
  // Timeline
  'timeline.badge': { pt: 'Trajetória', en: 'Journey' },
  'timeline.title': { pt: 'Minha Jornada', en: 'My Journey' },
  'timeline.subtitle': { pt: 'Uma linha do tempo das principais conquistas e evoluções', en: 'A timeline of major achievements and evolutions' },
  
  'timeline.2020.title': { pt: 'Início da Jornada', en: 'Beginning of Journey' },
  'timeline.2020.desc': { pt: 'Comecei a explorar o mundo do design gráfico, aprendendo as bases fundamentais e conquistando os primeiros clientes.', en: 'I started exploring the world of graphic design, learning the fundamentals and winning my first clients.' },
  'timeline.2021.title': { pt: 'Expansão de Serviços', en: 'Service Expansion' },
  'timeline.2021.desc': { pt: 'Adicionei edição de vídeo ao meu portfólio e desenvolvi projetos de identidade visual.', en: 'I added video editing to my portfolio and developed visual identity projects.' },
  'timeline.2022.title': { pt: 'Web Design', en: 'Web Design' },
  'timeline.2022.desc': { pt: 'Expandi para criação de sites e landing pages, oferecendo soluções digitais completas.', en: 'I expanded into website and landing page creation, offering complete digital solutions.' },
  'timeline.2023.title': { pt: 'Parceria Gráfica', en: 'Print Partnership' },
  'timeline.2023.desc': { pt: 'Estabeleci parcerias com gráficas para oferecer materiais impressos de qualidade.', en: 'I established partnerships with print shops to offer quality printed materials.' },
  'timeline.2024.title': { pt: 'Crescimento e Inovação', en: 'Growth and Innovation' },
  'timeline.2024.desc': { pt: 'Incorporei novas ferramentas de IA e tecnologias para entregar projetos ainda mais impactantes.', en: 'I incorporated new AI tools and technologies to deliver even more impactful projects.' },
  'timeline.2025.title': { pt: 'Novos Horizontes', en: 'New Horizons' },
  'timeline.2025.desc': { pt: 'Ampliação do portfólio com soluções digitais avançadas e atendimento personalizado.', en: 'Expanding the portfolio with advanced digital solutions and personalized service.' },
  'timeline.2026.title': { pt: 'Atualidade', en: 'Present Day' },
  'timeline.2026.desc': { pt: 'Atendendo clientes em toda a região de Parauapebas e entregando projetos de alto impacto.', en: 'Serving clients throughout the Parauapebas region and delivering high-impact projects.' },
  
  // Skills
  'skills.badge': { pt: 'Habilidades', en: 'Skills' },
  'skills.title': { pt: 'Minhas Ferramentas', en: 'My Tools' },
  'skills.subtitle': { pt: 'As principais tecnologias e softwares que domino', en: 'The main technologies and software I master' },
  
  // Process
  'process.badge': { pt: 'Processo', en: 'Process' },
  'process.title': { pt: 'Como Trabalho', en: 'How I Work' },
  'process.subtitle': { pt: 'Um processo estruturado para garantir qualidade e sua satisfação', en: 'A structured process to ensure quality and your satisfaction' },
  'process.concept.title': { pt: 'Conceito', en: 'Concept' },
  'process.concept.desc': { pt: 'Entendo suas necessidades, objetivos e visão. Pesquiso referências e defino a direção criativa.', en: 'I understand your needs, goals, and vision. I research references and define the creative direction.' },
  'process.creation.title': { pt: 'Criação', en: 'Creation' },
  'process.creation.desc': { pt: 'Desenvolvo propostas criativas, explorando diferentes abordagens e estilos visuais.', en: 'I develop creative proposals, exploring different approaches and visual styles.' },
  'process.refinement.title': { pt: 'Refinamento', en: 'Refinement' },
  'process.refinement.desc': { pt: 'Ajustes e melhorias baseadas no seu feedback até alcançar a perfeição desejada.', en: 'Adjustments and improvements based on your feedback until the desired perfection is achieved.' },
  'process.delivery.title': { pt: 'Entrega', en: 'Delivery' },
  'process.delivery.desc': { pt: 'Arquivos finais em todos os formatos necessários, prontos para uso imediato.', en: 'Final files in all necessary formats, ready for immediate use.' },
  
  // Services
  'services.badge': { pt: 'Serviços', en: 'Services' },
  'services.title': { pt: 'O Que Eu Faço', en: 'What I Do' },
  'services.subtitle': { pt: 'Soluções criativas completas para transformar sua presença visual e digital', en: 'Complete creative solutions to transform your visual and digital presence' },
  
  'services.digital.title': { pt: 'Design Digital', en: 'Digital Design' },
  'services.digital.desc': { pt: 'Artes para redes sociais, flyers, banners e identidade visual com acabamento premium.', en: 'Social media art, flyers, banners, and visual identity with premium finish.' },
  'services.print.title': { pt: 'Impressos', en: 'Print' },
  'services.print.desc': { pt: 'Banners, windbanners, cartões de visita, adesivos e materiais gráficos profissionais.', en: 'Banners, windbanners, business cards, stickers, and professional graphic materials.' },
  'services.video.title': { pt: 'Edição de Vídeo', en: 'Video Editing' },
  'services.video.desc': { pt: 'Edição profissional de vídeos para suas campanhas digitais e redes sociais.', en: 'Professional video editing for your digital campaigns and social media.' },
  'services.web.title': { pt: 'Web e Landing Pages', en: 'Web & Landing Pages' },
  'services.web.desc': { pt: 'Sites profissionais, landing pages de alta conversão e portfólios digitais.', en: 'Professional websites, high-conversion landing pages, and digital portfolios.' },
  'services.solutions.title': { pt: 'Soluções Digitais', en: 'Digital Solutions' },
  'services.solutions.desc': { pt: 'Catálogos, PDFs interativos, documentos digitais e materiais personalizados.', en: 'Catalogs, interactive PDFs, digital documents, and custom materials.' },
  
  // Portfolio
  'portfolio.badge': { pt: 'Portfólio', en: 'Portfolio' },
  'portfolio.title': { pt: 'Meus Trabalhos', en: 'My Work' },
  'portfolio.subtitle': { pt: 'Confira alguns dos meus projetos recentes', en: 'Check out some of my recent projects' },
  'portfolio.all': { pt: 'Todos', en: 'All' },
  'portfolio.view': { pt: 'Ver Projeto', en: 'View Project' },
  'portfolio.loading': { pt: 'Carregando projetos...', en: 'Loading projects...' },
  'portfolio.empty': { pt: 'Nenhum projeto encontrado', en: 'No projects found' },
  
  // Testimonials
  'testimonials.badge': { pt: 'Depoimentos', en: 'Testimonials' },
  'testimonials.title': { pt: 'O Que Dizem Sobre Mim', en: 'What They Say About Me' },
  'testimonials.subtitle': { pt: 'Feedback de clientes satisfeitos que confiaram no meu trabalho', en: 'Feedback from satisfied clients who trusted my work' },
  'testimonials.video.badge': { pt: 'Vídeos', en: 'Videos' },
  'testimonials.video.title': { pt: 'Depoimentos em Vídeo', en: 'Video Testimonials' },
  'testimonials.video.subtitle': { pt: 'Relatos reais de clientes satisfeitos', en: 'Real testimonials from satisfied clients' },
  'testimonials.video.soon': { pt: 'Vídeos em breve...', en: 'Videos coming soon...' },
  
  // Testimonial content
  'testimonial.1.name': { pt: 'Maria Silva', en: 'Maria Silva' },
  'testimonial.1.role': { pt: 'Empresária - Loja de Roupas', en: 'Business Owner - Clothing Store' },
  'testimonial.1.content': { pt: 'O Vinny transformou completamente a identidade visual da minha loja. As artes para redes sociais aumentaram muito o engajamento. Super recomendo!', en: 'Vinny completely transformed the visual identity of my store. The social media art greatly increased engagement. Highly recommend!' },
  'testimonial.2.name': { pt: 'João Pedro', en: 'João Pedro' },
  'testimonial.2.role': { pt: 'Dono de Restaurante', en: 'Restaurant Owner' },
  'testimonial.2.content': { pt: 'Profissional excepcional! O cardápio digital e as artes para delivery ficaram perfeitas. Meus clientes sempre elogiam o visual.', en: 'Exceptional professional! The digital menu and delivery art turned out perfect. My customers always compliment the look.' },
  'testimonial.3.name': { pt: 'Ana Carolina', en: 'Ana Carolina' },
  'testimonial.3.role': { pt: 'Influencer Digital', en: 'Digital Influencer' },
  'testimonial.3.content': { pt: 'Trabalho com o Vinny há mais de 1 ano. Ele entende exatamente o que preciso e sempre entrega no prazo. Meu feed nunca esteve tão bonito!', en: "I've been working with Vinny for over 1 year. He understands exactly what I need and always delivers on time. My feed has never looked so beautiful!" },
  'testimonial.4.name': { pt: 'Carlos Eduardo', en: 'Carlos Eduardo' },
  'testimonial.4.role': { pt: 'CEO - Startup de Tech', en: 'CEO - Tech Startup' },
  'testimonial.4.content': { pt: 'A identidade visual da nossa startup ficou incrível. Logo, site, apresentações... tudo com uma qualidade impressionante!', en: 'The visual identity of our startup is incredible. Logo, website, presentations... everything with impressive quality!' },
  'testimonial.5.name': { pt: 'Fernanda Lima', en: 'Fernanda Lima' },
  'testimonial.5.role': { pt: 'Personal Trainer', en: 'Personal Trainer' },
  'testimonial.5.content': { pt: 'Os vídeos promocionais que o Vinny fez para minha academia trouxeram muitos alunos novos. Criatividade e qualidade!', en: 'The promotional videos Vinny made for my gym brought many new students. Creativity and quality!' },
  'testimonial.6.name': { pt: 'Roberto Alves', en: 'Roberto Alves' },
  'testimonial.6.role': { pt: 'Advogado', en: 'Lawyer' },
  'testimonial.6.content': { pt: 'Site institucional impecável e cartões de visita premium. A atenção aos detalhes é impressionante!', en: 'Impeccable institutional website and premium business cards. The attention to detail is impressive!' },
  
  // FAQ
  'faq.badge': { pt: 'FAQ', en: 'FAQ' },
  'faq.title': { pt: 'Perguntas Frequentes', en: 'Frequently Asked Questions' },
  'faq.subtitle': { pt: 'Respostas para as dúvidas mais comuns', en: 'Answers to the most common questions' },
  'faq.cta': { pt: 'Ainda tem dúvidas? Entre em contato!', en: 'Still have questions? Get in touch!' },
  
  'faq.1.q': { pt: 'Qual é o prazo médio de entrega?', en: 'What is the average delivery time?' },
  'faq.1.a': { pt: 'O prazo varia conforme a complexidade do projeto. Para artes simples como posts e stories, a entrega é feita em 24 a 48 horas. Já projetos mais elaborados, como identidades visuais completas, podem levar de 5 a 15 dias úteis. Sempre informo uma estimativa precisa antes de iniciar o trabalho.', en: 'The deadline varies according to the complexity of the project. For simple art like posts and stories, delivery is made within 24 to 48 hours. More elaborate projects, such as complete visual identities, can take 5 to 15 business days. I always provide a precise estimate before starting work.' },
  'faq.2.q': { pt: 'Como funciona o processo de pagamento?', en: 'How does the payment process work?' },
  'faq.2.a': { pt: 'Trabalho com 50% de entrada para iniciar o projeto e 50% na entrega final aprovada. Aceito PIX (pagamento instantâneo), transferência bancária e cartão de crédito em até 3x sem juros. Para projetos maiores, podemos negociar condições especiais de parcelamento.', en: 'I work with 50% upfront to start the project and 50% upon final approved delivery. I accept PIX (instant payment), bank transfer, and credit card in up to 3 interest-free installments. For larger projects, we can negotiate special installment conditions.' },
  'faq.3.q': { pt: 'Quantas revisões estão incluídas?', en: 'How many revisions are included?' },
  'faq.3.a': { pt: 'Cada projeto inclui até 3 rodadas de revisões sem custo adicional. Isso garante que o resultado final fique exatamente como você imaginou. Caso precise de ajustes extras além dessas 3 rodadas, podemos negociar um valor adicional de acordo com as alterações solicitadas.', en: 'Each project includes up to 3 rounds of revisions at no additional cost. This ensures that the final result is exactly as you imagined. If you need extra adjustments beyond these 3 rounds, we can negotiate an additional value according to the requested changes.' },
  'faq.4.q': { pt: 'Você trabalha com urgências?', en: 'Do you work with urgent requests?' },
  'faq.4.a': { pt: 'Sim, atendo projetos urgentes! Para entregas expressas, aplico uma taxa adicional que varia de 30% a 50% dependendo da complexidade e do prazo desejado. Quanto mais apertado o prazo, maior a taxa. Entre em contato pelo WhatsApp para verificar disponibilidade e valores para seu projeto urgente.', en: 'Yes, I handle urgent projects! For express deliveries, I apply an additional fee that varies from 30% to 50% depending on the complexity and desired deadline. The tighter the deadline, the higher the fee. Contact me on WhatsApp to check availability and prices for your urgent project.' },
  'faq.5.q': { pt: 'Você faz identidade visual completa?', en: 'Do you do complete visual identity?' },
  'faq.5.a': { pt: 'Sim! Ofereço pacotes completos de identidade visual que incluem: criação de logotipo com variações (colorido, monocromático, versão para fundos escuros), definição da paleta de cores, escolha da tipografia institucional, criação de elementos visuais complementares e um manual de marca digital com todas as aplicações e regras de uso.', en: 'Yes! I offer complete visual identity packages that include: logo creation with variations (colored, monochrome, dark background version), color palette definition, institutional typography selection, creation of complementary visual elements, and a digital brand manual with all applications and usage rules.' },
  'faq.6.q': { pt: 'Como é o processo de criação?', en: 'How is the creation process?' },
  'faq.6.a': { pt: 'O processo segue 4 etapas: 1) Briefing - conversamos sobre suas necessidades, referências e objetivos; 2) Criação - desenvolvo as primeiras propostas criativas; 3) Refinamento - fazemos os ajustes baseados no seu feedback; 4) Entrega - você recebe os arquivos finais em todos os formatos necessários (PNG, JPG, PDF, arquivos editáveis quando aplicável).', en: 'The process follows 4 steps: 1) Briefing - we talk about your needs, references, and goals; 2) Creation - I develop the first creative proposals; 3) Refinement - we make adjustments based on your feedback; 4) Delivery - you receive the final files in all necessary formats (PNG, JPG, PDF, editable files when applicable).' },
  'faq.7.q': { pt: 'Você atende fora de Parauapebas?', en: 'Do you serve outside Parauapebas?' },
  'faq.7.a': { pt: 'Com certeza! Atendo clientes de todo o Brasil de forma remota. Todo o processo é feito online: briefing por chamada de vídeo ou WhatsApp, envio de propostas por e-mail, revisões digitais e entrega dos arquivos pela nuvem. A distância não é impedimento para entregarmos um trabalho de excelência!', en: 'Absolutely! I serve clients from all over Brazil remotely. The entire process is done online: briefing via video call or WhatsApp, sending proposals by email, digital revisions, and file delivery via cloud. Distance is not an impediment to delivering excellent work!' },
  'faq.8.q': { pt: 'Quais formatos de arquivo você entrega?', en: 'What file formats do you deliver?' },
  'faq.8.a': { pt: 'Entrego os arquivos nos formatos mais adequados para cada tipo de uso: PNG e JPG para redes sociais e web, PDF para impressão, arquivos vetoriais (CDR, AI, SVG) quando contratado, e arquivos editáveis do Canva quando aplicável. Sempre pergunto sobre suas necessidades específicas para garantir que você tenha tudo o que precisa.', en: 'I deliver files in the most suitable formats for each type of use: PNG and JPG for social media and web, PDF for printing, vector files (CDR, AI, SVG) when contracted, and Canva editable files when applicable. I always ask about your specific needs to ensure you have everything you need.' },
  
  // Contact
  'contact.badge': { pt: 'Contato', en: 'Contact' },
  'contact.title': { pt: 'Vamos Criar Algo Incrível Juntos?', en: "Let's Create Something Amazing Together?" },
  'contact.subtitle': { pt: 'Estou pronto para transformar suas ideias em realidade', en: "I'm ready to transform your ideas into reality" },
  'contact.info': { pt: 'Informações de Contato', en: 'Contact Information' },
  'contact.hours': { pt: 'Horário de Atendimento', en: 'Business Hours' },
  'contact.quick': { pt: 'Resposta Rápida', en: 'Quick Response' },
  'contact.quickDesc': { pt: 'Para atendimento imediato, entre em contato pelo WhatsApp!', en: 'For immediate assistance, contact via WhatsApp!' },
  'contact.whatsapp': { pt: 'Chamar no WhatsApp', en: 'Chat on WhatsApp' },
  'contact.form.title': { pt: 'Envie uma Mensagem', en: 'Send a Message' },
  'contact.form.name': { pt: 'Seu Nome', en: 'Your Name' },
  'contact.form.namePlaceholder': { pt: 'Digite seu nome', en: 'Enter your name' },
  'contact.form.email': { pt: 'Seu E-mail', en: 'Your E-mail' },
  'contact.form.phone': { pt: 'WhatsApp', en: 'WhatsApp' },
  'contact.form.subject': { pt: 'Assunto', en: 'Subject' },
  'contact.form.subjectPlaceholder': { pt: 'Sobre o que deseja falar?', en: 'What would you like to discuss?' },
  'contact.form.message': { pt: 'Sua Mensagem', en: 'Your Message' },
  'contact.form.messagePlaceholder': { pt: 'Descreva seu projeto ou dúvida...', en: 'Describe your project or question...' },
  'contact.form.submit': { pt: 'Enviar Mensagem', en: 'Send Message' },
  'contact.form.sending': { pt: 'Enviando...', en: 'Sending...' },
  'contact.form.response': { pt: 'Responderei sua mensagem em até 24 horas úteis.', en: 'I will reply to your message within 24 business hours.' },
  'contact.form.success': { pt: 'Mensagem enviada!', en: 'Message sent!' },
  'contact.form.successDesc': { pt: 'Entrarei em contato em breve. Obrigado pelo interesse!', en: 'I will contact you soon. Thank you for your interest!' },
  'contact.form.error': { pt: 'Erro ao enviar', en: 'Error sending' },
  'contact.form.errorDesc': { pt: 'Por favor, tente novamente ou entre em contato pelo WhatsApp.', en: 'Please try again or contact via WhatsApp.' },
  
  // CTA
  'cta.title': { pt: 'Pronto Para', en: 'Ready To' },
  'cta.titleHighlight': { pt: 'Começar', en: 'Start' },
  'cta.description': { pt: 'Estou pronto para transformar suas ideias em realidade visual. Entre em contato e vamos conversar sobre seu projeto.', en: "I'm ready to transform your ideas into visual reality. Get in touch and let's talk about your project." },
  'cta.button': { pt: 'Iniciar Projeto', en: 'Start Project' },
  
  // Popup
  'popup.title': { pt: 'Escolha seu idioma', en: 'Choose your language' },
  'popup.subtitle': { pt: 'Select your preferred language', en: 'Selecione seu idioma preferido' },
  'popup.continue': { pt: 'Continuar', en: 'Continue' },
  
  // Audio
  'audio.play': { pt: 'Tocar Música', en: 'Play Music' },
  'audio.pause': { pt: 'Pausar Música', en: 'Pause Music' },
  'audio.mute': { pt: 'Mutar', en: 'Mute' },
  'audio.unmute': { pt: 'Desmutar', en: 'Unmute' },
  'audio.loading': { pt: 'Carregando...', en: 'Loading...' },
  
  // Days
  'days.weekdays': { pt: 'Segunda - Sexta', en: 'Monday - Friday' },
  'days.saturday': { pt: 'Sábado', en: 'Saturday' },
  'days.sunday': { pt: 'Domingo', en: 'Sunday' },
  'days.closed': { pt: 'Fechado', en: 'Closed' },
  
  // Contact labels
  'contact.label.whatsapp': { pt: 'WhatsApp', en: 'WhatsApp' },
  'contact.label.instagram': { pt: 'Instagram', en: 'Instagram' },
  'contact.label.email': { pt: 'E-mail', en: 'E-mail' },
  
  // Footer
  'footer.rights': { pt: 'Todos os direitos reservados', en: 'All rights reserved' },
  'footer.madeWith': { pt: 'Feito com', en: 'Made with' },
  'footer.by': { pt: 'por', en: 'by' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  showLanguagePopup: boolean;
  setShowLanguagePopup: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('vinnyartz-language') as Language;
    const hasSeenPopup = localStorage.getItem('vinnyartz-language-popup-seen');
    
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    } else if (!hasSeenPopup) {
      // Show popup on first visit
      const timer = setTimeout(() => {
        setShowLanguagePopup(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vinnyartz-language', lang);
    localStorage.setItem('vinnyartz-language-popup-seen', 'true');
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      showLanguagePopup,
      setShowLanguagePopup,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
