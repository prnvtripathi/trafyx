import useSWR from "swr";
import {
  TestResultResponse,
  TestResultWithAPIResponse,
} from "@/types/test-result.type";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTestResults(apiId: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // For fetching test results (GET)
  const { data, error, isLoading } = useSWR<TestResultResponse>(
    apiId ? `${BACKEND_URL}/test-results/${apiId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}

export function useAPIsWithTestResults(userId: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // For fetching APIs with test results available (GET)
  const { data, error, isLoading } = useSWR<TestResultWithAPIResponse>(
    userId ? `${BACKEND_URL}/user/test-results/${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
