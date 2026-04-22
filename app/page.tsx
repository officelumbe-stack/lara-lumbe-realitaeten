import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import About from "@/components/About";
import Appointments from "@/components/Appointments";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Properties />
        <About />
        <Appointments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
