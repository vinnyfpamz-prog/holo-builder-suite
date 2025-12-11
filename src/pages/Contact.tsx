import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NeonCard } from "@/components/ui/neon-card";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "(94) 99102-2124",
    link: "https://wa.me/5594991022124",
    color: "text-[#25D366]",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@vinny.artz",
    link: "https://instagram.com/vinny.artz",
    color: "text-[#E4405F]",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@vinnyartz.com",
    link: "mailto:contato@vinnyartz.com",
    color: "text-primary",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Brasil",
    link: null,
    color: "text-primary",
  },
];

const businessHours = [
  { day: "Segunda - Sexta", hours: "08:00 - 18:00" },
  { day: "Sábado", hours: "09:00 - 14:00" },
  { day: "Domingo", hours: "Fechado" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Mensagem enviada!",
      description: "Entrarei em contato em breve. Obrigado pelo interesse!",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

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
              Contato
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Vamos Criar Algo{" "}
              <span className="text-gradient">Incrível</span> Juntos?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estou pronto para transformar suas ideias em realidade. 
              Entre em contato e vamos conversar sobre seu projeto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl font-bold mb-6">
                  Informações de Contato
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
                        >
                          <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform`}>
                            <info.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">{info.label}</div>
                            <div className="font-medium">{info.value}</div>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                          <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${info.color}`}>
                            <info.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">{info.label}</div>
                            <div className="font-medium">{info.value}</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Horário de Atendimento
                </h3>
                <div className="space-y-2">
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between text-sm py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
              >
                <h3 className="font-display text-lg font-semibold mb-2">
                  Resposta Rápida
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Para atendimento imediato, entre em contato pelo WhatsApp!
                </p>
                <Button variant="hero" className="w-full" asChild>
                  <a
                    href="https://wa.me/5594991022124"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <NeonCard>
                <h2 className="font-display text-2xl font-bold mb-6">
                  Envie uma Mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Seu Nome *
                      </label>
                      <Input
                        type="text"
                        placeholder="Digite seu nome"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="bg-secondary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Seu E-mail *
                      </label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="bg-secondary/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        WhatsApp
                      </label>
                      <Input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="bg-secondary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Assunto *
                      </label>
                      <Input
                        type="text"
                        placeholder="Sobre o que deseja falar?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                        className="bg-secondary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sua Mensagem *
                    </label>
                    <Textarea
                      placeholder="Descreva seu projeto ou dúvida..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={6}
                      className="bg-secondary/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
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
    </div>
  );
};

export default Contact;
