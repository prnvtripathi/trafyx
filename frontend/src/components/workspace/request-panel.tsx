"use client";

import { ChevronDown, Save, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ParamsTableProps {
  onParamsChange: (queryString: string) => void;
}

function ParamsTable({ onParamsChange }: ParamsTableProps) {
  const [params, setParams] = useState([{ id: 1, key: "", value: "", checked: false }]);

  useEffect(() => {
    const queryString = params
      .filter((param) => param.key && param.value)
      .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
      .join("&");
    onParamsChange(queryString);
  }, [params, onParamsChange]);

  const updateParam = (id: number, field: string, value: string) => {
    setParams((prev) =>
      prev.map((param) => (param.id === id ? { ...param, [field]: value } : param))
    );
    if (id === params.length) {
      setParams((prev) => [
        ...prev,
        { id: prev.length + 1, key: "", value: "", checked: false },
      ]);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {params.map((param) => (
          <TableRow key={param.id}>
            <TableCell>
              <Input
                value={param.key}
                onChange={(e) => updateParam(param.id, "key", e.target.value)}
                placeholder="Key"
              />
            </TableCell>
            <TableCell>
              <Input
                value={param.value}
                onChange={(e) => updateParam(param.id, "value", e.target.value)}
                placeholder="Value"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function RequestPanel() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [payload, setPayload] = useState("");
  const [description, setDescription] = useState("");
  const [queryParams, setQueryParams] = useState("");

  const sendRequest = async () => {
    try {
      const requestBody = {
        UserID: "66d5ba3f255ac668fe885432", // Example UserID
        name: "API Request", // Name can be updated dynamically
        method,
        url: `${url}${queryParams ? `?${queryParams}` : ""}`,
        headers,
        payload,
        description,
      };

      const response = await fetch("/api/userApis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Select defaultValue={method} onValueChange={(value) => setMethod(value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter request URL"
        />
        <Button onClick={sendRequest}>
          Send
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Tabs defaultValue="params">
        <TabsList>
          <TabsTrigger value="params">Params</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
        </TabsList>
        <TabsContent value="params">
          <ParamsTable onParamsChange={setQueryParams} />
        </TabsContent>
        <TabsContent value="headers">
          <Textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Content-Type": "application/json"}'
          />
        </TabsContent>
        <TabsContent value="body">
          <Textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder="Enter request body"
          />
        </TabsContent>
      </Tabs>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter API description"
      />
    </div>
  );
}
