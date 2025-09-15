import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AnimatedBackground } from "@/components/animated-background"
import { VendorShowcase } from "@/components/vendor-showcase"
import { TrendingOffers } from "@/components/trending-offers"
import { ServicesPreviewSection } from "@/components/services-preview-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"
import { RetailerStudioShowcase } from "@/components/retailer-studio-showcase"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <RetailerStudioShowcase />
          <VendorShowcase
            title="Featured Local Vendors"
            subtitle="Support amazing businesses in your community"
            maxVendors={6}
          />
          <ServicesPreviewSection />
          <TrendingOffers maxOffers={6} layout="grid" />
          <FeaturesSection />
          <HowItWorksSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
