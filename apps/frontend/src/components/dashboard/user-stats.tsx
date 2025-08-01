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
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Your Stats
            </h2>
            <div className="mx-auto max-w-7xl">
                <AnimatePresence>
                    <motion.div
                        className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8"
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
                                    <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                                        Total APIs
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg sm:text-2xl font-bold">{stats?.total_apis}</div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Total Test Cases Card */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:scale-[1.02] transition-transform">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                                        Test Cases
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg sm:text-2xl font-bold">
                                        {stats?.total_test_cases}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Success Rate Card */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:scale-[1.02] transition-transform">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                                        Success Rate
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg sm:text-2xl font-bold text-green-600">
                                        {stats?.success_rate?.toFixed(2)}%
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Average Duration Card */}
                        <motion.div variants={cardVariants}>
                            <Card className="hover:scale-[1.02] transition-transform">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                                        Avg Duration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg sm:text-2xl font-bold">
                                        {stats?.average_duration?.toFixed(2)}s
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Charts Grid */}
                {showCharts && (
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                        {/* Test Runs per API Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="transition-transform">
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg">Test Runs per API</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 sm:p-6">
                                    <ChartContainer className="h-[180px] sm:h-[250px] lg:h-[300px] w-full" config={{}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={stats?.api_stats}
                                                layout="vertical"
                                                margin={{ right: 8, left: 4, top: 5, bottom: 5 }}
                                            >
                                                <CartesianGrid horizontal={false} />
                                                <YAxis
                                                    dataKey="name"
                                                    type="category"
                                                    tickLine={false}
                                                    tickMargin={5}
                                                    axisLine={false}
                                                    tickFormatter={(value) => value.slice(0, 3)}
                                                    hide
                                                />
                                                <XAxis type="number" hide />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Bar
                                                    dataKey="test_runs_count"
                                                    fill="#a78bfa"
                                                    radius={2}
                                                    layout="vertical"
                                                >
                                                    <LabelList
                                                        dataKey="name"
                                                        position="insideLeft"
                                                        offset={4}
                                                        className="fill-[--color-label]"
                                                        fontSize={8}
                                                    />
                                                    <LabelList
                                                        dataKey="test_runs_count"
                                                        position="right"
                                                        offset={4}
                                                        className="fill-foreground"
                                                        fontSize={8}
                                                    />
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Card className="transition-transform">
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg">Test Runs Over Time</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 sm:p-6">
                                    <ChartContainer className="h-[180px] sm:h-[250px] lg:h-[300px] w-full" config={{}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={stats?.api_stats} margin={{ left: 4, right: 4, top: 5, bottom: 40 }}>
                                                <XAxis
                                                    dataKey="name"
                                                    fontSize={8}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={50}
                                                    interval={0}
                                                    tickFormatter={(value) =>
                                                        value.length > 6 ? `${value.slice(0, 6)}...` : value
                                                    }
                                                />
                                                <YAxis fontSize={8} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="test_runs_count"
                                                    stroke="#4f46e5"
                                                    strokeWidth={1.5}
                                                    dot={{ r: 2 }}
                                                    activeDot={{ r: 4 }}
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
                            <Card className="transition-transform">
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg">Overall Test Results</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer className="h-[250px] sm:h-[300px]" config={{}}>
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    {
                                                        name: "Passed",
                                                        value: stats?.passed_test_runs,
                                                        fill: "#10b981",
                                                    },
                                                    {
                                                        name: "Failed",
                                                        value: stats?.failed_test_runs,
                                                        fill: "#ef4444",
                                                    },
                                                ]}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                innerRadius={0}
                                                label={({ name, percent }) =>
                                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                                }
                                                labelLine={false}
                                                fontSize={10}
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
                            <Card className="transition-transform">
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg">API Success Rates</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer className="h-[250px] sm:h-[300px]" config={{}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={stats?.api_stats} margin={{ left: 8, right: 8, bottom: 20 }}>
                                                <XAxis
                                                    dataKey="name"
                                                    angle={-45}
                                                    textAnchor="end"
                                                    interval={0}
                                                    height={70}
                                                    fontSize={10}
                                                    tickFormatter={(value) =>
                                                        value.length > 8 ? `${value.slice(0, 8)}...` : value
                                                    }
                                                />
                                                <YAxis unit="%" fontSize={10} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Bar
                                                    dataKey="success_rate"
                                                    fill="#10b981"
                                                    radius={[4, 4, 0, 0]}
                                                    name="Success Rate"
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}