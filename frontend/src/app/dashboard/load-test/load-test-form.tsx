"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ApiData } from "./page";

interface Payload {
  url: string;
  method: string;
  rate: number;
  duration: number;
}

interface Result {
  [key: string]: any;
}

export default function LoadTestForm({ apiData }: { apiData: ApiData[] }) {
  const [selectedApi, setSelectedApi] = useState<ApiData>(apiData[0]);
  const [rate, setRate] = useState(10);
  const [duration, setDuration] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedApi(apiData[0]);
  }, [apiData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

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

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to run load test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label
            htmlFor="api-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select API
          </Label>
          <select
            id="api-select"
            value={selectedApi.id}
            onChange={(e) => {
              const api = apiData.find((a) => a.id === e.target.value);
              if (api) setSelectedApi(api);
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            {apiData.map((api) => (
              <option key={api.id} value={api.id}>
                {api.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">
            API URL
          </Label>
          <Input
            readOnly
            value={selectedApi.url}
            className="mt-1 block w-full bg-gray-100"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">
            HTTP Method
          </Label>
          <Input
            readOnly
            value={selectedApi.method}
            className="mt-1 block w-full bg-gray-100"
          />
        </div>

        <div>
          <Label
            htmlFor="rate"
            className="block text-sm font-medium text-gray-700"
          >
            Rate (requests per second)
          </Label>
          <Input
            id="rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            required
            min="1"
          />
        </div>

        <div>
          <Label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration (seconds)
          </Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            min="1"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Running Test..." : "Run Load Test"}
        </Button>
      </form>

      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Test Results</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
}
