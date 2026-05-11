import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { Portfolio } from "@/components/portfolio"
import { WhyUs } from "@/components/why-us"
import { Financing } from "@/components/financing"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <Portfolio />
      <WhyUs />
      <Financing />
      <ContactForm />
      <Footer />
    </main>
  )
}
