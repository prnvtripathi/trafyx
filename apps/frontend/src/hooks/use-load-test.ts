import useSWRMutation from "swr/mutation";
import { LoadTestRequest } from "../types/load-test.type";

const fetcher = (url: string, { arg }: { arg: LoadTestRequest }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());

export const useLoadTest = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${BACKEND_URL}/load-test`,
    fetcher
  );

  const loadTest = async (request: LoadTestRequest) => {
    return await trigger(request);
  };

  return {
    loadTest,
    isLoading: isMutating,
    data,
    error,
  };
};
