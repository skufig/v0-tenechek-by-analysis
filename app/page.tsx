import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustBlock } from "@/components/trust-block"
import { Products } from "@/components/products"
import { CalculatorSection } from "@/components/calculator"
import { Portfolio } from "@/components/portfolio"

import { Financing } from "@/components/financing"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBlock />
      <Products />
      <CalculatorSection />
      <Portfolio />
      <Financing />
      <ContactForm />
      <Footer />
    </main>
  )
}
