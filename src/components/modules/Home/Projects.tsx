"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { Project } from "@/types";
import notFound from "../../../../public/assets/not-found.png";
import TitleSection from "@/components/shared/TitleSection";
import Animation from "@/components/shared/Animation";
import EditProjectModal from "../popups/EditProjectModal";

interface ProjectsProps {
  isDashboard?: boolean;
}

const Projects = ({ isDashboard = false }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Something went wrong while fetching projects.");
      }
    };
    fetchProjects();
  }, []);

  const handleImageError = (title: string) => {
    setImageError((prev) => ({ ...prev, [title]: true }));
  };

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
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  };

  // Homepage-এ শুধু 3টি দেখানো হবে
  const displayProjects = isDashboard ? projects : projects.slice(0, 3);

  return (
    <Animation>
      <section id="projects" className="py-16 bg-primary">
        <div className="container mx-auto px-6 2xl:px-0">
          <div className="text-center md:mb-12">
            <TitleSection heading="My Projects" subHeading="Current Projects" />
          </div>

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
                  src={
                    imageError[project.title] || !project.thumbnail
                      ? notFound
                      : project.thumbnail
                  }
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                  onError={() => handleImageError(project.title)}
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
                  {project.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary rounded-full text-sm font-semibold text-foreground"
                    >
                      {tech}
                    </span>
                  )) || (
                    <span className="text-gray-500">No tech stack listed</span>
                  )}
                </div>

                {isDashboard && (
                  <div className="flex gap-2 mt-auto justify-center">
                    <button
                      onClick={() => setEditProject(project)}
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
                )}

                {!isDashboard && (
                  <div className="flex mt-auto mx-auto w-full justify-center gap-6 lg:gap-8 relative">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="relative inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 bg-[#59B2F4] border-2 border-[#59B2F4] rounded-lg font-bold text-[#191f36] tracking-widest overflow-hidden group">
                          <span className="absolute top-0 left-0 w-0 h-full bg-[#191f36] z-10 transition-all duration-500 group-hover:w-full"></span>
                          <span className="relative z-20 transition-colors duration-500 group-hover:text-[#59B2F4]">
                            GitHub
                          </span>
                        </button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="relative inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 bg-transparent border-2 border-secondary rounded-lg font-bold text-[#59B2F4] tracking-widest overflow-hidden group">
                          <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] z-10 transition-all duration-500 group-hover:w-full"></span>
                          <span className="relative z-20 transition-colors duration-500 group-hover:text-[#191f36]">
                            Live Demo
                          </span>
                        </button>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Homepage-এ see more button */}
          {!isDashboard && projects.length > 3 && (
            <div className="text-center mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                See More
              </button>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {isDashboard && editProject && (
          <EditProjectModal
            project={editProject}
            onClose={() => setEditProject(null)}
            onUpdate={(updatedProject) =>
              setProjects((prev) =>
                prev.map((p) =>
                  p.id === updatedProject.id ? { ...p, ...updatedProject } : p
                )
              )
            }
          />
        )}
      </section>
    </Animation>
  );
};

export default Projects;
