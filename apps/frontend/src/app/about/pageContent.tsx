"use client";

import { BackgroundStyle } from "@/components/effects/background-style";
import { TechnologyCard } from "@/components/ui/technology-cards"
import { motion } from "framer-motion"

const technologies = [
    { name: "Next.js", description: "The React framework for production - offering server-side rendering, static site generation, and more.", link: "https://nextjs.org/" },
    { name: "React", description: "A JavaScript library for building user interfaces with reusable components.", link: "https://reactjs.org/" },
    { name: "TypeScript", description: "A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and understandability.", link: "https://www.typescriptlang.org/" },
    { name: "Tailwind CSS", description: "A utility-first CSS framework for rapidly building custom user interfaces.", link: "https://tailwindcss.com/" },
    { name: "Framer Motion", description: "A production-ready motion library for React, used for creating fluid animations and interactions.", link: "https://www.framer.com/motion/" },
    { name: "MongoDB", description: "A document-based, distributed database built for modern application developers and for the cloud era.", link: "https://www.mongodb.com/" },
    { name: "NextAuth.js", description: "A complete authentication solution for Next.js applications.", link: "https://next-auth.js.org/" },
    { name: "Zod", description: "TypeScript-first schema declaration and validation library.", link: "https://zod.dev/" },
    { name: "React Hook Form", description: "Performant, flexible and extensible forms with easy-to-use validation.", link: "https://react-hook-form.com/" },
    { name: "Lucide React", description: "Beautiful & consistent icon toolkit made for React.", link: "https://lucide.dev/" },
    { name: "date-fns", description: "Modern JavaScript date utility library.", link: "https://date-fns.org/" },
    { name: "Radix UI", description: "Unstyled, accessible components for building high‑quality design systems and web apps in React.", link: "https://www.radix-ui.com/" },
    { name: "Mermaid", description: "JavaScript based diagramming and charting tool that renders Markdown-inspired text definitions to create and modify diagrams dynamically.", link: "https://mermaid-js.github.io/mermaid/" },
    { name: "React Syntax Highlighter", description: "Syntax highlighting component for React using the seriously super amazing lowlight and refractor", link: "https://github.com/react-syntax-highlighter/react-syntax-highlighter" },
    { name: "Sonner", description: "An opinionated toast component for React.", link: "https://sonner.dev/" },
    { name: "Jotai", description: "Primitive and flexible state management for React.", link: "https://jotai.org/" },
    { name: "@vercel/analytics", description: "Analytics for Vercel projects.", link: "https://vercel.com/analytics" },
    { name: "Contentlayer", description: "Content made easy for developers.", link: "https://www.contentlayer.dev/" },
    { name: "rehype", description: "HTML processor powered by plugins part of the unified collective.", link: "https://rehype.js.org/" },
    { name: "remark", description: "Markdown processor powered by plugins part of the unified collective.", link: "https://remark.js.org/" },
];

export default async function AboutPageContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      <BackgroundStyle />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Apilex</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Apilex is built on a foundation of cutting-edge technologies, enabling us to deliver a powerful and efficient API testing platform. Here's a look at the key technologies powering our solution:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <TechnologyCard key={tech.name} name={tech.name} description={tech.description} index={index} link={tech.link} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Commitment to Innovation</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            By leveraging these powerful technologies, Apilex delivers a seamless, efficient, and feature-rich API testing experience. Our commitment to using the latest and most robust tools ensures that you have access to a cutting-edge platform that evolves with the rapidly changing landscape of web development.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

