"use client";

import { useState, useEffect } from "react";
import {
  FaBars,
  FaFileContract,
  FaHome,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { SiHyperskill } from "react-icons/si";


export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

 useEffect(() => {
   const handleScroll = () => {
     const sections = ["#home", "#about", "#skills", "#projects", "#contact"];
     let currentSection = "#home"; // ✅ let এখানে

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

  const links = (
    <>
      <li>
        <a
          href="#home"
          onClick={() => handleLinkClick("#home")}
          className={
            activeLink === "#home"
              ? "text-secondary font-bold"
              : "text-white hover:text-secondary"
          }
        >
          <span className="flex gap-2 items-center text-xl">
            <FaHome className="lg:hidden" /> Home
          </span>
        </a>
      </li>
      <li>
        <a
          href="#about"
          onClick={() => handleLinkClick("#about")}
          className={
            activeLink === "#about"
              ? "text-secondary font-bold"
              : "text-white hover:text-secondary"
          }
        >
          <span className="flex gap-2 items-center text-xl">
            <FaInfoCircle className="lg:hidden" /> About
          </span>
        </a>
      </li>
      <li>
        <a
          href="#skills"
          onClick={() => handleLinkClick("#skills")}
          className={
            activeLink === "#skills"
              ? "text-secondary font-bold"
              : "text-white hover:text-secondary"
          }
        >
          <span className="flex gap-2 items-center text-xl">
            <SiHyperskill className="lg:hidden" /> Skills
          </span>
        </a>
      </li>
      <li>
        <a
          href="#projects"
          onClick={() => handleLinkClick("#projects")}
          className={
            activeLink === "#projects"
              ? "text-secondary font-bold"
              : "text-white hover:text-secondary"
          }
        >
          <span className="flex gap-2 items-center text-xl">
            <GoProjectSymlink className="lg:hidden" /> Projects
          </span>
        </a>
      </li>
      <li>
        <a
          href="#contact"
          onClick={() => handleLinkClick("#contact")}
          className={
            activeLink === "#contact"
              ? "text-secondary font-bold"
              : "text-white hover:text-secondary"
          }
        >
          <span className="flex gap-2 items-center text-xl">
            <FaFileContract className="lg:hidden" /> Contact
          </span>
        </a>
      </li>
      <li>
        <a
          href="#dashboard"
          onClick={() => handleLinkClick("#dashboard")}
          className={
            activeLink === "#dashboard"
              ? "text-secondary font-bold"
              : "text-white hover:text-secondary"
          }
        >
          <span className="flex gap-2 items-center text-xl">
            <MdOutlineSpaceDashboard className="lg:hidden" /> Dashboard
          </span>
        </a>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 left-0 z-50 bg-primary">
      <div className="container mx-auto flex justify-between items-center p-2 px-4 md:py-6">
        {/* Logo */}
        <a className="btn btn-ghost cursor-pointer text-xl md:text-2xl text-white hover:text-secondary">
          Portfolio<span className="text-primary -ml-1 text-2xl">.</span>
        </a>

        {/* Hamburger */}
        <button
          className="lg:hidden cursor-pointer p-2 text-2xl"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex">
          <ul className="flex space-x-6 md:space-x-8 lg:space-x-10 text-xl lg:text-2xl">
            {links}
          </ul>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed top-0 left-0 h-full lg:hidden w-60 bg-primary text-white z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="p-4 flex items-center justify-between bg-[#2C3448]">
            <a className="text-xl cursor-pointer md:text-2xl text-white hover:text-secondary">
              Portfolio<span className="text-secondary -ml-1 text-2xl">.</span>
            </a>
            <button
              onClick={toggleSidebar}
              className="bg-primary text-2xl cursor-pointer rounded-full"
            >
              <FaTimes />
            </button>
          </div>
          <ul className="menu p-4">{links}</ul>
        </div>
      </div>
    </div>
  );
};


