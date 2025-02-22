"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertCircle,
  Clock,
  Gauge,
  Server,
  Zap,
  Lightbulb,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ApiData } from "./page";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
interface Payload {
  url: string;
  method: string;
  rate: number;
  duration: number;
}

interface Result {
  data: {
    errors: any[];
    latencies: {
      mean: string;
      p50: string;
      p95: string;
      p99: string;
    };
    requests: number;
    success: number;
    throughput: number;
  };
}

const methodColors: Record<string, string> = {
  GET: "text-blue-600 dark:text-blue-400",
  POST: "text-green-600 dark:text-green-400",
  PUT: "text-yellow-600 dark:text-yellow-400",
  DELETE: "text-red-600 dark:text-red-400",
  PATCH: "text-purple-600 dark:text-purple-400",
};

const MetricCard = ({ title, value, icon: Icon, unit = "" }: any) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
  >
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    </div>
    <p className="mt-2 text-2xl font-bold">
      {value}
      {unit && (
        <span className="text-sm font-normal text-muted-foreground ml-1">
          {unit}
        </span>
      )}
    </p>
  </motion.div>
);

export default function LoadTestForm({ apiData }: { apiData: ApiData[] }) {
  const [selectedApi, setSelectedApi] = useState<ApiData>(apiData[0]);
  const [rate, setRate] = useState(10);
  const [duration, setDuration] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [explanation, setExplanation] = useState<string>("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  useEffect(() => {
    setSelectedApi(apiData[0]);
  }, [apiData]);

  useEffect(() => {
    if (loading && countdown !== null) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            return null;
          }
          const newValue = prev - 1;
          setProgress(((duration - newValue) / duration) * 100);
          return newValue;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, countdown, duration]);

  const fetchExplanation = useCallback(
    async (testResult: Result) => {
      setLoadingExplanation(true);
      const prompt = `
      Explain the following load test results. Analyze and suggest ways to improve the performance of the API wherever possible and comment on the overall performance metrics, providing constructive suggestions if needed. Test results are given below: -
      - Total Requests: ${testResult.data.requests}
      - Success Rate: ${(testResult.data.success * 100).toFixed(1)}%
      - Average Latency: ${testResult.data.latencies.mean}
      - Throughput: ${testResult.data.throughput.toFixed(2)} req/s
      - P50 Latency: ${testResult.data.latencies.p50}
      - P95 Latency: ${testResult.data.latencies.p95}
      - P99 Latency: ${testResult.data.latencies.p99}
      
      For API:
      - Method: ${selectedApi.method}
      - URL: ${selectedApi.url}
      - Test Duration: ${duration} seconds
      - Request Rate: ${rate} requests/second
    `;

      try {
        const res = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            maxTokens: 1200,
            isMarkdownNeeded: false,
          }),
        });
        const data = await res.json();
        setExplanation(data?.response || "No explanation available.");
      } catch (error) {
        setExplanation("Failed to fetch explanation.");
      } finally {
        setLoadingExplanation(false);
      }
    },
    [selectedApi, duration, rate]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    setCountdown(duration);
    setProgress(0);
    setExplanation("");

    const payload: Payload = {
      url: selectedApi.url,
      method: selectedApi.method,
      rate: Number(rate),
      duration: Number(duration),
    };

    try {
      const response = await fetch("/api/load-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      await fetchExplanation(data);
    } catch (err: any) {
      setError(err.message || "Failed to run load test");
    } finally {
      setLoading(false);
      setCountdown(null);
      setProgress(0);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Load Test Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-transparent">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-select">Select API</Label>
                    <Select
                      value={selectedApi.id}
                      onValueChange={(value) => {
                        const api = apiData.find((a) => a.id === value);
                        if (api) setSelectedApi(api);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an API" />
                      </SelectTrigger>
                      <SelectContent>
                        {apiData.map((api) => (
                          <SelectItem key={api.id} value={api.id}>
                            {api.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>API URL</Label>
                    <Input
                      readOnly
                      value={selectedApi.url}
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>HTTP Method</Label>
                    <Input
                      readOnly
                      value={selectedApi.method}
                      className={cn(
                        "bg-muted font-medium",
                        methodColors[selectedApi.method] || "text-foreground"
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="rate">Rate (requests per second)</Label>
                      <Input
                        id="rate"
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        required
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (seconds)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {countdown !== null && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Test Progress
                        </span>
                        <span className="font-medium">
                          {countdown}s remaining
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="mr-2"
                        >
                          <Activity className="h-4 w-4" />
                        </motion.div>
                        Running Test...
                      </>
                    ) : (
                      "Run Load Test"
                    )}
                  </Button>
                </div>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4"
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <MetricCard
                        title="Total Requests"
                        value={result.data.requests}
                        icon={Zap}
                      />
                      <MetricCard
                        title="Success Rate"
                        value={(result.data.success * 100).toFixed(1)}
                        unit="%"
                        icon={Activity}
                      />
                      <MetricCard
                        title="Average Latency"
                        value={result.data.latencies.mean.replace("ms", "")}
                        unit="ms"
                        icon={Clock}
                      />
                      <MetricCard
                        title="Throughput"
                        value={result.data.throughput.toFixed(2)}
                        unit="req/s"
                        icon={Gauge}
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Detailed Latencies
                      </h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        {Object.entries(result.data.latencies)
                          .filter(([key]) => key !== "mean")
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="rounded-lg border bg-card p-3"
                            >
                              <div className="text-sm font-medium text-muted-foreground">
                                {key.toUpperCase()}
                              </div>
                              <div className="mt-1 text-lg font-semibold">
                                {value.replace("ms", "")}
                                <span className="text-sm font-normal text-muted-foreground ml-1">
                                  ms
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explanation Section */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Results Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingExplanation ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[500px]" />
                      <Skeleton className="h-4 w-[550px]" />
                      <Skeleton className="h-4 w-[400px]" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        <SyntaxHighlighter
                          language="markdown"
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            padding: "1.25rem",
                            fontSize: "0.875rem",
                            backgroundColor: "transparent",
                            borderRadius: "0.5rem",
                          }}
                          wrapLongLines={true}
                        >
                          {explanation}
                        </SyntaxHighlighter>
                      </p>
                      <Button
                        onClick={() => fetchExplanation(result)}
                        className="w-32"
                      >
                        <RefreshCcw className="h-4 w-4" />
                        Rephrase
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
