"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DoorOpenIcon, TriangleAlertIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { deleteUser } from "@/lib/actions";

export default function DeleteDialog() {
  const { data: session } = useSession();

  const [inputID, setInputID] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputID(e.target.value);
  };

  const isDeleteDisabled = inputID !== session?.user?.id;

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <DoorOpenIcon className="h-5 w-5 hover:text-red-600 transition-colors cursor-pointer" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={deleteUser}>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you absolutely sure? Doing so will permanently delete your
                account from our servers.
              </AlertDialogDescription>
              <AlertDialogDescription className="bg-red-200 w-full dark:bg-red-800/20 text-red-500 rounded py-1 px-1 flex items-center gap-3">
                <TriangleAlertIcon />
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogDescription className="mt-2">
              Type your ID &apos;
              <span className="text-red-500 font-semibold">
                {session?.user?.id}
              </span>
              &apos; in the below input field to confirm.
              <Input
                id="inputID"
                className="col-span-3 my-2"
                value={inputID}
                onChange={handleInputChange}
              />
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isDeleteDisabled}>
                Delete
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
