"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, User, Eye, Share2 } from "lucide-react"

export function RetailerStudioHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 glass-card">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Breadcrumbs and page info */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
        </div>

        {/* Right side - Search and actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products, orders..." className="pl-10 w-64 bg-background/50" />
          </div>

          {/* Quick Actions */}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview Store
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-secondary">3</Badge>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm" className="gap-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">John's Store</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
