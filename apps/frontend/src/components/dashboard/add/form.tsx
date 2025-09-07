"use client";

import { useState } from "react";
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
import { useSaveUserAPI } from "@/hooks/use-user-apis";
import { FormValues } from "@/types/api.type";

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
    description: z.string().min(1, "Description is required"),
});

// Main Form Component
export function ApiRequestForm() {
    const {
        data: session,
    } = authClient.useSession()
    const userId = session?.user?.id;
    const router = useRouter();
    const { saveUserAPI, isSaving: isLoading } = useSaveUserAPI();
    const [activeTab, setActiveTab] = useState("body");

    const INITIAL_FORM_VALUES: FormValues = {
        name: "",
        method: "GET",
        url: "",
        headers: "",
        payload: "",
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
            // Save the API request and wait for the response
            const response = await saveUserAPI({
                user_id: userId,
                ...validationResult.data,
            });

            if (response?.success) {
                toast.success(response?.message || "API request saved successfully!");
                const apiId = response?.api?.id;
                router.push(`/dashboard/apis/${apiId}`);
                setFormValues(INITIAL_FORM_VALUES); // Reset form on success
            } else {
                console.error("Error in response:", response);
                toast.error(response?.message || "Failed to save API request.");
            }

        } catch (saveError: any) {
            console.error("Error saving API:", saveError);
            toast.error(saveError?.message || "Failed to save API request.");
        }
    };

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
        <Card className="w-full max-w-4xl mx-auto my-8">
            <CardHeader className="border-b">
                <CardTitle className="text-lg">New Request</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2 space-y-6">
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
                                <span className="text-xs text-muted-foreground ml-2">
                                    Include query parameters directly in the URL (e.g., https://api.example.com/users?limit=10&page=1)
                                </span>
                            </label>
                            <Input
                                id="url"
                                name="url"
                                placeholder="Enter request URL (include query parameters directly in the URL)"
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
                        </TabsList>

                        <TabsContent value="headers" className="mt-4">
                            <label className="block font-medium mb-1" htmlFor="headers">
                                Headers
                                <span className="text-xs text-muted-foreground ml-2">
                                    Include any custom headers as a JSON object.
                                </span>
                            </label>
                            <Textarea
                                id="headers"
                                name="headers"
                                placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                                className="font-mono h-[120px]"
                                value={formValues.headers}
                                onChange={handleChange}
                            />
                        </TabsContent>

                        <TabsContent value="body" className="mt-4">
                            <label className="block font-medium mb-1" htmlFor="payload">
                                Body
                                <span className="text-xs text-muted-foreground ml-2">
                                    Include the request payload as a JSON object.
                                </span>
                            </label>
                            <Textarea
                                id="payload"
                                name="payload"
                                placeholder='{"key": "value"}'
                                className="font-mono h-[120px]"
                                value={formValues.payload}
                                onChange={handleChange}
                            />
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