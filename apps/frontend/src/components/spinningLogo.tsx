"use client";
import React from "react";
import { motion } from "framer-motion";
import { GearIcon } from "@radix-ui/react-icons";
type Props = {};

function SpinningLogo({}: Props) {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, ease:"easeInOut", repeat: Infinity, repeatType: "reverse" }}
      className="flex items-center justify-center"
    >
      <div className="bg-primary rounded-full shadow-xl text-white h-full w-full p-1">
        <GearIcon className=" m-0 h-full w-full p-0 rounded-full " />
      </div>
    </motion.div>
  );
}

export default SpinningLogo;
