import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useDeleteAPI } from "@/hooks/use-user-apis";
import { UserAPI } from "@/types/api.type";

interface DeleteAPIButtonProps {
    api: UserAPI;
    variant?: "icon" | "default";
    className?: string;
}

export default function DeleteAPIButton({ api, variant = "default", className = "" }: DeleteAPIButtonProps) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const { deleteAPI, isDeleting } = useDeleteAPI(api.id);

    const handleDelete = async () => {
        await deleteAPI();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size={variant === "icon" ? "icon" : undefined}
                    className={
                        `${className} hover:text-destructive *:hover:bg-destructive/20`
                    }
                >
                    <Trash2Icon className={variant === "icon" ? "size-4" : "size-4 mr-1"} />
                    {variant === "default" && "Delete"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                        To delete this API, please type its name (<span className="font-bold">{api.name}</span>) below:
                    </DialogDescription>
                </DialogHeader>
                <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 mt-4"
                    placeholder={`Type "${api.name}" to confirm`}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <DialogFooter>
                    <Button
                        variant="destructive"
                        disabled={input !== api.name || isDeleting}
                        onClick={handleDelete}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
