"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface Skill {
  id: number;
  category: string;
  name: string;
}

interface EditSkillModalProps {
  skill: Skill;
  onClose: () => void;
  onUpdate: (updatedSkill: Skill) => void;
}

const EditSkillModal = ({ skill, onClose, onUpdate }: EditSkillModalProps) => {
  const [name, setName] = useState(skill.name);
  const [category, setCategory] = useState(skill.category);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) {
      toast.error("Name and category are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/skill/${skill.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, category }),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to update skill");

      const updatedSkill = await res.json();
      onUpdate(updatedSkill);
      toast.success("Skill updated successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30  flex justify-center items-center z-50">
      <div className="bg-accent  p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Edit Skill
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Category */}
          <div className="">
            <label className="block text-foreground  mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md bg-accent "
              required
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-400 "
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

export default EditSkillModal;
