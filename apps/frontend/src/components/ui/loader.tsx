"use client"

import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

const Loader = ({ size = 24 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 size={size} />
      </motion.div>
    </div>
  );
};

export default Loader;
