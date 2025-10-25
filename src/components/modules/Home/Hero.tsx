"use client";

import Animation from "@/components/shared/Animation";
import Image from "next/image";


export default function Hero() {
  return (
    <section>
      <Animation>
        <section id="home" className="min-h-[calc(100vh-48px)] flex mx-6">
          <div className="relative container mx-auto flex justify-center md:gap-16 lg:gap-20 flex-col-reverse md:flex-row md:items-center">
            {/* Left Content */}
            <div className="flex-1 mt-8 md:mt-0 text-center lg:text-left">
              <h1 className="text-2xl lg:text-5xl font-bold lg:py-2">
                Hi, I&apos;m <span>Arman Mia</span>
              </h1>

              <div className="homeDetails relative">
                <h2 className="mt-2">
                  <span
                    className="text-2xl lg:text-[42px] font-semibold custom-i-4"
                    data-text="Frontend Developer"
                  >
                    Frontend Developer
                  </span>
                  <span
                    className="text-2xl lg:text-[42px] font-semibold custom-i-3"
                    data-text="JavaScript Developer"
                  >
                    JavaScript Developer
                  </span>
                  <span
                    className="text-2xl lg:text-[42px] font-semibold custom-i-2"
                    data-text="React JS Developer"
                  >
                    React JS Developer
                  </span>
                  <span
                    className="text-2xl lg:text-[42px] font-semibold custom-i-1"
                    data-text="Web Developer"
                  >
                    Web Developer
                  </span>
                </h2>
              </div>

              <p className="mt-2 lg:mt-4 text-lg">
                I am a motivated and adaptable individual with a passion for
                learning and delivering high-quality results. With a positive
                attitude and growth mindset, I am eager to take on challenges
                and make a meaningful impact.
              </p>

              <div className="flex w-fit mx-auto md:mx-0 gap-6 lg:gap-8 relative mt-8">
                {/* Resume Button */}
                <a
                  href="/arman-mia-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="relative cursor-pointer inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 bg-[#59B2F4] border-2 border-[#59B2F4] rounded-lg font-bold text-[#191f36] tracking-widest overflow-hidden group">
                    <span className="absolute top-0 left-0 w-0 h-full bg-[#191f36] z-10 transition-all duration-500 group-hover:w-full"></span>
                    <span className="relative z-20 transition-colors duration-500 group-hover:text-[#59B2F4]">
                      Resume
                    </span>
                  </button>
                </a>

                {/* Hire Me Button */}
                <a href="#contact">
                  <button className="relative cursor-pointer inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 bg-transparent border-2 border-[#59B2F4] rounded-lg font-bold text-[#59B2F4] tracking-widest overflow-hidden group">
                    <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] z-10 transition-all duration-500 group-hover:w-full"></span>
                    <span className="relative z-20 transition-colors duration-500 group-hover:text-[#191f36]">
                      Hire Me
                    </span>
                  </button>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="absolute bottom-4 lg:bottom-14 left-1/2 md:left-20 transform -translate-x-1/2 w-[170px] flex justify-between">
              {[
                {
                  href: "https://www.facebook.com/arman2mia",
                  icon: "fa-facebook-f",
                },
                {
                  href: "https://www.linkedin.com/in/arman-miaa",
                  icon: "fa-linkedin-in",
                },
                { href: "https://wa.me/8801736550601", icon: "fa-whatsapp" },
              ].map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center w-10 h-10 rounded-full border-2 border-[#59B2F4] text-[#59B2F4]  text-[18px] overflow-hidden transition-colors duration-500"
                >
                  <i
                    className={`relative z-20 group-hover:text-primary transition-colors duration-500 fa-brands ${icon}`}
                  ></i>
                  <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] transition-all duration-500 group-hover:w-full z-10"></span>
                </a>
              ))}
            </div>

            {/* Right Image with Rotating Border */}
            <div className="md:flex-1 mt-8 md:mt-0">
              <div className="relative w-1/2 md:w-full xl:w-10/12 mx-auto md:mr-0 rounded-full p-2 flex justify-center items-center overflow-hidden">
                {/* Rotating Borders */}
                <div className="absolute w-full h-full rounded-full bg-conic-gradient animate-spin-slow z-0"></div>
                <div className="absolute w-full h-full rounded-full bg-conic-gradient animate-spin-slow z-0 animation-delay-2000"></div>

                {/* Image */}
                <div className="relative  z-20 w-full h-full bg-primary rounded-full pt-2">
                  <Image
                    src="/my-banner.png"
                    alt="Banner Image"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Animation>
    </section>
  );
}
