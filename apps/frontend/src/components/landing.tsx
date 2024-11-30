'use client'

import { Button } from "@/components/ui/button"
import { Inter } from 'next/font/google'
import Link from "next/link"
import { Play, Code2, Zap, Shield, ArrowRight, CheckCircle2, Sparkles, Cpu, Database, Lock, RefreshCcw, GitBranch, Terminal, BarChart, Activity, Globe, Workflow, SunIcon, MoonIcon, NotebookIcon } from 'lucide-react'
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import { PageRoutes } from "@/lib/pageroutes";

const inter = Inter({ subsets: ['latin'] })

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

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
            ease: "easeInOut"
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
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated Intersections */}
      {Array.from({ length: 96 }).map((_, i) => {
        const row = Math.floor(i / 12)
        const col = i % 12
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
              ease: "easeInOut"
            }}
          />
        )
      })}
    </div>
  )
}



// Stats Component
const Stats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
    {[
      { label: "API Tests Run", value: "1M+", icon: Activity },
      { label: "Success Rate", value: "99.9%", icon: BarChart },
      { label: "Global CDN", value: "180+", icon: Globe },
      { label: "CI/CD Integrations", value: "50+", icon: Workflow },
    ].map((stat, index) => (
      <motion.div
        key={index}
        className="text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <stat.icon className="mx-auto h-8 w-8 mb-4 text-violet-500" />
        <div className="text-3xl font-bold mb-2">{stat.value}</div>
        <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
      </motion.div>
    ))}
  </div>
)

// Integration Logos Component
const IntegrationLogos = () => (
  <div className="py-12">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold mb-2">Works with your stack</h3>
      <p className="text-gray-500 dark:text-gray-400">Seamlessly integrate with your favorite tools</p>
    </div>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
      {[GitBranch, Terminal, Database, Lock, RefreshCcw, Cpu].map((Icon, index) => (
        <motion.div
          key={index}
          className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Icon className="h-8 w-8 text-violet-500" />
        </motion.div>
      ))}
    </div>
  </div>
)

export default function LandingPage() {
  // const [isDark, setIsDark] = useState(false)

  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setIsDark(true)
  //     document.documentElement.classList.add('dark')
  //   }
  // }, [])

  // const toggleTheme = () => {
  //   setIsDark(!isDark)
  //   document.documentElement.classList.toggle('dark')
  // }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 ${inter.className}`}>
      {/* Theme Toggle */}
      {/* <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button> */}

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


      {/* Animated Lines */}
      {/* This section is now replaced by GridLines component */}

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
                <span className="text-sm font-medium text-violet-700 dark:text-violet-200">New: API Monitoring</span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Automated API Testing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400">
                Made Simple
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300"
            >
              Test, monitor, and validate your APIs with zero configuration. 
              Get started in minutes with our intelligent automation platform.
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="relative group bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="relative flex group border-violet-600 dark:border-violet-500 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/50"
              >
                <Link className="flex items-center"
          href={`/docs${PageRoutes[0].href}`}>
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
                    ease: "easeInOut"
                  }
                }
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
                    <div className="w-3/4 h-3/4 rounded-lg bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 w-full rotate-180">
          <svg className="w-full" viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
          <div className="absolute inset-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-violet-500/10 to-transparent"
                style={{ top: `${(i + 1) * 16.666}%` }}
              />
            ))}
          </div>
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
                icon: <Code2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
                title: "Zero Config",
                description: "Get started instantly with intelligent API detection and automated test generation"
              },
              {
                icon: <Zap className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
                title: "Real-time Monitoring",
                description: "Monitor your APIs 24/7 with instant alerts and detailed performance metrics"
              },
              {
                icon: <Shield className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
                title: "Security Testing",
                description: "Automatically detect vulnerabilities and ensure your APIs are secure"
              }
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
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integration Logos Section */}
      <section className="relative py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IntegrationLogos />
        </div>
        {/* <WavePattern /> */}
        <div className="absolute bottom-0 w-full rotate-180">
          <svg className="w-full" viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M0 116L60 96.3C120 77 240 37 360 21.7C480 6 600 16 720 31.3C840 47 960 67 1080 72.7C1200 78 1320 68 1380 62.3L1440 57V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V116Z" 
              className="fill-gray-100 dark:fill-gray-900/50"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </section>

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
              How Apilux Works
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Get started in minutes with our simple three-step process
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
                step: "01",
                title: "Connect Your API",
                description: "Import your OpenAPI spec or connect your endpoints directly"
              },
              {
                step: "02",
                title: "Generate Tests",
                description: "Our AI automatically generates comprehensive test suites"
              },
              {
                step: "03",
                title: "Monitor & Validate",
                description: "Get real-time insights and automated validation reports"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-500 dark:to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000" />
                <div className="relative p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-lg border border-gray-200/50 dark:border-white/10">
                  <motion.div 
                    className="text-violet-600 dark:text-violet-400 font-mono text-sm mb-2"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  
                  {/* Animated Connection Lines */}
                  {index < 2 && (
                    <motion.div 
                      className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-violet-500/50"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating Graphics */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-10 size-20 rounded-full bg-violet-500/20 blur-xl"
              animate={{
                y: [-20, 20],
                opacity: [0.2, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-10 size-32 rounded-full bg-blue-500/20 blur-xl"
              animate={{
                y: [20, -20],
                opacity: [0.3, 0.6],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>
      </section>

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
                  Join thousands of developers who trust Apilux for their API testing needs.
                </motion.p>
                <motion.ul 
                  variants={staggerChildren}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600 dark:text-gray-200"
                >
                  {['Free to get started', 'No credit card required', '14-day trial'].map((item, index) => (
                    <motion.li 
                      key={index}
                      variants={fadeIn}
                      className="flex items-center"
                    >
                      <CheckCircle2 className="h-5 w-5 text-violet-600 dark:text-violet-400 mr-2" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div 
                  variants={fadeIn}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button 
                    size="lg" 
                    className="relative group bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    Start Testing Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="relative group border-violet-600 dark:border-violet-500 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/50"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-12 -left-12 size-24 rounded-full bg-violet-500/30 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-12 -right-12 size-32 rounded-full bg-blue-500/30 blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}