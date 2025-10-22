import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Arman | MERN Stack & React | Next Developer | Portfolio",
  description:
    "Portfolio of Arman, a MERN Stack & React developer. Showcasing projects, skills, experience, blogs, and contact information built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "Arman",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Portfolio",
    "Web Development",
    "Frontend Developer",
    "Full Stack Developer",
    "JavaScript Developer",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Md Arman Mia", url: "https://arman-mia.vercel.app" }],
  creator: "Md Arman Mia",
  publisher: "Md Arman Mia",
  openGraph: {
    title: "Arman | MERN Stack & React Developer | Portfolio",
    description:
      "Portfolio of Arman, a MERN Stack & React developer. Showcasing projects, skills, experience, blogs, and contact information.",
    url: "https://arman-mia.vercel.app",
    siteName: "Arman Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Arman Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arman | MERN Stack & React Developer | Portfolio",
    description:
      "Portfolio of Arman, a MERN Stack & React developer. Showcasing projects, skills, experience, blogs, and contact information.",
    images: ["/og-image.png"],
    creator: "@arman_mia",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
