"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete API</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this API? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/80" onClick={() => deleteApi({ apiId })}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}