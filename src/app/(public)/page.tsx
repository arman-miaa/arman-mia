import { About } from "@/components/modules/Home/About";
import Hero from "@/components/modules/Home/Hero";
import Skills from "@/components/modules/Home/Skills";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Skills/>
    </div>
  );
}
