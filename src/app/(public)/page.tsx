import { About } from "@/components/modules/Home/About";
import Blogs from "@/components/modules/Home/Blogs";
import Contact from "@/components/modules/Home/Contact";
import Hero from "@/components/modules/Home/Hero";
import Projects from "@/components/modules/Home/Projects";
import Skills from "@/components/modules/Home/Skills";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs/>
      <Contact/>
    </div>
  );
}
