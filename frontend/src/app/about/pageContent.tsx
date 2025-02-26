"use client";

import { BackgroundStyle } from "../../components/effects/background-style";
import { TechnologyCard } from "../../components/ui/technology-cards";
import { motion } from "framer-motion";
import { DeveloperNote } from "./experience";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";

const technologies = [
  {
    name: "Next.js",
    description:
      "The React framework for production - offering server-side rendering, static site generation, and more.",
    link: "https://nextjs.org/",
  },
  {
    name: "Kestra",
    description:
      "Kestra is an open-source orchestration and scheduling platform.",
    link: "https://kestra.io/",
  },
  {
    name: "GoLang",
    description:
      "Go is an open-source programming language that makes it easy to build simple, reliable, and efficient software.",
    link: "https://golang.org/",
  },
  {
    name: "Vercel",
    description:
      "Vercel is a platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.",
    link: "https://vercel.com/",
  },
  {
    name: "Docker",
    description:
      "Docker is an open platform for developing, shipping, and running applications.",
    link: "https://www.docker.com/",
  },
  {
    name: "React",
    description:
      "A JavaScript library for building user interfaces with reusable components.",
    link: "https://reactjs.org/",
  },
  {
    name: "TypeScript",
    description:
      "A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and understandability.",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework for rapidly building custom user interfaces.",
    link: "https://tailwindcss.com/",
  },
  {
    name: "Framer Motion",
    description:
      "A production-ready motion library for React, used for creating fluid animations and interactions.",
    link: "https://www.framer.com/motion/",
  },
  {
    name: "MongoDB",
    description:
      "A document-based, distributed database built for modern application developers and for the cloud era.",
    link: "https://www.mongodb.com/",
  },
  {
    name: "NextAuth.js",
    description: "A complete authentication solution for Next.js applications.",
    link: "https://next-auth.js.org/",
  },
  {
    name: "Zod",
    description: "TypeScript-first schema declaration and validation library.",
    link: "https://zod.dev/",
  },
  {
    name: "React Hook Form",
    description:
      "Performant, flexible and extensible forms with easy-to-use validation.",
    link: "https://react-hook-form.com/",
  },
  {
    name: "Lucide React",
    description: "Beautiful & consistent icon toolkit made for React.",
    link: "https://lucide.dev/",
  },
  {
    name: "date-fns",
    description: "Modern JavaScript date utility library.",
    link: "https://date-fns.org/",
  },
  {
    name: "Radix UI",
    description:
      "Unstyled, accessible components for building high‑quality design systems and web apps in React.",
    link: "https://www.radix-ui.com/",
  },
  {
    name: "Mermaid",
    description:
      "JavaScript based diagramming and charting tool that renders Markdown-inspired text definitions to create and modify diagrams dynamically.",
    link: "https://mermaid-js.github.io/mermaid/",
  },
  {
    name: "React Syntax Highlighter",
    description:
      "Syntax highlighting component for React using the seriously super amazing lowlight and refractor",
    link: "https://github.com/react-syntax-highlighter/react-syntax-highlighter",
  },
  {
    name: "Sonner",
    description: "An opinionated toast component for React.",
    link: "https://sonner.dev/",
  },
  {
    name: "Jotai",
    description: "Primitive and flexible state management for React.",
    link: "https://jotai.org/",
  },
  {
    name: "@vercel/analytics",
    description: "Analytics for Vercel projects.",
    link: "https://vercel.com/analytics",
  },
  {
    name: "Contentlayer",
    description: "Content made easy for developers.",
    link: "https://www.contentlayer.dev/",
  },
  {
    name: "rehype",
    description:
      "HTML processor powered by plugins part of the unified collective.",
    link: "https://rehype.js.org/",
  },
  {
    name: "remark",
    description:
      "Markdown processor powered by plugins part of the unified collective.",
    link: "https://remark.js.org/",
  },
  {
    name: "bcrypt",
    description:
      "A library to help you hash passwords.",
    link: "https://github.com/kelektiv/node.bcrypt.js",
  },
  {
    name: "@tanstack/table-core",
    description:
      "Headless UI for building powerful tables & datagrids.",
    link: "https://tanstack.com/table/v8",
  },
  {
    name: "tsparticles",
    description:
      "A lightweight library for creating particles animations.",
    link: "https://particles.js.org/",
  }
];

const developers = [
  {
    name: "Ishaan",
    role: "Frontend Specialist Juggling with Full Stack",
    quote:
      "Integrating Kestra with our API testing workflow was a game-changer. It allowed us to automate complex testing scenarios with ease.",
    experience:
      "Working on Trafix during Codeक्षेत्र was an incredible experience. Kestra's flexibility allowed us to create dynamic, event-driven workflows that significantly improved our API testing process. The integration between Kestra and our existing tech stack was seamless, enabling us to build a robust, scalable solution in a short amount of time.",
  },
  {
    name: "Pranav Tripathi",
    role: "Backend Specialist juggling with Full Stack",
    quote:
      "Kestra's ability to handle complex data pipelines made our backend processes much more efficient and reliable.",
    experience:
      "Developing the backend for Trafix was a thrilling challenge. Leveraging Kestra's powerful orchestration capabilities, we were able to design and implement sophisticated testing workflows that could adapt to various API structures. The platform's support for multiple programming languages also allowed us to integrate seamlessly with our existing Node.js scripts.",
  },
  // {
  //   name: "Anshum Shukla",
  //   role: "Documentation Specialist",
  //   quote:
  //     "Creating comprehensive and clear documentation was crucial for our project's success, and Kestra's intuitive design made it straightforward.",
  //   experience:
  //     "As the Documentation Specialist for Trafix, my focus was on ensuring that our documentation was thorough and user-friendly. Kestra's well-documented features and straightforward configuration options made it easy to convey complex concepts clearly. The ability to automate parts of the documentation process also saved us valuable time, allowing us to focus on delivering high-quality content.",
  // },
];

export default function AboutPageContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      <BackgroundStyle />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-14">
        {/* Codeक्षेत्र Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded text-white py-4 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-1">
            Made during Codeक्षेत्र 2.0
          </h2>
          <Badge  className="text-lg">
           By team Serendipity
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Trafix</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Trafix is built on a foundation of cutting-edge technologies,
            enabling us to deliver a powerful and efficient API testing
            platform. Here&apos;s a look at the key technologies powering our
            solution:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <TechnologyCard
              key={tech.name}
              name={tech.name}
              description={tech.description}
              index={index}
              link={tech.link}
            />
          ))}
        </div>
        <Separator />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Our Commitment to Innovation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            By leveraging these powerful technologies, Trafix delivers a
            seamless, efficient, and feature-rich API testing experience. Our
            commitment to using the latest and most robust tools ensures that
            you have access to a cutting-edge platform that evolves with the
            rapidly changing landscape of web development.
          </p>
        </motion.div>
        <Separator />
        {/* Developer Notes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Meet the Developers
          </h2>
          <div className="space-y-12">
            {developers.map((dev, index: number) => (
              <DeveloperNote key={dev.name} developer={dev} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 text-center text-3xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto italic"
        >
          &quot;We are very happy with our progress and are proud of the fact that we
          were able to build this project within such a short timeframe.&quot;
        </motion.blockquote>
      </div>
    </div>
  );
}
