import { Copy, Link2, Maximize2, RotateCcw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ResponsePanel() {
  return (
    <div className="flex flex-col border-t">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-4">
          <span className="text-sm text-red-500">401 Unauthorized</span>
          <span className="text-sm text-muted-foreground">1360 ms</span>
          <span className="text-sm text-muted-foreground">199 B</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Save Response
          </Button>
          <Button variant="ghost" size="sm">
            <Link2 className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button variant="ghost" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="body" className="flex-1">
        <div className="flex items-center justify-between border-b px-2">
          <TabsList className="h-9">
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="cookies">Cookies</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="test-results">Test Results</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <TabsContent value="body" className="border-none p-0">
          <Tabs defaultValue="pretty" className="flex-1">
            <TabsList className="h-9">
              <TabsTrigger value="pretty">Pretty</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="visualize">Visualize</TabsTrigger>
            </TabsList>
            <TabsContent value="pretty" className="border-none p-4">
              <pre className="text-sm">
                {JSON.stringify(
                  {
                    error: "Unauthorized",
                    message: "Invalid API key",
                  },
                  null,
                  2
                )}
              </pre>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}

