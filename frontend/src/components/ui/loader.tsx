import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Loader = ({ size }: { size: number }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className={`w-${size} h-${size}`} />
      </motion.div>
    </div>
  );
};

export default Loader;
