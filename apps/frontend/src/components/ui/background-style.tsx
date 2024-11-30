'use client'

import { motion } from 'framer-motion'

export function BackgroundStyle() {
  return (
    <>
      {/* Static Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/80 via-transparent to-blue-100/80 dark:from-violet-900/20 dark:via-transparent dark:to-blue-900/20" />
      </div>

      {/* Glassmorphic Circles */}
      <motion.div 
        className="absolute top-20 pointer-events-none -left-32 size-64 rounded-full bg-violet-300/30 dark:bg-violet-600/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute -bottom-32 pointer-events-none -right-32 size-64 rounded-full bg-blue-300/20 dark:bg-blue-600/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  )
}

