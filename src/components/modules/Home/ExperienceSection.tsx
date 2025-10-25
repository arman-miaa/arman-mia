"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import EditExperienceModal from "../popups/EditExperienceModel";
import TitleSection from "@/components/shared/TitleSection";
import MainButton from "@/components/ui/MainButton";

interface Experience {
  id: number;
  title: string;
  company: string;
  position: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  certificateImg: string;
  technologies: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface ExperienceSectionProps {
  isDashboard?: boolean;
}

const ExperienceSection = ({ isDashboard = false }: ExperienceSectionProps) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editExperience, setEditExperience] = useState<Experience | null>(null);
  const [showAll, setShowAll] = useState(false); // 🟢 নতুন state
  const router = useRouter();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/experience`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setExperiences(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch experiences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this experience?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to delete experience");
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
      toast.success("Experience deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete experience");
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading experiences...</p>
    );

  // 🟢 showAll true হলে সব দেখাবে, false হলে প্রথম ৩টা
  const displayExperiences = isDashboard
    ? experiences
    : showAll
    ? experiences
    : experiences.slice(0, 3);

  return (
    <section className="p-6">
      <TitleSection heading="My Experiences" subHeading="Where I’ve worked" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayExperiences?.map((exp) => {
          const safeStartDate = exp.startDate
            ? new Date(exp.startDate).toLocaleDateString()
            : "";
          const safeEndDate = exp.endDate
            ? new Date(exp.endDate).toLocaleDateString()
            : "";

          return (
            <div
              key={exp.id}
              className="bg-accent p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <h3 className="font-semibold text-lg">{exp.title}</h3>
              <p className="text-gray-600">
                {exp.company} - {exp.position}
              </p>
              <p className="text-gray-500 text-sm">
                {safeStartDate} - {exp.isCurrent ? "Present" : safeEndDate}
              </p>
              <p className="text-gray-700">{exp.description}</p>
              <p className="text-gray-600 text-sm">Location: {exp.location}</p>
              <p className="text-gray-600 text-sm">
                Technologies: {exp.technologies?.join(", ") || "N/A"}
              </p>

              {isDashboard && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditExperience(exp)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🟢 Toggle Button */}
      {!isDashboard && experiences.length > 3 && (
        <div className="text-center mt-6">
          <MainButton
            text={showAll ? "Hide More" : "See More"}
            onClick={() => setShowAll(!showAll)}
          />
        </div>
      )}

      {editExperience && (
        <EditExperienceModal
          experience={editExperience}
          onClose={() => setEditExperience(null)}
          onUpdate={(updatedExp) =>
            setExperiences((prev) =>
              prev.map((e) => (e.id === updatedExp.id ? updatedExp : e))
            )
          }
        />
      )}
    </section>
  );
};

export default ExperienceSection;
