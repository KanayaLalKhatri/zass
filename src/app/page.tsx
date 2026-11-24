import { Navbar, Hero, Brands, About, WhyUs, Contact, Footer, WhatsAppFab } from "@/components/Sections";
import Laptops from "@/components/Laptops";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Brands />
        <About />
        <Laptops />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
