"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Badge } from "@/components/ui/badge";
import { Send, Plus, Copy, Trash2, Code, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ---------------------
// Parameters Table (UI Only)
// ---------------------
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

// ---------------------
// Form Schema & Types
// ---------------------
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  url: z.string().url("Invalid URL"),
  headers: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Headers must be a valid JSON object"),
  payload: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, "Payload must be a valid JSON object"),
  // You can add additional fields for auth or params if needed.
});

type FormValues = z.infer<typeof formSchema>;

// ---------------------
// Colors for HTTP Methods
// ---------------------
const methodColors: { [key: string]: string } = {
  GET: "text-green-600",
  POST: "text-blue-600",
  PUT: "text-yellow-600",
  DELETE: "text-red-600",
  PATCH: "text-purple-600",
};

// ---------------------
// Main Form Component
// ---------------------
export function ApiRequestForm() {
  const { data: session } = useSession();
  const userID = session?.user._id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      method: "GET",
      url: "",
      headers: "{}",
      payload: "{}",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/submit/user-api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          user_id: userID,
        }),
      });

      const ResponseData = await response.json();
      if (ResponseData.success) {
        toast.success("API request submitted successfully!");
        router.push("/dashboard/all-apis");
      } else {
        toast.error("Failed to submit API request!");
      }
    } catch (error) {
      console.error("Error submitting API request:", error);
      toast.error("Unable to submit the request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-xl">New Request</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Request Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>
                    A descriptive name for your API request.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter request name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL and Method */}
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue
                          className={
                            methodColors[
                              field.value as keyof typeof methodColors
                            ]
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(methodColors).map(([m, color]) => (
                          <SelectItem key={m} value={m} className={color}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="Enter request URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tabs for additional fields */}
            <Tabs defaultValue="params" className="w-full">
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
                {/* <TabsTrigger
                  value="auth"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                >
                  Authorization
                </TabsTrigger> */}
                <TabsTrigger
                  value="params"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                >
                  Params
                </TabsTrigger>
              </TabsList>

              <TabsContent value="headers" className="mt-4">
                <FormField
                  control={form.control}
                  name="headers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headers</FormLabel>
                      <FormDescription>
                        Enter headers as a JSON object.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder='{"Content-Type": "application/json"}'
                          className="font-mono h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="body" className="mt-4">
                <FormField
                  control={form.control}
                  name="payload"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormDescription>
                        Enter request body as a JSON object.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder='{"key": "value"}'
                          className="font-mono h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="params" className="mt-4">
                <ParamsTable
                  onParamsChange={(queryString) => {
                    // Currently not integrated into form state.
                  }}
                />
              </TabsContent>

              {/* <TabsContent value="auth" className="mt-4">
                <div className="space-y-4">
                  <FormLabel>Authorization</FormLabel>
                  <Select defaultValue="none">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Auth Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Auth</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent> */}
            </Tabs>
            <Button type="submit" disabled={isLoading} className="w-fit">
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
