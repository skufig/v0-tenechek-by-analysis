import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Configurator } from "@/components/configurator"
import { Products } from "@/components/products"
import { Installation } from "@/components/installation"
import { Financing } from "@/components/financing"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Configurator />
      <Products />
      <Installation />
      <Financing />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
