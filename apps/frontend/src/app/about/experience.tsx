"use client";
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DeveloperNoteProps {
  developer: {
    name: string
    role: string
    quote: string
    experience: string
  }
  index: number
}

export function DeveloperNote({ developer, index }: DeveloperNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-violet-600 dark:text-violet-400">{developer.name}</CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-400">{developer.role}</p>
        </CardHeader>
        <CardContent>
          <blockquote className="italic text-gray-700 font-bold dark:text-gray-300 mb-4 text-base tracking-wider">"{developer.quote}"</blockquote>
          <p className="text-gray-600 dark:text-gray-300">{developer.experience}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

