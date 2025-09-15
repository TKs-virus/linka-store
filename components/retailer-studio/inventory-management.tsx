"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryOverview } from "./inventory-overview"
import { ProductCatalog } from "./product-catalog"
import { StockAlerts } from "./stock-alerts"
import { InventoryAnalytics } from "./inventory-analytics"
import { Package, AlertTriangle, BarChart3, Grid3X3 } from "lucide-react"

export function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your products, stock levels, and inventory analytics</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-card">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="catalog" className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4" />
            Product Catalog
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Stock Alerts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <InventoryOverview />
        </TabsContent>

        <TabsContent value="catalog" className="space-y-6">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <StockAlerts />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <InventoryAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
