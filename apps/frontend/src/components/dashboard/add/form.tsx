"use client";

import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSaveUserAPI } from "@/hooks/use-user-apis";
import { FormValues } from "@/types/api.type";

interface ParamsTableProps {
    onParamsChange: (queryString: string) => void;
}

const ParamsTable = ({ onParamsChange }: ParamsTableProps) => {
    const [params, setParams] = useState([
        { id: 1, key: "", value: "", enabled: true },
    ]);

    const updateParam = (id: number, field: string, value: any) => {
        setParams((prev) => {
            const updated = prev.map((param) =>
                param.id === id ? { ...param, [field]: value } : param
            );

            // Add a new row if the last row has a key or value
            if (
                updated[updated.length - 1].key ||
                updated[updated.length - 1].value
            ) {
                updated.push({
                    id: updated.length + 1,
                    key: "",
                    value: "",
                    enabled: true,
                });
            }

            // Remove empty rows except the last one
            const filtered = updated.filter(
                (param, index) =>
                    param.key || param.value || index === updated.length - 1
            );

            return filtered;
        });
    };

    const deleteParam = (id: number) => {
        setParams((prev) => prev.filter((param) => param.id !== id));
    };

    useEffect(() => {
        const queryString = params
            .filter((param) => param.enabled && param.key)
            .map(
                (param) =>
                    `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
            )
            .join("&");

        onParamsChange(queryString);
    }, [params, onParamsChange]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setParams([
                                ...params,
                                { id: params.length + 1, key: "", value: "", enabled: true },
                            ])
                        }
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Parameter
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={() =>
                        setParams([{ id: 1, key: "", value: "", enabled: true }])
                    }
                    type="button"
                >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-100 dark:bg-slate-800">
                            <TableHead className="w-[50px]">Status</TableHead>
                            <TableHead>Key</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-[50px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {params.map((param, index) => (
                            <TableRow key={param.id}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={param.enabled}
                                        onChange={(e) =>
                                            updateParam(param.id, "enabled", e.target.checked)
                                        }
                                        className="rounded border-gray-300"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={param.key}
                                        onChange={(e) =>
                                            updateParam(param.id, "key", e.target.value)
                                        }
                                        placeholder="Parameter key"
                                        className="border-0 focus-visible:ring-0"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={param.value}
                                        onChange={(e) =>
                                            updateParam(param.id, "value", e.target.value)
                                        }
                                        placeholder="Parameter value"
                                        className="border-0 focus-visible:ring-0"
                                    />
                                </TableCell>
                                <TableCell>
                                    {params.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 h-8 w-8 p-0"
                                            onClick={() => deleteParam(param.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

// Colors for the method select options
const methodColors: { [key: string]: string } = {
    GET: "text-green-600",
    POST: "text-blue-600",
    PUT: "text-yellow-600",
    DELETE: "text-red-600",
    PATCH: "text-purple-600",
};

// Zod schema for validating API request data
const apiRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
    url: z.url("Enter a valid URL"),
    headers: z.string().optional(),
    payload: z.string().optional(),
    params: z.string().optional(),
    description: z.string().min(1, "Description is required"),
});

// Main Form Component
export function ApiRequestForm() {
    const {
        data: session,
    } = authClient.useSession()
    const userId = session?.user?.id;
    const router = useRouter();
    const { saveUserAPI, data, error, isSaving: isLoading } = useSaveUserAPI();
    const [activeTab, setActiveTab] = useState("body");

    const INITIAL_FORM_VALUES: FormValues = {
        name: "",
        method: "GET",
        url: "",
        headers: "",
        payload: "",
        params: "",
        description: "",
    };

    // Form state
    const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate user authentication
        if (!userId) {
            toast.error("You must be logged in to save API requests.");
            return;
        }

        // Validate form data
        const validationResult = apiRequestSchema.safeParse(formValues);
        if (!validationResult.success) {
            toast.error("Please check your form data - some fields are invalid.");
            return;
        }

        try {
            // Save the API request
            await saveUserAPI({
                user_id: userId,
                ...validationResult.data,
            });

            // Handle response
            if (data?.success) {
                console.log("API saved successfully:", data);
                toast.success(data?.message || "API request saved successfully!");
                const apiID = data.api.ID;
                router.push(`/dashboard/apis/${apiID}`);
                setFormValues(INITIAL_FORM_VALUES); // Reset form on success
            } else if (error || data?.success === false || data?.error) {
                console.error("Error saving API:", error);
                toast.error(data?.message || "Failed to save API request.");
            }

        } catch (saveError: any) {
            console.error("Error saving API:", saveError);
            toast.error(saveError?.message || "Failed to save API request.");
        }
    };


    // ParamsTable integration (memoized to prevent infinite loop)
    const handleParamsChange = useCallback((queryString: string) => {
        setFormValues((prev) => ({ ...prev, params: queryString }));
    }, []);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    // Handle select changes
    const handleSelectChange = (value: string) => {
        setFormValues((prev) => ({ ...prev, method: value as FormValues["method"] }));
    };


    return (
        <Card className="w-full backdrop-blur-xl bg-sky-200/40 dark:bg-black/40">
            <CardHeader className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl">New Request</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium mb-1" htmlFor="name">
                            Name
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter request name"
                            value={formValues.name}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            A descriptive name for your API request.
                        </p>
                    </div>



                    <div className="flex items-center space-x-2">
                        <div>
                            <label className="block font-medium mb-1" htmlFor="method">
                                Method
                            </label>
                            <Select value={formValues.method} onValueChange={handleSelectChange}>
                                <SelectTrigger
                                    className={`w-[120px] ${methodColors[formValues.method]}`}
                                >
                                    <SelectValue placeholder={formValues.method} />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(methodColors).map(([m, color]) => (
                                        <SelectItem key={m} value={m} className={color}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-grow">
                            <label className="block font-medium mb-1" htmlFor="url">
                                URL
                            </label>
                            <Input
                                id="url"
                                name="url"
                                placeholder="Enter request URL"
                                value={formValues.url}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1" htmlFor="description">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Enter request description"
                            value={formValues.description}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-muted-foreground">
                            Describe what this API request does.
                        </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                            <TabsTrigger
                                value="headers"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                            >
                                Headers
                            </TabsTrigger>
                            <TabsTrigger
                                value="body"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                            >
                                Body
                            </TabsTrigger>
                            <TabsTrigger
                                value="params"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                            >
                                Params
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="headers" className="mt-4">
                            <label className="block font-medium mb-1" htmlFor="headers">
                                Headers
                            </label>
                            <Textarea
                                id="headers"
                                name="headers"
                                placeholder='{"Content-Type": "application/json"}'
                                className="font-mono h-[120px]"
                                value={formValues.headers}
                                onChange={handleChange}
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter headers as a JSON object.
                            </p>
                        </TabsContent>

                        <TabsContent value="body" className="mt-4">
                            <label className="block font-medium mb-1" htmlFor="payload">
                                Body
                            </label>
                            <Textarea
                                id="payload"
                                name="payload"
                                placeholder='{"key": "value"}'
                                className="font-mono h-[120px]"
                                value={formValues.payload}
                                onChange={handleChange}
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter request body as a JSON object.
                            </p>
                        </TabsContent>

                        <TabsContent value="params" className="mt-4">
                            <ParamsTable onParamsChange={handleParamsChange} />
                        </TabsContent>
                    </Tabs>
                    <Button type="submit" disabled={isLoading} className="w-fit">
                        {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}