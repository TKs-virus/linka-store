"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { RetailerStudioSidebar } from "./retailer-studio-sidebar"
import { RetailerStudioHeader } from "./retailer-studio-header"

interface RetailerStudioLayoutProps {
  children: React.ReactNode
}

export function RetailerStudioLayout({ children }: RetailerStudioLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <RetailerStudioSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Main Content Area */}
        <div
          className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "ml-16" : "ml-64",
          )}
        >
          {/* Header */}
          <RetailerStudioHeader />

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
