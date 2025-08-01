import useSWRMutation from "swr/mutation";

async function runTestCase(url: string) {
  const res = await fetch(url, { method: "POST" });
  return res.json();
}

export function useRunCases(apiId: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // For triggering run case (POST)
  const {
    trigger: mutate,
    data,
    isMutating,
    error,
  } = useSWRMutation(
    apiId ? `${BACKEND_URL}/test-case/run?api_id=${apiId}` : null,
    runTestCase
  );

  return {
    data,
    isMutating,
    error,
    mutate,
  };
}
