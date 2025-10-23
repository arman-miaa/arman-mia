"use client";

import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { NavbarLinks } from "./NavbarLinks";
import { Sidebar } from "./Sidebar";
import Link from "next/link";

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "#home",
        "#about",
        "#skills",
        "#projects",
        "#blogs",
        "#contact",
      ];
      let currentSection = "#home";

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection !== activeLink) {
        setActiveLink(currentSection);
        window.history.replaceState(null, "", currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeLink]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    window.history.replaceState(null, "", link);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="sticky top-0 left-0 z-50 bg-primary">
      <div className="container mx-auto flex justify-between items-center p-2 px-4 md:py-6">
        {/* Logo */}
        <Link href="/" className="btn btn-ghost cursor-pointer text-xl md:text-2xl text-white hover:text-secondary">
          Portfolio<span className="text-secondary -ml-1 text-2xl"> .</span>
        </Link>

        {/* Hamburger for Mobile */}
        <button
          className="lg:hidden cursor-pointer p-2 text-2xl"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex">
          <ul className="flex space-x-6 md:space-x-8 lg:space-x-10 text-xl lg:text-2xl">
            <NavbarLinks
              activeLink={activeLink}
              handleLinkClick={handleLinkClick}
              user={user}
            />
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeLink={activeLink}
        handleLinkClick={handleLinkClick}
        user={user}
      />
    </div>
  );
};
