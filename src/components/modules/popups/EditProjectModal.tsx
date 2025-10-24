"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Project } from "@/types";

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
  onUpdate: (updatedProject: Project) => void;
}

const EditProjectModal = ({
  project,
  onClose,
  onUpdate,
}: EditProjectModalProps) => {
  const [title, setTitle] = useState(project.title);
  const [type, setType] = useState(project.type);
  const [description, setDescription] = useState(project.description);
  const [techStack, setTechStack] = useState(project.techStack.join(", "));
  const [liveUrl, setLiveUrl] = useState(project.liveUrl);
  const [githubUrl, setGithubUrl] = useState(project.githubUrl);
  const [thumbnail, setThumbnail] = useState(project.thumbnail || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/${project.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            type,
            description,
            techStack: techStack.split(",").map((t) => t.trim()),
            liveUrl,
            githubUrl,
            thumbnail,
          }),
        }
      );

if (!res.ok) throw new Error("Failed to update project");

const data = await res.json();
const updatedProject = data.project || data.data || data; 

onUpdate(updatedProject);
toast.success("Project updated successfully");
onClose();

    } catch (err) {
      console.error(err);
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-accent p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Project</h2>

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
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
