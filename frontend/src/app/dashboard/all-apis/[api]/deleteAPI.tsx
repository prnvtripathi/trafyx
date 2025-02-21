"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteButton({ apiId }: { apiId: string }) {
  const router = useRouter();
  async function deleteApi({ apiId }: { apiId: string }) {
    try {
      const response = await fetch(`/api/delete?api_id=${apiId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      toast.success("API deleted");
      router.push("/dashboard/all-apis");
    } catch (error) {
      console.error("Error deleting API:", error);
      toast.error("Error deleting API");
    }
  }
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() => deleteApi({ apiId })}
    >
      <Trash2Icon />
    </Button>
  );
}
