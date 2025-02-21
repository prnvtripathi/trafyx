'use client'
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for the charts
const mockApiData = {
  totalApis: 156,
  totalTests: 892,
  aiGeneratedTests: 543,
  totalRuns: 2145,
  passRate: 87.5,
  apiRunData: [
    { name: "Auth API", runs: 450 },
    { name: "Users API", runs: 380 },
    { name: "Orders API", runs: 320 },
    { name: "Products API", runs: 290 },
    { name: "Payments API", runs: 255 },
  ],
  testTypeData: [
    { name: "Logical Tests", value: 349 },
    { name: "AI Generated", value: 543 },
  ],
};

const COLORS = ["#4f46e5", "#818cf8"];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Stats() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        {/* Key Metrics */}
        <AnimatePresence>
            <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8 bg-transparent"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
              transition: {
                staggerChildren: 0.1,
                ease: "easeInOut",
                mass: 10,
                type: "spring",
              },
              },
            }}
            >
            <motion.div variants={cardVariants}>
              <Card className="transform transition-all hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockApiData.totalApis}</div>
              </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="transform transition-all hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockApiData.totalTests}</div>
              </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="transform transition-all hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pass Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockApiData.passRate}%</div>
              </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="transform transition-all hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Runs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockApiData.totalRuns}</div>
              </CardContent>
              </Card>
            </motion.div>
            </motion.div>
        </AnimatePresence>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* API Runs Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="transform transition-all hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>API Runs Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <BarChart data={mockApiData.apiRunData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar 
                      dataKey="runs" 
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Test Types Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="transform transition-all hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Test Types Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ChartContainer className="h-[300px]" config={{}}>
                  <PieChart>
                    <Pie
                      data={mockApiData.testTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockApiData.testTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ChartContainer>
                <div className="absolute mt-[300px] flex gap-4">
                  {mockApiData.testTypeData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-sm" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm text-gray-600">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};