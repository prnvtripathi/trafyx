"use client";
import { ChevronDown, Save, Share, HelpCircle, Trash2 } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParamsTableProps {
  onParamsChange: (queryString: string) => void;
}

function ParamsTable({ onParamsChange }: ParamsTableProps) {
  const [params, setParams] = useState([
    { id: 1, checked: false, key: "", value: "", description: "" },
    { id: 2, checked: false, key: "", value: "", description: "" },
    { id: 3, checked: false, key: "", value: "", description: "" },
  ]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const queryString = params
      .filter((param) => param.key && param.value)
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
      )
      .join("&");
    onParamsChange(queryString);
  }, [params, onParamsChange]);

  const toggleAll = (checked: boolean) => {
    setAllChecked(checked);
    setParams(params.map((param) => ({ ...param, checked })));
  };

  const toggleParam = (id: number, checked: boolean) => {
    setParams(
      params.map((param) => (param.id === id ? { ...param, checked } : param))
    );
    setAllChecked(params.every((param) => param.checked));
  };

  const updateParam = (id: number, field: string, value: string) => {
    setParams(
      params.map((param) =>
        param.id === id ? { ...param, [field]: value } : param
      )
    );
    if (
      id === params[params.length - 1].id &&
      (field === "key" || field === "value") &&
      value !== ""
    ) {
      addParam();
    }
  };

  const addParam = () => {
    setParams([
      ...params,
      {
        id: params.length + 1,
        checked: false,
        key: "",
        value: "",
        description: "",
      },
    ]);
  };

  const deleteParam = (id: number) => {
    setParams(params.filter((param) => param.id !== id));
  };

  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[50px] border-r">
            <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
          </TableHead>
          <TableHead className="border-r">Key</TableHead>
          <TableHead className="border-r">Value</TableHead>
          <TableHead className="border-r">
            Description
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 ml-1 inline" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This description if for internal understanding and is not sent to the API via HTTP requests</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {params.map((param) => (
          <TableRow key={param.id} className="border-b">
            <TableCell className="border-r">
              <Checkbox
                checked={param.checked}
                onCheckedChange={(checked) =>
                  toggleParam(param.id, checked === true)
                }
              />
            </TableCell>
            <TableCell className="border-r">
              <Input
                value={param.key}
                onChange={(e) => updateParam(param.id, "key", e.target.value)}
                placeholder="Key"
                className="border-0 focus:ring-0"
              />
            </TableCell>
            <TableCell className="border-r">
              <Input
                value={param.value}
                onChange={(e) => updateParam(param.id, "value", e.target.value)}
                placeholder="Value"
                className="border-0 focus:ring-0"
              />
            </TableCell>
            <TableCell className="border-r">
              <Input
                value={param.description}
                onChange={(e) =>
                  updateParam(param.id, "description", e.target.value)
                }
                placeholder="Description"
                className="border-0 focus:ring-0"
              />
            </TableCell>
            <TableCell>
              {(param.key || param.value) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteParam(param.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function RequestPanel() {
  const [url, setUrl] = useState("https://api.example.com/v1/endpoint");
  const [queryParams, setQueryParams] = useState("");

  const handleParamsChange = (newParams: string) => {
    setQueryParams(newParams);
  };

  const fullUrl = `${url}${queryParams ? `?${queryParams}` : ""}`;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Select defaultValue="GET">
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
        <Textarea
          className="h-10 min-h-0 flex-1 resize-none py-2"
          placeholder="Enter request URL"
          value={fullUrl}
          onChange={(e) => setUrl(e.target.value.split("?")[0])}
        />
        <Button variant="secondary">
          Save
          <Save className="ml-2 h-4 w-4" />
        </Button>
        <Button>
          Send
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Tabs defaultValue="params">
        <TabsList>
          <TabsTrigger value="params">Params</TabsTrigger>
          {/* <TabsTrigger value="authorization">Authorization</TabsTrigger> */}
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
          {/* <TabsTrigger value="scripts">Scripts</TabsTrigger> */}
          {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
        </TabsList>
        <TabsContent value="params" className="border-none p-0 pt-4">
          <ParamsTable onParamsChange={handleParamsChange} />
        </TabsContent>
        <TabsContent value="authorization" className="border-none p-0 pt-4">
          {/* Authorization content goes here */}
        </TabsContent>
        <TabsContent value="headers" className="border-none p-0 pt-4">
          <ParamsTable onParamsChange={handleParamsChange} />
        </TabsContent>
        <TabsContent value="body" className="border-none p-0 pt-4">
          <div className="space-y-4">
            <RadioGroup defaultValue="none" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="form-data" id="form-data" />
                <Label htmlFor="form-data">Form Data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="x-www-form-urlencoded"
                  id="x-www-form-urlencoded"
                />
                <Label htmlFor="x-www-form-urlencoded">
                  x-www-form-urlencoded
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="raw" id="raw" />
                <Label htmlFor="raw">Raw</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="binary" id="binary" />
                <Label htmlFor="binary">Binary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="graphql" id="graphql" />
                <Label htmlFor="graphql">GraphQL</Label>
              </div>
            </RadioGroup>
            <ParamsTable onParamsChange={handleParamsChange} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
