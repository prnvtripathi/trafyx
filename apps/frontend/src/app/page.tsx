import HeroComponent from "@/components/home/geometric-hero";
import Navbar from "@/components/home/navbar";
import Features from "@/components/home/features";
import Timeline from "@/components/home/timeline";
import data from "@/data/timeline";
import CTA from "@/components/home/cta";
import TextScroll from "@/components/home/text-scroll";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="space-y-20">
        <HeroComponent />
        <Features />
        <Timeline data={data} />
        <TextScroll className="font-display text-center text-4xl font-semibold tracking-tighter md:text-7xl md:leading-[5rem]" />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
