import { ChevronDown, Save, Share } from 'lucide-react'
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

function ParamsTable() {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left font-medium">Key</th>
            <th className="p-2 text-left font-medium">Value</th>
            <th className="p-2 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">
              <Input className="h-8" placeholder="Key" />
            </td>
            <td className="p-2">
              <Input className="h-8" placeholder="Value" />
            </td>
            <td className="p-2">
              <Input className="h-8" placeholder="Description" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function RequestPanel() {
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
          defaultValue="https://api.example.com/v1/endpoint"
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
          <TabsTrigger value="authorization">Authorization</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
          <TabsTrigger value="scripts">Scripts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="params" className="border-none p-0 pt-4">
          <ParamsTable />
        </TabsContent>
        <TabsContent value="authorization" className="border-none p-0 pt-4">
          <ParamsTable />
        </TabsContent>
        <TabsContent value="headers" className="border-none p-0 pt-4">
          <ParamsTable />
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
                <RadioGroupItem value="x-www-form-urlencoded" id="x-www-form-urlencoded" />
                <Label htmlFor="x-www-form-urlencoded">x-www-form-urlencoded</Label>
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
            <ParamsTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

