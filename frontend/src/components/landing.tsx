"use client";

import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";
import {
  Play,
  Code2,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Database,
  Lock,
  RefreshCcw,
  GitBranch,
  Terminal,
  BarChart,
  Activity,
  Globe,
  Workflow,
  SunIcon,
  MoonIcon,
  NotebookIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PageRoutes } from "@/lib/pageroutes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeBlock } from "./ui/code-block";
import { Cover } from "./ui/cover";
import PricingPage from "./pricing";

const inter = Inter({ subsets: ["latin"] });

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};


// Grid line pattern generator
const GridLines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Vertical Lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent"
          style={{ left: `${(100 / 12) * i}%` }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal Lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"
          style={{ top: `${(100 / 8) * i}%` }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Intersections */}
      {Array.from({ length: 96 }).map((_, i) => {
        const row = Math.floor(i / 12);
        const col = i % 12;
        return (
          <motion.div
            key={`i-${i}`}
            className="absolute size-1.5 rounded-full bg-violet-500/30"
            style={{
              left: `${(100 / 12) * col}%`,
              top: `${(100 / 8) * row}%`,
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: (row + col) * 0.1,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Stats Component
const Stats = () => (
<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">Trusted by Developers Worldwide</h2>

    <p className="mt-4 text-gray-500 sm:text-xl">
      Join thousands of developers who rely on our platform for seamless API testing and monitoring.
    </p>
  </div>

  <dl
    className="mt-6 grid grid-cols-1 gap-4 divide-y divide-gray-100 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
  >
    <div className="flex flex-col px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">APIs Monitored</dt>
      <dd className="text-4xl font-extrabold text-primary md:text-5xl">1.2k</dd>
    </div>

    <div className="flex flex-col px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Tests Generated</dt>
      <dd className="text-4xl font-extrabold text-primary md:text-5xl">15k</dd>
    </div>

    <div className="flex flex-col px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Alerts Sent</dt>
      <dd className="text-4xl font-extrabold text-primary md:text-5xl">3.5k</dd>
    </div>

    <div className="flex flex-col px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Active Users</dt>
      <dd className="text-4xl font-extrabold text-primary md:text-5xl">8.6k</dd>
    </div>
  </dl>
</div>
);


export default function LandingPage() {

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 ${inter.className}`}
    >
  

      <GridLines />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-2 bg-violet-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 30],
              opacity: [0.2, 0.5],
              scale: [1, 1.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Static Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/80 via-transparent to-blue-100/80 dark:from-violet-900/20 dark:via-transparent dark:to-blue-900/20" />
        </div>

        {/* Glassmorphic Circles */}
        <motion.div
          className="absolute top-20 -left-32 size-64 rounded-full bg-violet-300/30 dark:bg-violet-600/30 blur-3xl"
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
          className="absolute -bottom-32 -right-32 size-64 rounded-full bg-blue-300/20 dark:bg-blue-600/20 blur-3xl"
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            className="text-center space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn} className="inline-block">
              <div className="flex items-center space-x-2 rounded-full bg-gray-200/80 dark:bg-white/10 px-4 py-1.5 backdrop-blur-sm border border-gray-300/50 dark:border-white/10">
                <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-200" />
                <span className="text-sm font-medium text-violet-700 dark:text-violet-200">
                  New: API Monitoring
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Automated API Testing
              <span className="block">
                <Cover>Made Simple</Cover>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300"
            >
              Test, monitor, and validate your APIs with zero configuration. Get
              started in minutes with our intelligent automation platform.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="relative group bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="relative flex group border-violet-600 dark:border-violet-500 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/50"
              >
                <Link
                  className="flex items-center"
                  href={`/docs${PageRoutes[0].href}`}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  Docs
                  <NotebookIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Floating Browser Mockup */}
            <motion.div
              variants={{
                initial: { y: 0 },
                animate: {
                  y: [-10, 10],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                },
              }}
              initial="initial"
              animate="animate"
              className="relative mt-16 mx-auto max-w-3xl"
            >
              <div className="relative rounded-xl overflow-hidden backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-white/10 shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center gap-2 p-3 border-b border-gray-200/50 dark:border-white/10">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500" />
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <div className="size-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="w-full h-6 rounded bg-gray-200/50 dark:bg-white/5" />
                  </div>
                </div>
                {/* Browser Content */}
                <div className="relative aspect-video bg-gradient-to-br from-violet-100/20 to-transparent dark:from-violet-900/20 dark:to-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-lg bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 flex items-center mx-auto justify-center">
                      <iframe
                        width="98%"
                        height="97%"
                        src="https://www.youtube.com/embed/aFHhcpyHkEU?si=ftAlh-C7uTqYwyHO"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 w-full rotate-180">
          <svg
            className="w-full"
            viewBox="0 0 1440 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 116L60 96.3C120 77 240 37 360 21.7C480 6 600 16 720 31.3C840 47 960 67 1080 72.7C1200 78 1320 68 1380 62.3L1440 57V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V116Z"
              className="fill-gray-100 dark:fill-black"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24">
        {/* <CircuitPattern /> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stats />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden bg-gray-100/50 dark:bg-black/50">
        {/* Static Grid with Lines */}
  
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Everything you need for API testing
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Powerful features that help you validate your APIs with confidence
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                icon: (
                  <Code2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                ),
                title: "Zero Config",
                description:
                  "Get started instantly with intelligent API detection and automated test generation",
              },
              {
                icon: (
                  <Zap className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                ),
                title: "Real-time Monitoring",
                description:
                  "Monitor your APIs 24/7 with instant alerts and detailed performance metrics",
              },
              {
                icon: (
                  <Shield className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                ),
                title: "Security Testing",
                description:
                  "Automatically detect vulnerabilities and ensure your APIs are secure",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0.5 bg-gradient-to-br from-violet-600 to-blue-600 dark:from-violet-500 dark:to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 h-full">
                  <div className="p-3 inline-block rounded-xl bg-gray-100/80 dark:bg-gray-800/50 mb-4 group-hover:bg-gray-200/80 dark:group-hover:bg-gray-800/80 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integration Logos Section
      <section className="relative py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IntegrationLogos />
        </div>
        {/* <WavePattern /> */}
        <div className="absolute bottom-0 w-full rotate-180">
          <svg
            className="w-full"
            viewBox="0 0 1440 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 116L60 96.3C120 77 240 37 360 21.7C480 6 600 16 720 31.3C840 47 960 67 1080 72.7C1200 78 1320 68 1380 62.3L1440 57V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V116Z"
              className="fill-gray-100 dark:fill-gray-900/50"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      {/* </section>  */}

      {/* How it Works Section */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-gray-900/50">
        {/* Static Grid with Dots */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-dot-pattern opacity-5 dark:opacity-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How Trafix Works
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Get started in minutes with our simple three-step process
            </motion.p>
          </motion.div>
        </div>

        <div className="space-y-24 mx-auto flex flex-col justify-center items-center">
       
        </div>
      </section>

      <PricingPage/>

      {/* CTA Section */}
      <section className="py-24 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cross-pattern opacity-5 dark:opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-200/50 to-blue-200/50 dark:from-violet-900/50 dark:to-blue-900/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
              <div className="text-center max-w-3xl mx-auto space-y-8">
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold"
                >
                  Ready to streamline your API testing?
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-gray-600 dark:text-gray-200"
                >
                  Join thousands of developers who trust Trafix for their API
                  testing needs.
                </motion.p>
                <motion.ul
                  variants={staggerChildren}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600 dark:text-gray-200"
                >
                  {["Free to get started", "Distributed", "Open Source"].map(
                    (item, index) => (
                      <motion.li
                        key={index}
                        variants={fadeIn}
                        className="flex items-center"
                      >
                        <CheckCircle2 className="h-5 w-5 text-violet-600 dark:text-violet-400 mr-2" />
                        {item}
                      </motion.li>
                    )
                  )}
                </motion.ul>
                <motion.div
                  variants={fadeIn}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="relative group bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white"
                    >
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      Start Testing Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/docs${PageRoutes[0].href}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="relative group border-violet-600 dark:border-violet-500 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/50"
                    >
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      View documentation
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
