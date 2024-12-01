"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
type Props = {};

export default function AccountDeletedCard({}: Props) {
  return (
    <div>
      {" "}
      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 dark:border-gray-700/20 p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Trash2 className="mx-auto h-16 w-16 text-violet-600 dark:text-violet-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-violet-600 dark:text-violet-400">
          Account Deleted
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your account has been permanently deleted. We&apos;re sorry to see you go.
        </p>
        <div className="mb-8">
          <div className="w-full h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Thank you for being a part of our community. If you change your mind,
          you&apos;re always welcome to create a new account.
        </p>
        <Link href="/">
          <Button className="w-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            Return to Homepage
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
