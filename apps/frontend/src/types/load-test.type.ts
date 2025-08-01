export type LoadTestRequest = {
  api_id: string;
  rate: number;
  duration: number;
  headers?: string | null;
  payload?: string | null;
};

export type LoadTestResponse = {
  api_name: string;
  requests: number;
  success: number;
  latencies: {
    mean: string;
    p50: string;
    p95: string;
    p99: string;
  };
  data: {
    bytes_in: number;
    bytes_in_total: number;
    bytes_out: number;
    bytes_out_total: number;
  };
  duration: string;
  wait: string;
  status_codes: Record<string, number>;
  throughput: number;
  errors: number;
  error?: string; // Optional error message if the test fails
  details?: string; // Optional details for the response
};
