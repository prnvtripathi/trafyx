import { Method } from "./api.type";

export type TestCase = {
  _id: string;
  created_at: string;
  api_id: string;
  name: string;
  method: Method;
  url: string;
  headers?: string;
  payload?: string;
  description?: string;
  expected_outcome: number;
  created_by?: "go" | "user" | "ai";
};

export type GenerateTestCasesRequest = {
  api_id: string;
  created_by: "go" | "user" | "ai";
};

export type GenerateTestCasesResponse = {
  success?: boolean;
  test_cases?: TestCase[];
  error?: string;
};
