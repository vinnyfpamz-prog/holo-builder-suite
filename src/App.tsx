import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AudioProvider } from "@/contexts/AudioContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguagePopup } from "@/components/ui/language-popup";
import { AudioControls } from "@/components/ui/audio-controls";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AudioProvider>
            {isLoading ? (
              <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
            ) : (
              <>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </BrowserRouter>
                <LanguagePopup />
                <AudioControls />
              </>
            )}
          </AudioProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
