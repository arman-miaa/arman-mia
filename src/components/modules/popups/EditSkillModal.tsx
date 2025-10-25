"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Skill {
  id?: number;
  name: string;
  category: string;
}

interface SkillModalProps {
  skill?: Skill | null; // null → create, object → edit
  onClose: () => void;
  onSave: (savedSkill: Skill) => void;
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose, onSave }) => {
  const [name, setName] = useState(skill?.name || "");
  const [category, setCategory] = useState(skill?.category || "Frontend");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
    setName(skill?.name || "");
    setCategory(skill?.category || "Frontend");
  }, [skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) {
      toast.error("Name and category are required");
      return;
    }

    setLoading(true);
    try {
      const isUpdating = !!skill?.id;
      const url = isUpdating
        ? `${process.env.NEXT_PUBLIC_BASE_API}/skill/${skill.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API}/skill`;

      const res = await fetch(url, {
        method: isUpdating ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, category }),
      });

      if (!res.ok)
        throw new Error(`Failed to ${isUpdating ? "update" : "create"} skill`);

      // API response থেকে ডেটা বের করে আনা (আপনার API response format অনুযায়ী)
      const resData = await res.json();
      // নিশ্চিত করুন যে API response এর মধ্যে `skill` কি-তে সঠিক অবজেক্টটি আছে
      const savedSkill: Skill = resData.skill || resData;

      // onSave কে কল করা, যা parent component-এর স্টেট আপডেট করবে
      onSave(savedSkill);
      toast.success(isUpdating ? "Skill updated!" : "Skill created!");
      onClose(); // Modal বন্ধ করা
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-accent p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl md:text-2xl  text-center text-secondary font-bold mb-4">
          {skill?.id ? "Edit Skill" : "Create Skill"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-foreground  mb-1">
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

          <div>
            <label className="block text-foreground  mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md bg-accent"
              required
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded-md border border-gray-400 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 cursor-pointer rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading
                ? skill?.id
                  ? "Updating..."
                  : "Creating..."
                : skill?.id
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillModal;
