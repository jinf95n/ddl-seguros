import { Toaster } from "sonner";
import { Navbar } from "@/components/ddl/Navbar";
import { Hero } from "@/components/ddl/Hero";
import { Benefits } from "@/components/ddl/Benefits";
import { Trust } from "@/components/ddl/Trust";
import { InsuranceTypes } from "@/components/ddl/InsuranceTypes";
import { HowItWorks } from "@/components/ddl/HowItWorks";
import { Cotizador } from "@/components/ddl/LeadForm";
import { WhatsAppCTA } from "@/components/ddl/WhatsAppCTA";
import { Footer } from "@/components/ddl/Footer";
import { StickyWhatsApp } from "@/components/ddl/StickyWhatsApp";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Trust />
        <InsuranceTypes />
        <HowItWorks />
        <Cotizador />
        <WhatsAppCTA />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}

export default App;