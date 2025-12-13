import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { CustomCursor } from "@/components/effects/CustomCursor";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <ParticlesBackground />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
