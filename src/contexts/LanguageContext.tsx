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
  'about.cta': { pt: 'Vamos Conversar', en: "Let's Talk" },
  
  // Services
  'services.badge': { pt: 'Serviços', en: 'Services' },
  'services.title': { pt: 'O Que Eu Faço', en: 'What I Do' },
  'services.subtitle': { pt: 'Soluções criativas completas para sua marca', en: 'Complete creative solutions for your brand' },
  
  // Portfolio
  'portfolio.badge': { pt: 'Portfólio', en: 'Portfolio' },
  'portfolio.title': { pt: 'Meus Trabalhos', en: 'My Work' },
  'portfolio.subtitle': { pt: 'Confira alguns dos meus projetos recentes', en: 'Check out some of my recent projects' },
  'portfolio.all': { pt: 'Todos', en: 'All' },
  'portfolio.view': { pt: 'Ver Projeto', en: 'View Project' },
  
  // Testimonials
  'testimonials.badge': { pt: 'Depoimentos', en: 'Testimonials' },
  'testimonials.title': { pt: 'O Que Dizem', en: 'What They Say' },
  'testimonials.subtitle': { pt: 'Feedback de clientes satisfeitos', en: 'Feedback from satisfied clients' },
  
  // FAQ
  'faq.badge': { pt: 'FAQ', en: 'FAQ' },
  'faq.title': { pt: 'Perguntas Frequentes', en: 'Frequently Asked Questions' },
  'faq.subtitle': { pt: 'Tire suas dúvidas mais comuns', en: 'Get answers to your most common questions' },
  
  // Contact
  'contact.badge': { pt: 'Contato', en: 'Contact' },
  'contact.title': { pt: 'Vamos Conversar', en: "Let's Talk" },
  'contact.subtitle': { pt: 'Pronto para transformar sua ideia em realidade?', en: 'Ready to transform your idea into reality?' },
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
  
  // Days
  'days.weekdays': { pt: 'Segunda - Sexta', en: 'Monday - Friday' },
  'days.saturday': { pt: 'Sábado', en: 'Saturday' },
  'days.sunday': { pt: 'Domingo', en: 'Sunday' },
  'days.closed': { pt: 'Fechado', en: 'Closed' },
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
