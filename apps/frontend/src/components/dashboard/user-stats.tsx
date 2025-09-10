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
import Loader from "@/components/ui/loader";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStats } from "@/hooks/use-user-stats";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Stats({ userId, showCharts = true }: { userId: string, showCharts?: boolean }) {
    const { stats, isLoading, isError, error } = useUserStats(userId);

    if (isLoading) {
        return (
            <AnimatePresence>
                <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Loader size={36} />
                </motion.div>
            </AnimatePresence>
        );
    }

    if (isError) {
        return (
            <AnimatePresence>
                <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 sm:p-8 text-center"
                >
                    Failed to load stats: {error?.message || "Unknown error"}
                </motion.div>
            </AnimatePresence>
        );
    }

    if (
        stats?.total_apis == 0
    ) {
        return (
            <AnimatePresence>
                <motion.div
                    key="no-data"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 sm:p-8 text-center"
                >
                    <Card>
                        <CardContent>
                            <p className="mb-4 text-base sm:text-lg text-muted-foreground">
                                It looks like you haven&apos;t created any APIs yet.
                            </p>
                            <Button variant='outline'
                                className="btn btn-primary flex items-center justify-center mx-auto">
                                <PlusCircle className="mr-2" />
                                <Link href="/dashboard/add">Create New Request</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <div className="py-4 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Your Stats
            </h2>
            <div className="mx-auto max-w-7xl">
                <AnimatePresence>
                    <motion.div
                        className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8"
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
                                <CardContent className="flex items-center justify-between py-1 px-2 md:px-4">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Total APIs</span>
                                    <span className="text-base sm:text-lg font-bold">{stats?.total_apis}</span>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Total Test Cases Card */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:scale-[1.02] transition-transform">
                                <CardContent className="flex items-center justify-between py-1 px-2 md:px-4">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Test Cases</span>
                                    <span className="text-base sm:text-lg font-bold">{stats?.total_test_cases}</span>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Success Rate Card */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:scale-[1.02] transition-transform">
                                <CardContent className="flex items-center justify-between py-1 px-2 md:px-4">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Success %</span>
                                    <span className="text-base sm:text-lg font-bold text-green-600">
                                        {stats?.success_rate?.toFixed(2)}%
                                    </span>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Average Duration Card */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:scale-[1.02] transition-transform">
                                <CardContent className="flex items-center justify-between py-1 px-2 md:px-4">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Avg Duration</span>
                                    <span className="text-base sm:text-lg font-bold">
                                        {stats?.average_duration?.toFixed(2)}s
                                    </span>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Charts Grid */}
                {showCharts && (
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                        {/* Test Runs per API Chart */}
                        <div>
                            <Card className="transition-transform">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Test Runs per API</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 sm:p-4">
                                    <ChartContainer className="h-[140px] sm:h-[180px] md:h-[200px] lg:h-[220px]" config={{}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={stats?.api_stats}
                                                layout="vertical"
                                                margin={{ right: 6, left: 4, top: 4, bottom: 4 }}
                                            >
                                                <CartesianGrid horizontal={false} />
                                                <YAxis
                                                    dataKey="name"
                                                    type="category"
                                                    tickLine={false}
                                                    tickMargin={3}
                                                    axisLine={false}
                                                    tickFormatter={(value) => value.slice(0, 3)}
                                                    hide
                                                />
                                                <XAxis type="number" hide />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Bar
                                                    dataKey="test_runs_count"
                                                    fill="var(--color-chart-1)"
                                                    radius={2}
                                                    layout="vertical"
                                                >
                                                    <LabelList
                                                        dataKey="name"
                                                        position="insideLeft"
                                                        offset={3}
                                                        className="fill-[--color-label]"
                                                        fontSize={8}
                                                    />
                                                    <LabelList
                                                        dataKey="test_runs_count"
                                                        position="right"
                                                        offset={3}
                                                        className="fill-foreground"
                                                        fontSize={8}
                                                    />
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Test Runs Over Time */}
                        <div>
                            <Card className="transition-transform">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Test Runs Over Time</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 sm:p-4">
                                    <ChartContainer className="h-[140px] sm:h-[180px] md:h-[200px] lg:h-[220px]" config={{}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={stats?.api_stats}
                                                margin={{ left: 4, right: 4, top: 4, bottom: 30 }}
                                            >
                                                <XAxis
                                                    dataKey="name"
                                                    fontSize={8}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={40}
                                                    interval={0}
                                                    tickFormatter={(v) => (v.length > 6 ? `${v.slice(0, 6)}...` : v)}
                                                />
                                                <YAxis fontSize={8} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="test_runs_count"
                                                    stroke="var(--color-chart-2)"
                                                    strokeWidth={1.2}
                                                    dot={{ r: 2 }}
                                                    activeDot={{ r: 3 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Overall Test Results */}
                        <div>
                            <Card className="transition-transform">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Overall Test Results</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 sm:p-4">
                                    <ChartContainer className="h-[160px] sm:h-[200px] md:h-[220px]" config={{}}>
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: "Passed", value: stats?.passed_test_runs, fill: "#10b981" }, // green
                                                    { name: "Failed", value: stats?.failed_test_runs, fill: "#ef4444" }, // red
                                                ]}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={70}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                labelLine={false}
                                                fontSize={9}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                        </PieChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* API Success Rates */}
                        <div>
                            <Card className="transition-transform">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">API Success Rates</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 sm:p-4">
                                    <ChartContainer className="h-[160px] sm:h-[200px] md:h-[220px]" config={{}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={stats?.api_stats} margin={{ left: 6, right: 6, bottom: 20 }}>
                                                <XAxis
                                                    dataKey="name"
                                                    angle={-45}
                                                    textAnchor="end"
                                                    interval={0}
                                                    height={50}
                                                    fontSize={9}
                                                    tickFormatter={(v) => (v.length > 8 ? `${v.slice(0, 8)}...` : v)}
                                                />
                                                <YAxis unit="%" fontSize={9} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Bar
                                                    dataKey="success_rate"
                                                    fill="var(--color-chart-5)"
                                                    radius={[3, 3, 0, 0]}
                                                    name="Success Rate"
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}