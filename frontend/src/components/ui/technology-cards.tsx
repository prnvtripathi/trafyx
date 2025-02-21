"use client";

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';
import { Separator } from "./separator";

interface TechnologyCardProps {
  name: string
  description: string
  index: number
  link: string;
}

export function TechnologyCard({ name, description, index, link }: TechnologyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={link} target="_blank" className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg">
        <Card className="h-full bg-transparent backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 group-hover:shadow-lg group-hover:border-violet-300 dark:group-hover:border-violet-700 group-hover:-translate-y-1">
          <CardHeader className="relative">
            <CardTitle className="text-xl font-semibold text-violet-600 dark:text-violet-400 pr-8">{name}</CardTitle>
            <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </CardHeader>
          <Separator className="w-11/12 mx-auto"/>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

