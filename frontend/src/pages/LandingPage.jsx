import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CategoriesSection from "../components/landing/CategoriesSection";
import FAQSection from "../components/landing/FAQSection";
import CTABanner from "../components/landing/CTABanner";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
