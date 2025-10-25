// Projects.tsx

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Project } from "@/types";
import notFoundImg from "../../../../public/assets/not-found.png";
import TitleSection from "@/components/shared/TitleSection";
import Animation from "@/components/shared/Animation";

import MainButton from "@/components/ui/MainButton";
import ProjectModal from "../popups/EditProjectModal";

interface ProjectsProps {
  isDashboard?: boolean;
}

const Projects = ({ isDashboard = false }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Edit/Create Modal এর জন্য একটি স্টেট ব্যবহার করা হলো
  const [modalProject, setModalProject] = useState<Project | null | undefined>(
    undefined
  ); // undefined -> closed, null -> create, object -> edit

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch {
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this project?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted successfully");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        Loading projects...
      </div>
    );

  const displayProjects = isDashboard
    ? projects
    : showAll
    ? projects
    : projects.slice(0, 6);

  return (
    <Animation>
      <section id="projects" className="py-16 bg-primary">
        <div className="container mx-auto px-6 2xl:px-0">
          <div className="text-center md:mb-12">
            <TitleSection heading="My Projects" subHeading="Current Projects" />
          </div>

          {/* ✅ Create Project Button যোগ করা হলো */}
          {isDashboard && (
            <div className="mb-6 text-right">
              <MainButton
                text="Create Project"
                onClick={() => setModalProject(null)} // null মানে Create মোড
              />
            </div>
          )}

          {displayProjects.length === 0 ? (
            <p className="text-center text-gray-400">No projects found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card p-6 bg-accent overflow-hidden flex flex-col rounded-lg shadow-lg hover:shadow-[#59B2F4] transition-all duration-500 transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <Image
                    src={project.thumbnail || notFoundImg.src}
                    alt={project.title}
                    width={500}
                    height={300}
                    unoptimized
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = notFoundImg.src;
                    }}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-secondary">
                      {project.title}
                    </h3>
                    <span className="text-sm bg-primary py-1 px-2 rounded-2xl text-gray-400">
                      {project.type || "Project"}
                    </span>
                  </div>
                  <p className="text-lg text-gray-400 mb-4">
                    {project.description || "No description available."}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.length ? (
                      project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-primary rounded-full text-sm font-semibold text-foreground"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        No tech stack listed
                      </span>
                    )}
                  </div>
                  {isDashboard ? (
                    <div className="flex gap-2 mt-auto justify-center">
                      <button
                        // ✅ Edit Modal খোলার জন্য
                        onClick={() => setModalProject(project)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="flex mt-auto mx-auto w-full justify-center gap-6 lg:gap-8 relative">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* GitHub button code... */}
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* Live Demo button code... */}
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          {/* See More / Hide More */}
          {!isDashboard && projects.length > 6 && (
            <div className="text-center mt-8">
              <MainButton
                text={showAll ? "Hide More" : "See More"}
                onClick={() => setShowAll(!showAll)}
              />
            </div>
          )}
        </div>

        {/* ✅ Project Modal রেন্ডার করা হলো */}
        {modalProject !== undefined && (
          <ProjectModal
            project={modalProject}
            onClose={() => setModalProject(undefined)}
            onSave={(savedProject) => {
              setProjects((prev) => {
                // 1. পুরোনো ভার্সনটি (যদি থাকে) ID দিয়ে ফিল্টার করে বাদ দিন।
                const filteredProjects = prev.filter(
                  (p) => p.id !== savedProject.id
                );
                // 2. নতুন বা আপডেট হওয়া প্রজেক্টটি শুরুতে যোগ করুন।
                return [savedProject, ...filteredProjects];
              });
            }}
          />
        )}
      </section>
    </Animation>
  );
};
export default Projects;
