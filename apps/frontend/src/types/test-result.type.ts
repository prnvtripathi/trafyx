import { UserAPI } from "./api.type";
import { TestCase } from "./test-case.type";

export type TestResult = {
  _id: string;
  test_case_id: string;
  status_code: number;
  response: string;
  expected_outcome: number;
  test_result: boolean;
  duration: number;
  executed_at: string | Date;
  run_count: number;
  test_case?: TestCase;
};

export type TestResultResponse = {
  api_id: string;
  user_api: UserAPI;
  test_cases: number;
  test_results: TestResult[];
  error?: string;
};

export type TestResultWithAPIResponse = {
  apis: TestResultWithAPI[];
};

export type TestResultWithAPI = {
  _id: string;
  test_results: TestResult[];
  user_api: UserAPI;
  test_cases_count: number;
};
