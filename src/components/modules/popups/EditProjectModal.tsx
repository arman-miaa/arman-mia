// src/components/shared/popups/ProjectModal.tsx (Rename from EditProjectModal.tsx)

"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Project } from "@/types";

// Project ইন্টারফেসটিকে আপডেটের জন্য আংশিকভাবে অপশনাল করা হয়েছে
interface ModalProject extends Omit<Project, "id"> {
  id?: number;
}

interface ProjectModalProps {
  project: ModalProject | null; // null হলে Create, Object হলে Edit
  onClose: () => void;
  onSave: (savedProject: Project) => void; // Saved Project-এর id অবশ্যই থাকবে
}

const ProjectModal = ({ project, onClose, onSave }: ProjectModalProps) => {
  // Determine if it's an update operation
  const isUpdating = !!project?.id;

  const [title, setTitle] = useState(project?.title || "");
  const [type, setType] = useState(project?.type || "");
  const [description, setDescription] = useState(project?.description || "");
  const [techStack, setTechStack] = useState(
    project?.techStack?.join(", ") || ""
  );
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || "");
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
  const [thumbnail, setThumbnail] = useState(project?.thumbnail || "");
  const [loading, setLoading] = useState(false);

  // useEffect to reset state when 'project' prop changes (e.g., from Edit to Create)
  useEffect(() => {
    setTitle(project?.title || "");
    setType(project?.type || "");
    setDescription(project?.description || "");
    setTechStack(project?.techStack?.join(", ") || "");
    setLiveUrl(project?.liveUrl || "");
    setGithubUrl(project?.githubUrl || "");
    setThumbnail(project?.thumbnail || "");
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      type,
      description,
      techStack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      liveUrl,
      githubUrl,
      thumbnail,
    };

    try {
      const url = isUpdating
        ? `${process.env.NEXT_PUBLIC_BASE_API}/project/${project!.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API}/project`; // Create API Endpoint

      const method = isUpdating ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw new Error(
          `Failed to ${isUpdating ? "update" : "create"} project`
        );

      const data = await res.json();
      // নিশ্চিত করুন যে API response এ id সহ সম্পূর্ণ Project অবজেক্টটি আছে
      const savedProject: Project = data.project || data.data || data;

      onSave(savedProject);
      toast.success(
        `Project ${isUpdating ? "updated" : "created"} successfully`
      );
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${isUpdating ? "update" : "create"} project`);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = isUpdating ? "Edit Project" : "Create New Project";
  const buttonText = isUpdating ? "Update" : "Create";

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-accent p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">{modalTitle}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
              required
            />
          </div>
          {/* Type */}
          <div>
            <label className="block text-gray-700 mb-1">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>
          {/* Tech Stack */}
          <div>
            <label className="block text-gray-700 mb-1">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>
          {/* GitHub URL */}
          <div>
            <label className="block text-gray-700 mb-1">GitHub URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>
          {/* Live URL */}
          <div>
            <label className="block text-gray-700 mb-1">Live URL</label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>
          {/* Thumbnail */}
          <div>
            <label className="block text-gray-700 mb-1">Thumbnail URL</label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading
                ? isUpdating
                  ? "Updating..."
                  : "Creating..."
                : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProjectModal;
