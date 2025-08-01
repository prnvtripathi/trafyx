import AboutUs from "@/components/home/about-us";
import ContactUs from "@/components/home/contact-us";
import Footer from "@/components/home/footer";
import HeroComponent from "@/components/home/geometric-hero";
import Navbar from "@/components/home/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroComponent />
      <AboutUs />
      <ContactUs />
      <Footer />
    </>
  );
}
