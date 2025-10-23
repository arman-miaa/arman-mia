import React from "react";

interface TitleSectionProps {
  heading: string;
  subHeading: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ heading, subHeading }) => {
  return (
    <div className="text-center mb-10 md:mb-12">
      <h3 className="text-gray-400 text-xs mt-2 sm:text-sm uppercase tracking-widest">
        {subHeading}
      </h3>
      <h2 className="text-3xl mt-1 sm:text-4xl font-bold text-secondary">
        {heading}
      </h2>
    </div>
  );
};

export default TitleSection;
