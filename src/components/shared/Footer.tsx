"use client";
import Image from "next/image";
import Animation from "./Animation";

const socialLinks = [
  { href: "https://www.facebook.com/arman2mia", icon: "fa-facebook-f" },
  { href: "https://www.linkedin.com/in/arman-miaa", icon: "fa-linkedin-in" },
  { href: "https://github.com/arman-miaa", icon: "fa-github" },
  { href: "https://discord.com/users/1080759260260089857", icon: "fa-discord" },
];

const Footer = () => {
  return (
    <Animation>
      <footer className="w-full pt-12 mt-12 md:mt-20 text-center bg-primary text-foreground">
        {/* Profile */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            src="/my-banner.png"
            alt="Arman Mia"
            width={12} height={12}
            className="w-12 h-12 border-2 rounded-full object-cover"
          />
          <p className="font-bold text-3xl">Arman Mia</p>
          <h2>Web Developer</h2>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          {socialLinks.map(({ href, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex justify-center items-center w-10 h-10 rounded-full border-2 border-secondary text-secondary text-[18px] overflow-hidden transition-colors duration-500"
            >
              <i
                className={`relative z-20 group-hover:text-primary transition-colors duration-500 fa-brands ${icon}`}
              ></i>
              <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] transition-all duration-500 group-hover:w-full z-10"></span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="bg-accent py-4 text-foreground shadow-xl w-full mt-8">
          <p>© {new Date().getFullYear()} Arman Mia - All rights reserved.</p>
        </div>
      </footer>
    </Animation>
  );
};

export default Footer;
