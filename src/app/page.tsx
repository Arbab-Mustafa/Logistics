import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import BenefitsSection from "@/components/BenefitsSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
 
import CoverageSection from "@/components/CoverageSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProductSlider from "@/components/ui/products-slider";
import Sponsors from "@/components/ui/sponsors";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <HeroSection />
      <ProductSlider />
      <BenefitsSection />
      <Sponsors />
      <AboutSection />
      <ServicesSection />
      <PackagesSection />
      <CoverageSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
