"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ExperienceModal from "../popups/EditExperienceModel";
import TitleSection from "@/components/shared/TitleSection";
import MainButton from "@/components/ui/MainButton";
import { Experience } from "@/types";
import { showConfirmToast } from "@/components/shared/ConfirmToast";

interface ExperienceSectionProps {
  isDashboard?: boolean;
}

const ExperienceSection = ({ isDashboard = false }: ExperienceSectionProps) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalExperience, setModalExperience] = useState<
    Experience | null | undefined
  >(undefined);

  const [showAll, setShowAll] = useState(false);

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
        setExperiences(data.data || data.experiences || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch experiences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

const handleDelete = (id?: number) => {
  if (!id) return;

  showConfirmToast({
    message: "Are you sure you want to delete this experience?",
    confirmText: "Yes, Delete",
    cancelText: "Cancel",
    onConfirm: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || "Failed to delete experience");
        }

        setExperiences((prev) => prev.filter((exp) => exp.id !== id));
        toast.success("Experience deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error( "Failed to delete experience");
      }
    },
  });
};


  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading experiences...</p>
    );

  const displayExperiences = isDashboard
    ? experiences
    : showAll
    ? experiences
    : experiences.slice(0, 3);

  const shouldShowToggleButton = !isDashboard && experiences.length > 3;

  return (
    <section className=" container mx-auto p-6 py-12 md:py-16">
      <TitleSection heading="My Experiences" subHeading="Where I’ve worked" />

      {isDashboard && (
        <div className="mb-6 text-right">
          <MainButton
            text="Create Experience"
            onClick={() => setModalExperience(null)}
          />
        </div>
      )}

      <div
        className={`grid gap-6 ${
          displayExperiences.length === 1
            ? "grid-cols-1 justify-items-center"
            : displayExperiences.length === 2
            ? "sm:grid-cols-2 justify-items-center"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {displayExperiences.map((exp) => {
          const safeStartDate = exp.startDate
            ? new Date(exp.startDate).toLocaleDateString()
            : "";
          const safeEndDate = exp.endDate
            ? new Date(exp.endDate).toLocaleDateString()
            : "";

          const key = exp.id ?? exp.title;

          return (
            <div
              key={key}
              className="bg-accent p-6 rounded-2xl shadow-lg hover:shadow-2xl 
             transition-all duration-300 transform hover:-translate-y-1 border border-white/10 w-full max-w-md"
            >
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-xl text-white tracking-wide">
                  {exp.title}
                </h3>

                <p className="text-gray-300 text-sm font-medium">
                  {exp.company}{" "}
                  <span className="text-gray-400">• {exp.position}</span>
                </p>

                <p className="text-gray-400 text-xs">
                  {safeStartDate} — {exp.isCurrent ? "Present" : safeEndDate}
                </p>

                <div className="h-px bg-white/10 my-2" />

                <p className="text-gray-200 leading-relaxed text-sm">
                  {exp.description}
                </p>

                <div className="flex flex-wrap justify-between items-center mt-3 text-xs text-gray-400">
                  <span>📍 {exp.location}</span>
                  <span>🧰 {exp.technologies?.join(", ") || "N/A"}</span>
                </div>

                {isDashboard && (
                  <div className="flex gap-3 mt-4 border-t border-white/10 pt-3">
                    <button
                      onClick={() => setModalExperience(exp)}
                      className="px-3 py-1 cursor-pointer text-sm font-semibold text-blue-400 border border-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="px-3 py-1 cursor-pointer text-sm font-semibold text-red-400 border border-red-400 rounded-md hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {shouldShowToggleButton && (
        <div className="text-center mt-8">
          <MainButton
            text={showAll ? "Hide Experience" : "View All Experience"}
            onClick={() => setShowAll(!showAll)}
          />
        </div>
      )}

      {modalExperience !== undefined && (
        <ExperienceModal
          experience={modalExperience}
          onClose={() => setModalExperience(undefined)}
          onSave={(savedExp) => {
            setExperiences((prev) => {
              if (savedExp.id) {
                const filteredExp = prev.filter((e) => e.id !== savedExp.id);
                return [savedExp, ...filteredExp];
              } else {
                const tempId = Date.now() + Math.random();
                return [{ ...savedExp, id: tempId }, ...prev];
              }
            });
          }}
        />
      )}
    </section>
  );
};

export default ExperienceSection;
