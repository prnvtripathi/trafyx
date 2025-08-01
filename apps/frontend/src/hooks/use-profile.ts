import useSWRMutation from "swr/mutation";

const deleteFetcher = (url: string) =>
  fetch(url, { method: "DELETE" }).then((res) => res.json());

export function useDeleteProfile(userId: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    userId ? `/user/delete/${userId}` : null,
    deleteFetcher
  );

  return {
    trigger,
    isLoading: isMutating,
    error,
  };
}
