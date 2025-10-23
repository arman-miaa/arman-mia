import { BlogCard } from "@/components/modules/Blogs/BlogCard";
import TitleSection from "@/components/shared/TitleSection";

const AllBlogsPage = () => {
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <TitleSection heading="All Blogs" subHeading="Explore All Blogs" />
      <BlogCard />
    </div>
  );
};

export default AllBlogsPage;
