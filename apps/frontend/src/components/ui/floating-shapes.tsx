'use client'
import { motion } from 'framer-motion'

const shapes = [
  { color: 'bg-violet-500', size: 'w-12 h-12' },
  { color: 'bg-blue-500', size: 'w-8 h-8' },
  { color: 'bg-indigo-500', size: 'w-10 h-10' },
  { color: 'bg-purple-500', size: 'w-6 h-6' },
]

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.color} ${shape.size} rounded-full opacity-20`}
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth:0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight:0,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
