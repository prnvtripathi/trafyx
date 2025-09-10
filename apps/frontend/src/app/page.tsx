import HeroComponent from "@/components/home/geometric-hero";
import Navbar from "@/components/home/navbar";
import Features from "@/components/home/features";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroComponent />
      <Features />
    </>
  );
}
