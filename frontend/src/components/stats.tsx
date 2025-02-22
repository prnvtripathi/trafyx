"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  LabelList,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Loader from "./ui/loader";

interface APIStats {
  api_id: string;
  name: string;
  test_cases_count: number;
  test_runs_count: number;
  passed_test_runs: number;
  failed_test_runs: number;
  success_rate: number;
  average_duration: number;
}

interface StatsResponse {
  user_id: string;
  total_apis: number;
  total_test_cases: number;
  total_test_runs: number;
  passed_test_runs: number;
  failed_test_runs: number;
  success_rate: number;
  average_duration: number;
  api_stats: APIStats[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Stats({ userId }: { userId: string }) {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`/api/stats?user_id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data: StatsResponse = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [userId]);

  if (loading) return <Loader size={12} />;
  if (!stats)
    return <div className="p-8 text-center">Failed to load stats</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-primary-foreground mb-4">
        Your Stats
      </h2>
      <div className="mx-auto max-w-7xl">
        <AnimatePresence>
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8"
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
            {/* Total APIs Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:scale-[1.02] transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Total APIs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_apis}</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Test Cases Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:scale-[1.02] transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Test Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.total_test_cases}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Success Rate Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:scale-[1.02] transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.success_rate.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Average Duration Card */}
            <motion.div variants={cardVariants}>
              <Card className="hover:scale-[1.02] transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Avg Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.average_duration.toFixed(2)}s
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Test Runs per API Chart */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            >
            <Card className=" transition-transform">
              <CardHeader>
              <CardTitle>Test Runs per API</CardTitle>
              </CardHeader>
              <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <BarChart
                data={stats.api_stats}
                layout="vertical"
                margin={{ right: 16 }}
                >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis type="number" hide />
                {/* <ChartTooltip /> */}  <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="test_runs_count"
                  fill="#a78bfa"
                  radius={4}
                  layout="vertical"
                >
                  <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                  />
                  <LabelList
                  dataKey="test_runs_count"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                  />
                </Bar>
                </BarChart>
              </ChartContainer>
              </CardContent>
            </Card>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className=" transition-transform">
              <CardHeader>
                <CardTitle>Test Runs Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.api_stats}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="test_runs_count"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pass/Fail Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className=" transition-transform">
              <CardHeader>
                <CardTitle>Overall Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Passed",
                          value: stats.passed_test_runs,
                          fill: "#10b981",
                        },
                        {
                          name: "Failed",
                          value: stats.failed_test_runs,
                          fill: "#ef4444",
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Success Rate Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className=" transition-transform">
              <CardHeader>
                <CardTitle>API Success Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <BarChart data={stats.api_stats}>
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={70}
                    />
                    <YAxis unit="%" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="success_rate"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      name="Success Rate"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
