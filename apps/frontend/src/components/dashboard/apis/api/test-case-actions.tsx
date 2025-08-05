"use client"

import { useState } from "react";
import { TestCase, NewTestCase } from "@/types/test-case.type";
import { useAddTestCase, useDeleteTestCase, useUpdateTestCase } from "@/hooks/use-test-cases";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Test Case</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} />
                    <Select value={form.method || ""} onValueChange={handleMethodChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Method (GET, POST, etc)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                            <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input name="url" placeholder="URL" value={form.url || ""} onChange={handleChange} />
                    <Input name="expected_outcome" placeholder="Expected Outcome (status code)" type="number" value={form.expected_outcome?.toString() || ""} onChange={handleChange} />
                    <Textarea name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} />
                    <Textarea name="headers" placeholder="Headers (JSON)" value={form.headers || ""} onChange={handleChange} />
                    <Textarea name="payload" placeholder="Payload (JSON)" value={form.payload || ""} onChange={handleChange} />
                    {error && <div className="text-red-500">{error.message || "Error adding test case"}</div>}
                    <DialogFooter>
                        <Button type="submit" disabled={isAdding}>Save</Button>
                    </DialogFooter>
                </form>
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Test Case</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Input name="name" value={form.name || ""} placeholder="Name" onChange={handleChange} />
                    <Select value={form.method || ""} onValueChange={handleMethodChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                            <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input name="url" value={form.url || ""} placeholder="URL" onChange={handleChange} />
                    <Input name="expected_outcome" value={form.expected_outcome?.toString() || ""} placeholder="Expected Outcome" type="number" onChange={handleChange} />
                    <Textarea name="description" value={form.description || ""} placeholder="Description" onChange={handleChange} />
                    <Textarea name="headers" value={form.headers || ""} placeholder="Headers (JSON)" onChange={handleChange} />
                    <Textarea name="payload" value={form.payload || ""} placeholder="Payload (JSON)" onChange={handleChange} />
                    {error && <div className="text-red-500">{error.message || "Error updating test case"}</div>}
                    <DialogFooter>
                        <Button type="submit" disabled={isUpdating}>Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
