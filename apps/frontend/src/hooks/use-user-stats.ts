import useSWR from "swr";
import { StatsResponse } from "@/types/stats.type";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch user stats");
    return res.json();
  });

export function useUserStats(userId: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data, error, isLoading, mutate } = useSWR<StatsResponse>(
    userId ? `${BACKEND_URL}/user/stats/${userId}` : null,
    fetcher
  );

  return {
    stats: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
