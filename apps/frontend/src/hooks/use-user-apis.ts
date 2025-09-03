import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import {
  APISaveRequest,
  GetAPIByIdResponse,
  GetAPIsResponse,
  SaveAPIResponse,
  APIActionResponse,
  UserAPI,
} from "@/types/api.type";

async function saveAPI(
  url: string,
  { arg }: { arg: APISaveRequest }
): Promise<SaveAPIResponse> {
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

// Edit API (PUT)
async function editAPI(
  url: string,
  { arg }: { arg: Partial<UserAPI> }
): Promise<APIActionResponse> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// Delete API (DELETE)
async function deleteAPI(url: string): Promise<APIActionResponse> {
  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export function useSaveUserAPI() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { trigger, data, error, isMutating } = useSWRMutation<
    SaveAPIResponse,
    any,
    string,
    APISaveRequest
  >(`${BACKEND_URL}/api`, saveAPI);

  return {
    saveUserAPI: trigger,
    data,
    error,
    isSaving: isMutating,
  };
}

export function useEditAPI(apiId: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { trigger, data, error, isMutating } = useSWRMutation<
    APIActionResponse,
    any,
    string,
    Partial<UserAPI>
  >(apiId ? `${BACKEND_URL}/api/${apiId}` : "", editAPI);
  return {
    editAPI: trigger,
    data,
    error,
    isEditing: isMutating,
  };
}

export function useDeleteAPI(apiId: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { trigger, data, error, isMutating } = useSWRMutation<
    APIActionResponse,
    any,
    string,
    void
  >(apiId ? `${BACKEND_URL}/api/${apiId}` : "", deleteAPI);
  return {
    deleteAPI: trigger,
    data,
    error,
    isDeleting: isMutating,
  };
}

export function useUserAPIs({ userId }: { userId: string }) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { data, error, isLoading } = useSWR<GetAPIsResponse>(
    `${BACKEND_URL}/user/apis/${userId}`,
    async (url: string) => {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch APIs");
      return res.json();
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}

export function useAPIById(apiId: string) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { data, error, isLoading } = useSWR<GetAPIByIdResponse>(
    apiId ? `${BACKEND_URL}/api/${apiId}` : null,
    async (url: string) => {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch API");
      return res.json();
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
