import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useEditAPI } from "@/hooks/use-user-apis";
import { UserAPI, Method } from "@/types/api.type";

interface EditAPIButtonProps {
    api: UserAPI;
    variant?: "icon" | "default";
    className?: string;
}

export default function EditAPIButton({ api, variant = "default", className = "" }: EditAPIButtonProps) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: api.name,
        method: api.method,
        url: api.url,
        headers: api.headers || "",
        payload: api.payload || "",
        description: api.description || "",
        params: api.params || "",
    });
    const { editAPI, isEditing } = useEditAPI(api.id);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = async () => {
        await editAPI(form);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size={variant === "icon" ? "icon" : undefined}
                    className={
                        `${className} hover:bg-muted/70`
                    }
                >
                    <PencilIcon className={variant === "icon" ? "size-4" : "size-4 mr-1"} />
                    {variant === "default" && "Edit"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit API</DialogTitle>
                    <DialogDescription>
                        Update the API information below and click Save to apply changes.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="API Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <select
                        name="method"
                        className="w-full border rounded-md px-3 py-2"
                        value={form.method}
                        onChange={handleChange}
                    >
                        {(["GET", "POST", "PUT", "DELETE", "PATCH"] as Method[]).map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="url"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="API URL"
                        value={form.url}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="headers"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Headers (JSON)"
                        value={form.headers}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="payload"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Payload (JSON)"
                        value={form.payload}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="params"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Params (JSON)"
                        value={form.params}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </form>
                <DialogFooter>
                    <Button
                        variant="default"
                        disabled={isEditing}
                        onClick={handleEdit}
                    >
                        {isEditing ? "Saving..." : "Save"}
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
