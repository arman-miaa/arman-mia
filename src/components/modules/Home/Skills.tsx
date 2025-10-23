"use client";

import { useState, useEffect } from "react";
import Animation from "@/components/shared/Animation";
import TitleSection from "@/components/shared/TitleSection";
import { FaCode, FaServer, FaToolbox } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiPrisma,
  SiShadcnui,
  SiGit,
  SiGithub,
  SiFirebase,
  SiLinux,
  SiVercel,
  SiNetlify,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";


interface Skill {
  id: number;
  category: string;
  name: string;
}

const skillIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  // Frontend
  "React.js": { icon: <SiReact />, color: "#61DBFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  shadcn: { icon: <SiShadcnui />, color: "#FFFFFF" },

  // Backend
  "Node.js": { icon: <SiNodedotjs />, color: "#68A063" },
  "Express.js": { icon: <SiExpress />, color: "#000000" },
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },
  PostgreSQL: { icon: <SiPostgresql />, color: "#336791" },
  Prisma: { icon: <SiPrisma />, color: "#0C344B" },

  // Tools
  Git: { icon: <SiGit />, color: "#F05032" },
  GitHub: { icon: <SiGithub />, color: "#FFFFFF" },
  "VS Code": { icon: <VscVscode />, color: "#007ACC" },
  Firebase: { icon: <SiFirebase />, color: "#FFCA28" },
  Linux: { icon: <SiLinux />, color: "#FCC624" },
  Vercel: { icon: <SiVercel />, color: "#FFFFFF" },
  Netlify: { icon: <SiNetlify />, color: "#00C7B7" },
};

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`);
        const data = await res.json();
        setSkills(data.skills || []);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const groupedSkills = (skills || []).reduce<Record<string, Skill[]>>(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {}
  );

  const categoryOrder = ["Frontend", "Backend", "Tools"]; // ensure fixed order

  return (
    <Animation>
      <section id="skills" className="py-16 pb-24 bg-primary">
        <div className="container mx-auto px-6 2xl:px-0">
          <TitleSection heading="My Skills" subHeading="What I Do Best" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {categoryOrder.map((category) => (
              <div
                key={category}
                className="bg-accent p-8 rounded-2xl shadow-lg hover:shadow-[#59B2F4] transition-all duration-500 transform hover:scale-105 flex flex-col items-center"
              >
                {/* Category Icon */}
                <div className="text-6xl text-[#59B2F4] mb-4">
                  {category === "Frontend" && <FaCode />}
                  {category === "Backend" && <FaServer />}
                  {category === "Tools" && <FaToolbox />}
                </div>

                <h3 className="text-3xl font-bold text-white mb-6">
                  {category}
                </h3>

                <ul className="flex flex-wrap justify-center gap-6">
                  {(groupedSkills[category] || []).map((skill) => {
                    const mapped = skillIcons[skill.name] || {
                      icon: <FaCode />,
                      color: "#FFFFFF",
                    };
                    return (
                      <li
                        key={skill.id}
                        className="flex flex-col items-center justify-center gap-2 text-center"
                      >
                        <span
                          className="text-4xl"
                          style={{ color: mapped.color }}
                        >
                          {mapped.icon}
                        </span>
                        <span className="text-white font-medium">
                          {skill.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Animation>
  );
};

export default Skills;
