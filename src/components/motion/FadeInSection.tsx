import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type FadeInSectionProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function FadeInSection({
  children,
  className,
  delay = 0,
}: FadeInSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
