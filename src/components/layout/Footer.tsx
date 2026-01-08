import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const { t } = useLanguage();
  
  const quickLinks = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#sobre" },
    { name: t('nav.services'), href: "#servicos" },
    { name: t('nav.portfolio'), href: "#portfolio" },
    { name: t('nav.testimonials'), href: "#depoimentos" },
    { name: t('nav.contact'), href: "#contato" },
  ];

  const services = [
    t('services.digital.title'),
    t('services.print.title'),
    t('services.video.title'),
    t('services.web.title'),
    t('services.solutions.title'),
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-secondary/30 border-t border-border overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button onClick={() => scrollToSection("#home")}>
              <img src={logo} alt="Vinny Artz" className="h-12 w-auto mb-6" />
            </button>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t('hero.description')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/vinny.artz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_20px_hsl(24_95%_53%/0.3)]"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5594991022124"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_20px_hsl(24_95%_53%/0.3)]"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display text-lg uppercase tracking-wider text-foreground mb-6">
              {t('nav.home')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display text-lg uppercase tracking-wider text-foreground mb-6">
              {t('nav.services')}
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("#servicos")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display text-lg uppercase tracking-wider text-foreground mb-6">
              {t('nav.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MessageCircle className="w-5 h-5 text-primary" />
                <a
                  href="https://wa.me/5594991022124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  (94) 99102-2124
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Instagram className="w-5 h-5 text-primary" />
                <a
                  href="https://instagram.com/vinny.artz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @vinny.artz
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>vinnyfpamz@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Brasil</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Vinny Artz. {t('footer.rights')}.
            </p>
            <p className="text-muted-foreground text-sm">
              {t('footer.madeWith')}{" "}
              <span className="text-primary animate-glow-text">♥</span> {t('footer.by')}{" "}
              <span className="text-primary font-display">Vinny Artz</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
