import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
                <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">API Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter API name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="method">HTTP Method</Label>
                                <Select value={form.method} onValueChange={(value) => setForm({ ...form, method: value as Method })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(["GET", "POST", "PUT", "DELETE", "PATCH"] as Method[]).map(method => (
                                            <SelectItem key={method} value={method}>
                                                <span className="font-mono text-sm">{method}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="url">API URL</Label>
                            <Input
                                id="url"
                                name="url"
                                placeholder="https://api.example.com/endpoint?param1=value1&param2=value2"
                                value={form.url}
                                onChange={handleChange}
                            />
                            <p className="text-xs text-muted-foreground">
                                Add query parameters directly to the URL (e.g., ?limit=10&page=1)
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="headers">Headers (JSON)</Label>
                                <Input
                                    id="headers"
                                    name="headers"
                                    placeholder='{"Authorization": "Bearer token"}'
                                    value={form.headers}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payload">Payload (JSON)</Label>
                                <Input
                                    id="payload"
                                    name="payload"
                                    placeholder='{"key": "value"}'
                                    value={form.payload}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe what this API does..."
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>
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
