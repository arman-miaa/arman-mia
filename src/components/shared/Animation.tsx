"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
}

export default function Animation({ children }: AnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
