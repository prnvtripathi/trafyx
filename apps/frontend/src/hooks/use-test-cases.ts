import useSWRMutation from "swr/mutation";
import {
  GenerateTestCasesRequest,
  GenerateTestCasesResponse,
  NewTestCase,
  TestCase,
} from "@/types/test-case.type";

async function generateTestCases(
  url: string,
  { arg }: { arg: GenerateTestCasesRequest }
): Promise<GenerateTestCasesResponse> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export function useGenerateTestCases() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { trigger, data, error, isMutating } = useSWRMutation<
    GenerateTestCasesResponse,
    any,
    string,
    GenerateTestCasesRequest
  >(`${BACKEND_URL}/test-case/generate`, generateTestCases);

  return {
    generateTestCases: trigger,
    data,
    error,
    isGenerating: isMutating,
  };
}

export function useUpdateTestCase() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { trigger, data, error, isMutating } = useSWRMutation<
    any,
    any,
    string,
    { _id: string; test_case: TestCase }
  >(`${BACKEND_URL}/test-case`, async (url, { arg }) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      credentials: "include",
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  });

  return {
    updateTestCase: trigger,
    data,
    error,
    isUpdating: isMutating,
  };
}

export function useDeleteTestCase() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { trigger, data, error, isMutating } = useSWRMutation<
    any,
    any,
    string,
    { _id: string }
  >(`${BACKEND_URL}/test-case`, async (url, { arg }) => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      credentials: "include",
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  });

  return {
    deleteTestCase: trigger,
    data,
    error,
    isDeleting: isMutating,
  };
}

export function useAddTestCase() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { trigger, data, error, isMutating } = useSWRMutation<
    any,
    any,
    string,
    { test_cases: NewTestCase[] }
  >(`${BACKEND_URL}/test-case`, async (url, { arg }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      credentials: "include",
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  });

  return {
    addTestCase: trigger,
    data,
    error,
    isAdding: isMutating,
  };
}
