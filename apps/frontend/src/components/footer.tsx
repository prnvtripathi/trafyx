import { Bot, Cookie, Laptop, Play, Terminal } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t px-4 py-2">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <Bot className="mr-2 h-4 w-4" />
          Postbot
        </Button>
        <Button variant="ghost" size="sm">
          <Play className="mr-2 h-4 w-4" />
          Runner
        </Button>
        <Button variant="ghost" size="sm">
          <Terminal className="mr-2 h-4 w-4" />
          Console
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="#" className="text-sm text-muted-foreground hover:underline">
          Online
        </Link>
        <Button variant="ghost" size="sm">
          <Laptop className="mr-2 h-4 w-4" />
          Auto-select agent
        </Button>
        <Button variant="ghost" size="sm">
          <Cookie className="mr-2 h-4 w-4" />
          Cookies
        </Button>
      </div>
    </footer>
  )
}

