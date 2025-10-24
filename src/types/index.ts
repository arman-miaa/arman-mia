// types/blog.ts
export interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  createdAt: string;
}


export interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  thumbnail?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  certificateImg: string;
  technologies: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}
