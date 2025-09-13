"use client"

import { useState } from "react";
import { TestCase, NewTestCase } from "@/types/test-case.type";
import { useAddTestCase, useDeleteTestCase, useUpdateTestCase } from "@/hooks/use-test-cases";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Plus, Trash, Pencil } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Add Test Case Button
export function AddTestCaseButton({ apiId }: { apiId: string }) {
    const [form, setForm] = useState<Partial<NewTestCase>>({});
    const [isOpen, setIsOpen] = useState(false);
    const { addTestCase, isAdding, error } = useAddTestCase();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleMethodChange = (value: string) => {
        setForm({ ...form, method: value as TestCase["method"] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.method || !form.url || !form.expected_outcome) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const payload: NewTestCase = {
            name: form.name,
            method: form.method,
            url: form.url,
            expected_outcome: Number(form.expected_outcome),
            api_id: apiId,
            created_by: "user",
            headers: form.headers,
            payload: form.payload,
            description: form.description,
        };

        try {
            await addTestCase({ test_cases: [payload] });
            toast.success("Test case added successfully");
            setForm({});
        } catch (error) {
            toast.error("Error adding test case");
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
                    <Plus className="h-4 w-4" />
                    Add Test Case
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Test Case</DialogTitle>
                </DialogHeader>
                <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Test Case Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter test case name"
                                    value={form.name || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-row justify-between gap-4 items-center">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="expected_outcome">Expected Status Code</Label>
                                    <Input
                                        id="expected_outcome"
                                        name="expected_outcome"
                                        placeholder="200"
                                        type="number"
                                        min="100"
                                        max="599"
                                        value={form.expected_outcome?.toString() || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <Label htmlFor="method">HTTP Method</Label>
                                    <Select value={form.method || ""} onValueChange={handleMethodChange}>
                                        <SelectTrigger className="w-full py-[19px] mt-1">
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="GET"><span className="font-mono">GET</span></SelectItem>
                                            <SelectItem value="POST"><span className="font-mono">POST</span></SelectItem>
                                            <SelectItem value="PUT"><span className="font-mono">PUT</span></SelectItem>
                                            <SelectItem value="DELETE"><span className="font-mono">DELETE</span></SelectItem>
                                            <SelectItem value="PATCH"><span className="font-mono">PATCH</span></SelectItem>
                                            <SelectItem value="OPTIONS"><span className="font-mono">OPTIONS</span></SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="url">Test URL</Label>
                                <Input
                                    id="url"
                                    name="url"
                                    placeholder="https://api.example.com/endpoint?param=value"
                                    value={form.url || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Include query parameters directly in the URL
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="headers">Headers (JSON)</Label>
                                    <Textarea
                                        id="headers"
                                        name="headers"
                                        placeholder='{"Authorization": "Bearer token"}'
                                        value={form.headers || ""}
                                        onChange={handleChange}
                                        rows={3}
                                        className="resize-none max-h-32"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="payload">Payload (JSON)</Label>
                                    <Textarea
                                        id="payload"
                                        name="payload"
                                        placeholder='{"key": "value"}'
                                        value={form.payload || ""}
                                        onChange={handleChange}
                                        rows={3}
                                        className="resize-none max-h-32"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe what this test case validates..."
                                    value={form.description || ""}
                                    onChange={handleChange}
                                    rows={2}
                                    className="resize-none max-h-24"
                                />
                            </div>

                            {error && (
                                <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                                    {error.message || "Error adding test case"}
                                </div>
                            )}

                            <DialogFooter>
                                <Button type="submit" disabled={isAdding}>
                                    {isAdding ? "Saving..." : "Save Test Case"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

// Delete Test Case Button
export function DeleteTestCaseButton({ testCaseId }: { testCaseId: string }) {
    const { deleteTestCase, isDeleting, error } = useDeleteTestCase();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTestCase({ _id: testCaseId });
            toast.success("Test case deleted successfully");
        } catch (err) {
            toast.error("Error deleting test case: " + (err as Error).message);
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="destructiveGhost" size={"icon"} onClick={() => setIsOpen(!isOpen)}>
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Test Case</DialogTitle>
                </DialogHeader>
                <div>Are you sure you want to delete this test case?</div>
                {error && <div className="text-red-500">{error.message || "Error deleting test case"}</div>}
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>Confirm Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Edit Test Case Button
export function EditTestCaseButton({ testCase }: { testCase: TestCase }) {
    const [form, setForm] = useState<Partial<TestCase>>(testCase);
    const [isOpen, setIsOpen] = useState(false);
    const { updateTestCase, isUpdating, error } = useUpdateTestCase();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleMethodChange = (value: string) => {
        setForm({ ...form, method: value as TestCase["method"] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateTestCase({
                _id: testCase._id,
                test_case: {
                    ...form, expected_outcome: Number(form.expected_outcome)
                } as TestCase
            });
            toast.success("Test case updated successfully");
        } catch (err) {
            toast.error("Error updating test case: " + (err as Error).message);
        } finally {
            // Reset form state
            setForm({});
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"} onClick={() => setIsOpen(!isOpen)}>
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Test Case</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Test Case Name</Label>
                                <Input
                                    id="edit-name"
                                    name="name"
                                    placeholder="Enter test case name"
                                    value={form.name || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-row justify-between gap-4 items-center">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="edit-expected_outcome">Expected Status Code</Label>
                                    <Input
                                        id="edit-expected_outcome"
                                        name="expected_outcome"
                                        placeholder="200"
                                        type="number"
                                        min="100"
                                        max="599"
                                        value={form.expected_outcome?.toString() || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="edit-method">HTTP Method</Label>
                                    <Select value={form.method || ""} onValueChange={handleMethodChange}>
                                        <SelectTrigger className="w-full py-[19px] mt-1">
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="GET"><span className="font-mono">GET</span></SelectItem>
                                            <SelectItem value="POST"><span className="font-mono">POST</span></SelectItem>
                                            <SelectItem value="PUT"><span className="font-mono">PUT</span></SelectItem>
                                            <SelectItem value="DELETE"><span className="font-mono">DELETE</span></SelectItem>
                                            <SelectItem value="PATCH"><span className="font-mono">PATCH</span></SelectItem>
                                            <SelectItem value="OPTIONS"><span className="font-mono">OPTIONS</span></SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-url">Test URL</Label>
                                <Input
                                    id="edit-url"
                                    name="url"
                                    placeholder="https://api.example.com/endpoint?param=value"
                                    value={form.url || ""}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Include query parameters directly in the URL
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-headers">Headers (JSON)</Label>
                                    <Textarea
                                        id="edit-headers"
                                        name="headers"
                                        placeholder='{"Authorization": "Bearer token"}'
                                        value={form.headers || ""}
                                        onChange={handleChange}
                                        rows={3}
                                        className="resize-none max-h-32"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-payload">Payload (JSON)</Label>
                                    <Textarea
                                        id="edit-payload"
                                        name="payload"
                                        placeholder='{"key": "value"}'
                                        value={form.payload || ""}
                                        onChange={handleChange}
                                        rows={3}
                                        className="resize-none max-h-32"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    name="description"
                                    placeholder="Describe what this test case validates..."
                                    value={form.description || ""}
                                    onChange={handleChange}
                                    rows={2}
                                    className="resize-none max-h-24"
                                />
                            </div>

                            {error && (
                                <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                                    {error.message || "Error updating test case"}
                                </div>
                            )}

                            <DialogFooter>
                                <Button type="submit" disabled={isUpdating}>
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
