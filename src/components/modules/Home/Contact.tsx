"use client";



import { MdAttachEmail } from "react-icons/md";
import {
  FaPhoneVolume,
  FaFacebookMessenger,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

import Animation from "@/components/shared/Animation";
import TitleSection from "@/components/shared/TitleSection";
import ContactForm from "@/components/shared/ContactForm";

const Contact = () => {
  // Left side static contact info
  const contactLinks = [
    {
      icon: <MdAttachEmail className="text-2xl text-secondary" />,
      label: "arman-miaa36@gmail.com",
      href: "mailto:arman-miaa36@gmail.com",
    },
    {
      icon: <FaPhoneVolume className="text-2xl text-secondary" />,
      label: "+8801736-550-601",
      href: "tel:+8801736550601",
    },
    {
      icon: <FaFacebook className="text-2xl text-secondary" />,
      label: "facebook.com/arman2mia",
      href: "https://www.facebook.com/arman2mia",
    },
    {
      icon: <FaFacebookMessenger className="text-2xl text-secondary" />,
      label: "m.me/arman2mia",
      href: "https://m.me/arman2mia",
    },
    {
      icon: <FaLinkedin className="text-2xl text-secondary" />,
      label: "linkedin.com/in/arman-mia-am",
      href: "https://www.linkedin.com/in/arman-miaa",
    },
    {
      icon: <FaGithubSquare className="text-2xl text-secondary" />,
      label: "github.com/arman-miaa",
      href: "https://github.com/arman-miaa",
    },
  ];

  return (
    <Animation>
      <section
        id="contact"
        className="container mx-auto py-16 lg:p-16 bg-primary"
      >
        <TitleSection heading="STAY IN TOUCH" subHeading="Contact Me" />

        <div className="flex flex-col sm:flex-row items-start gap-8 lg:px-32 xl:px-48">
          {/* Left Side - Static Contact Info */}
          <div className="flex-1 w-full p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h1 className="text-4xl font-bold text-secondary mb-4">Arman Mia</h1>
            <p className="text-gray-500 hidden">
              Reach out via email, phone, or social media below:
            </p>

            <div className="flex  flex-col gap-4">
              {contactLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-72 shadow-sm hover:shadow-[#59B2F4] transition-all duration-500 transform hover:scale-105 py-2 px-4 rounded"
                >
                  {link.icon}
                  <span className="text-gray-400">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <ContactForm />
        </div>
      </section>
    </Animation>
  );
};

export default Contact;
