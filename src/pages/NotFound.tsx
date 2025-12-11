import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient mb-4">
            404
          </h1>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida. 
            Vamos te levar de volta para um lugar seguro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link to="/">
                <Home className="w-5 h-5" />
                Voltar ao Início
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
