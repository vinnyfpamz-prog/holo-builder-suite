import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Serviços", path: "/servicos" },
  { name: "Portfólio", path: "/portfolio" },
  { name: "Depoimentos", path: "/depoimentos" },
  { name: "Blog", path: "/blog" },
  { name: "Contato", path: "/contato" },
];

const services = [
  "Design Digital",
  "Impressos",
  "Vídeo e Motion",
  "Web e Landing Pages",
  "Soluções Digitais",
];

export const Footer = () => {
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
            <Link to="/">
              <img src={logo} alt="Vinny Artz" className="h-12 w-auto mb-6" />
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Transformando ideias em experiências visuais impactantes. Design gráfico, 
              vídeos, web e muito mais.
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
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline"
                  >
                    {link.name}
                  </Link>
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
              Serviços
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/servicos"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline"
                  >
                    {service}
                  </Link>
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
              Contato
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
                <span>contato@vinnyartz.com</span>
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
              © {new Date().getFullYear()} Vinny Artz. Todos os direitos reservados.
            </p>
            <p className="text-muted-foreground text-sm">
              Desenvolvido com{" "}
              <span className="text-primary animate-glow-text">♥</span> por{" "}
              <span className="text-primary font-display">Vinny Artz</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
