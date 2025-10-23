"use client";
import Lottie from "lottie-react";
import Animation from "@/components/shared/Animation";
import TitleSection from "@/components/shared/TitleSection";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import about from "../../../../public/assets/about.json";
import about2 from "../../../../public/assets/about2.json";

export const About = () => {
  return (
    <Animation>
      <section id="about" className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <TitleSection heading="About Me" subHeading="My Introduction" />

          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Left Side - Lottie Animation */}
            <div className="">
              <Lottie animationData={about} className="hidden lg:flex" />
              <Lottie animationData={about2} className="lg:hidden" />
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg text-white leading-relaxed">
                <span>Hi there! I&apos;m </span>
                <span className="font-bold text-secondary">Arman Mia</span>, a
                passionate web developer specializing in frontend, backend, and
                full-stack development. I enjoy creating interactive, dynamic
                web applications that offer seamless user experiences.
              </p>

              {/* Skill Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Frontend */}
                <SkillBox
                  icon={
                    <div className="flex items-center space-x-3 animate-slow-spin">
                      <FaReact className="text-cyan-400" />
                      <SiNextdotjs className="text-white" />
                      <SiTailwindcss className="text-sky-400" />
                    </div>
                  }
                  title="Frontend"
                  desc="React, Next.js, Tailwind CSS"
                />

                {/* Backend */}
                <SkillBox
                  icon={
                    <div className="animate-slow-spin">
                      <FaNodeJs className="text-green-400" />
                    </div>
                  }
                  title="Backend"
                  desc="Node.js, Express"
                />

                {/* Full Stack */}
                <SkillBox
                  icon={
                    <div className="flex items-center space-x-3 animate-slow-spin">
                      <SiMongodb className="text-green-500" />
                      <SiPostgresql className="text-sky-500" />
                    </div>
                  }
                  title="Full Stack"
                  desc="MongoDB, PostgreSQL"
                />
              </div>

              {/* Button */}
              <div className="mt-6 sm:mt-8 flex items-center justify-start">
                <a href="#contact">
                  <button className="relative cursor-pointer inline-flex justify-center items-center w-32 sm:w-36 lg:w-40 h-10 sm:h-12 lg:h-14 bg-transparent border-2 border-[#59B2F4] rounded-lg font-bold text-[#59B2F4] tracking-widest overflow-hidden group">
                    <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] z-10 transition-all duration-500 group-hover:w-full"></span>
                    <span className="relative z-20 transition-colors duration-500 group-hover:text-[#191f36]">
                      Let&apos;s Talk
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Animation>
  );
};

const SkillBox = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="w-full bg-accent p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-secondary transition-all duration-500 transform hover:scale-105 flex flex-col items-center justify-center">
    <div className="text-4xl text-secondary mb-3 sm:mb-4">{icon}</div>
    <h3 className="text-lg sm:text-xl font-semibold text-white text-center">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-gray-400 text-center">{desc}</p>
  </div>
);
