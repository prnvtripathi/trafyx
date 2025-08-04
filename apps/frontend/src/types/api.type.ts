import { TestCase } from "./test-case.type";

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type UserAPI = {
  id: string;
  user_id: string;
  name: string;
  method: Method;
  url: string;
  headers?: string;
  payload?: string;
  description?: string;
  params?: string;
  created_at: string;
  updated_at: string;
};

export type APISaveRequest = {
  user_id: string;
  name: string;
  method: Method;
  url: string;
  headers?: string;
  payload?: string;
  description?: string;
  params?: string;
};

export type SaveAPIResponse = {
  message?: string;
  api?: any;
  success?: boolean;
  error?: string;
  details?: string;
};

export type FormValues = {
  name: string;
  method: Method;
  url: string;
  headers?: string;
  payload?: string;
  params?: string;
  description: string;
};

export type GetAPIsResponse = {
  user_id?: string;
  apis?: UserAPI[];
  success?: boolean;
  message?: string;
  error?: string;
};

export type GetAPIByIdResponse = {
  user_api?: UserAPI;
  test_cases?: TestCase[];
  success?: boolean;
  message?: string;
  error?: string;
};

export type APIActionResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};
