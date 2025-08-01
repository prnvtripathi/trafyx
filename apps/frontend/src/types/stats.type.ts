export interface APIStats {
  api_id: string;
  name: string;
  test_cases_count: number;
  test_runs_count: number;
  passed_test_runs: number;
  failed_test_runs: number;
  success_rate: number;
  average_duration: number;
  total_duration: number;
}

export interface StatsResponse {
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
