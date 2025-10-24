"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Activity, Folder, Code2, Briefcase, Mail, Users } from "lucide-react";
import TitleSection from "@/components/shared/TitleSection";

type OverviewData = {
  blogs: number;
  projects: number;
  skills: number;
  experiences: number;
  contacts: number;
  messages: number;
};

const DashboardHomePage = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/overview`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          toast.error(result.message || "Failed to fetch overview");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  const cards = [
    { title: "Blogs", value: data?.blogs, icon: <Activity /> },
    { title: "Projects", value: data?.projects, icon: <Folder /> },
    { title: "Skills", value: data?.skills, icon: <Code2 /> },
    { title: "Experiences", value: data?.experiences, icon: <Briefcase /> },
    { title: "Contacts", value: data?.contacts, icon: <Users /> },
    { title: "Messages", value: data?.messages, icon: <Mail /> },
  ];

  return (
    <div className="p-6 space-y-6 mx-auto">
      <TitleSection heading=" Dashboard Overview" subHeading="Admin Dashboard" />

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !data && (
        <div className="text-center text-gray-500">No data found 😔</div>
      )}

      {/* Data Grid */}
      {!loading && data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="p-6 bg-accent rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 border  "
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-secondary dark:text-gray-400">
                    {card.title}
                  </span>
                  <span className="text-3xl font-bold text- dark:text-white">
                    {card.value}
                  </span>
                </div>
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHomePage;
