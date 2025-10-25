// src/popups/EditExperienceModel.tsx (বা আপনার ফাইলের নাম)

"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
// ✅ ধরে নেওয়া হচ্ছে Experience ইন্টারফেসটি "@/types" থেকে আসছে
import { Experience } from "@/types";

interface ExperienceModalProps {
  experience: Experience | null; // null হলে Create, Object হলে Edit
  onClose: () => void;
  onSave: (savedExperience: Experience) => void;
}

const ExperienceModal = ({
  experience,
  onClose,
  onSave,
}: ExperienceModalProps) => {
  // ✅ isUpdating ভ্যারিয়েবলটি ফাংশন স্কোপে ডিফাইন করা হলো
  const isUpdating = !!experience?.id;

  const [title, setTitle] = useState(experience?.title || "");
  const [company, setCompany] = useState(experience?.company || "");
  const [position, setPosition] = useState(experience?.position || "");
  const [startDate, setStartDate] = useState(
    experience?.startDate ? experience.startDate.slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    experience?.endDate ? experience.endDate.slice(0, 10) : ""
  );
  const [isCurrent, setIsCurrent] = useState(experience?.isCurrent || false);
  const [description, setDescription] = useState(experience?.description || "");
  const [technologies, setTechnologies] = useState(
    experience?.technologies?.join(", ") || ""
  );
  const [location, setLocation] = useState(experience?.location || "");
  const [loading, setLoading] = useState(false);

  // Modal context পরিবর্তন হলে স্টেট রিসেট করা
  useEffect(() => {
    setTitle(experience?.title || "");
    setCompany(experience?.company || "");
    setPosition(experience?.position || "");
    setStartDate(
      experience?.startDate ? experience.startDate.slice(0, 10) : ""
    );
    setEndDate(experience?.endDate ? experience.endDate.slice(0, 10) : "");
    setIsCurrent(experience?.isCurrent || false);
    setDescription(experience?.description || "");
    setTechnologies(experience?.technologies?.join(", ") || "");
    setLocation(experience?.location || "");
  }, [experience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      company,
      position,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: isCurrent
        ? null
        : endDate
        ? new Date(endDate).toISOString()
        : null,
      isCurrent,
      description,
      // কমা সেপারেটেড স্ট্রিংকে অ্যারেতে পরিবর্তন করা
      technologies: technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      location,
    };

    try {
      const url = isUpdating
        ? `${process.env.NEXT_PUBLIC_BASE_API}/experience/${experience!.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API}/experience`;

      const res = await fetch(url, {
        method: isUpdating ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw new Error(
          `Failed to ${isUpdating ? "update" : "create"} experience`
        );

      const data = await res.json();
      // API রেসপন্স থেকে সঠিক অবজেক্ট বের করা
      const savedExp: Experience = data.data || data.experience || data;

      onSave(savedExp);
      toast.success(
        `Experience ${isUpdating ? "updated" : "created"} successfully`
      );
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${isUpdating ? "update" : "create"} experience`);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = isUpdating ? "Edit Experience" : "Create New Experience";
  const buttonText = isUpdating ? "Update" : "Create";

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-accent p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">{modalTitle}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded-md border-gray-300"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-md border-gray-300"
                disabled={isCurrent}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-gray-700">Current Job</span>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
          </div>

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

export default ExperienceModal;
