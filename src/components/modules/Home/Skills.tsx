"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
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

import MainButton from "@/components/ui/MainButton";
import SkillModal from "../popups/EditSkillModal"; 
import TitleSection from "@/components/shared/TitleSection";
import { showConfirmToast } from "@/components/shared/ConfirmToast";

interface Skill {
  id?: number;
  name: string;
  category: string;
}

const skillIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  "React.js": { icon: <SiReact />, color: "#61DBFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  shadcn: { icon: <SiShadcnui />, color: "#FFFFFF" },
  "Node.js": { icon: <SiNodedotjs />, color: "#68A063" },
  "Express.js": { icon: <SiExpress />, color: "#000000" },
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },
  PostgreSQL: { icon: <SiPostgresql />, color: "#336791" },
  Prisma: { icon: <SiPrisma />, color: "#0C344B" },
  Git: { icon: <SiGit />, color: "#F05032" },
  GitHub: { icon: <SiGithub />, color: "#FFFFFF" },
  "VS Code": { icon: <VscVscode />, color: "#007ACC" },
  Firebase: { icon: <SiFirebase />, color: "#FFCA28" },
  Linux: { icon: <SiLinux />, color: "#FCC624" },
  Vercel: { icon: <SiVercel />, color: "#FFFFFF" },
  Netlify: { icon: <SiNetlify />, color: "#00C7B7" },
};

interface SkillsDashboardProps {
  isDashboard?: boolean;
}

const SkillsDashboard = ({ isDashboard = false }: SkillsDashboardProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalSkill, setModalSkill] = useState<Skill | null | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
          credentials: "include",
        });
        const data = await res.json();
        setSkills(data.skills || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleDelete = async (id: number) => {
    if (!isDashboard) return;
   
    showConfirmToast({
   message: "Are you sure you want to delete this skills?",
    confirmText: "Yes, Delete",
    cancelText: "Cancel",
      onConfirm: async () => { 
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to delete skill");
      setSkills((prev) => prev.filter((s) => s.id !== id));
      toast.success("Skill deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete skill");
    }
      }
})

  };


  

  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  const categoryOrder = ["Frontend", "Backend", "Tools"];

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading skills...</p>;

  return (
    <section className="container mx-auto p-6">
      <TitleSection heading="My Skills" subHeading="What I Do Best" />
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {isDashboard ? "Manage Skills" : "My Skills"}
      </h2>

      {isDashboard && (
        <div className="mb-6 text-right">
          <MainButton text="Create Skill" onClick={() => setModalSkill(null)} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryOrder.map((category) => (
          <div
            key={category}
            className="bg-accent p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-center"
          >
            <div className="text-5xl mb-4">
              {category === "Frontend" && <FaCode />}
              {category === "Backend" && <FaServer />}
              {category === "Tools" && <FaToolbox />}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{category}</h3>
            <ul className="flex flex-wrap justify-center gap-4 w-full">
              {(groupedSkills[category] || []).map((skill) => {
                const mapped = skillIcons[skill.name] || {
                  icon: <FaCode />,
                  color: "#FFFFFF",
                };
                return (
                  <li
                
                    key={
                      skill.id
                        ? `skill-${skill.id}`
                        : `new-${skill.name}-${Date.now()}`
                    }
                    className="bg-primary  p-3 rounded-lg flex flex-col items-center w-28 text-center shadow"
                  >
                    <span
                      className="text-3xl mb-1"
                      style={{ color: mapped.color }}
                    >
                      {mapped.icon}
                    </span>
                    <span className="text-white dark:text-white font-medium">
                      {skill.name}
                    </span>

                    {isDashboard && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setModalSkill(skill)}
                          className="text-blue-600 cursor-pointer hover:text-blue-800 text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id!)}
                          className="text-red-600 cursor-pointer hover:text-red-800 text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {modalSkill !== undefined && (
        <SkillModal
          skill={modalSkill}
          onClose={() => setModalSkill(undefined)}
          onSave={(savedSkill) => {
            setSkills((prev) => {
              const filteredSkills = prev.filter((s) => s.id !== savedSkill.id);

              return [savedSkill, ...filteredSkills];
            });
          }}
        />
      )}
    </section>
  );
};

export default SkillsDashboard;
