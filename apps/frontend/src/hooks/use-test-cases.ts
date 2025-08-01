import useSWRMutation from "swr/mutation";
import {
  GenerateTestCasesRequest,
  GenerateTestCasesResponse,
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
