import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { WhyUs } from "@/components/why-us"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <WhyUs />
      <ContactForm />
      <Footer />
    </main>
  )
}
