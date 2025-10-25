"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ExperienceModal from "../popups/EditExperienceModel";
import TitleSection from "@/components/shared/TitleSection";
import MainButton from "@/components/ui/MainButton";
import { Experience } from "@/types";

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

  const handleDelete = async (id?: number) => {
    if (!id) return; 
    if (!window.confirm("Are you sure to delete this experience?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`,
        { method: "DELETE", credentials: "include" }
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


  const displayExperiences = isDashboard
    ? experiences
    : showAll 
    ? experiences
    : experiences.slice(0, 3);

 
  const shouldShowToggleButton = !isDashboard && experiences.length > 3;

  return (
    <section className="p-6">
      <TitleSection heading="My Experiences" subHeading="Where I’ve worked" />

      {isDashboard && (
        <div className="mb-6 text-right">
          <MainButton
            text="Create Experience"
            onClick={() => setModalExperience(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
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
                    onClick={() => setModalExperience(exp)}
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
