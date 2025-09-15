"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StorefrontPreview } from "./storefront-preview"
import { StorefrontKPIs } from "./storefront-kpis"
import { ProductShowcase } from "./product-showcase"
import { CustomerInsights } from "./customer-insights"
import { StorefrontCustomization } from "./storefront-customization"
import { Monitor, Tablet, Smartphone, Users, Eye, Palette, Share2, ExternalLink } from "lucide-react"

export function StorefrontManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Storefront Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your store appearance, track performance, and engage with customers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            23 visitors online
          </Badge>

          <Button variant="outline" className="gap-2 bg-transparent">
            <ExternalLink className="h-4 w-4" />
            View as Customer
          </Button>

          <Button className="gap-2 btn-studio-primary">
            <Share2 className="h-4 w-4" />
            Share Store
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="overview" className="gap-2">
            <Eye className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Monitor className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <Users className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="customization" className="gap-2">
            <Palette className="h-4 w-4" />
            Customize
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Preview */}
            <div className="lg:col-span-2">
              <Card className="studio-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Live Store Preview</CardTitle>
                      <CardDescription>See how your store appears to customers</CardDescription>
                    </div>

                    {/* Device Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                      <Button
                        variant={previewDevice === "desktop" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setPreviewDevice("desktop")}
                        className="h-8 w-8 p-0"
                      >
                        <Monitor className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewDevice === "tablet" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setPreviewDevice("tablet")}
                        className="h-8 w-8 p-0"
                      >
                        <Tablet className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewDevice === "mobile" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setPreviewDevice("mobile")}
                        className="h-8 w-8 p-0"
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <StorefrontPreview device={previewDevice} />
                </CardContent>
              </Card>
            </div>

            {/* Customer Insights */}
            <div>
              <CustomerInsights />
            </div>
          </div>

          {/* KPIs and Product Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProductShowcase />
            </div>
            <div>
              <StorefrontKPIs />
            </div>
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview">
          <Card className="studio-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading">Full Store Preview</CardTitle>
                  <CardDescription>Interactive preview of your complete storefront</CardDescription>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                    <Button
                      variant={previewDevice === "desktop" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice("desktop")}
                      className="gap-2"
                    >
                      <Monitor className="h-4 w-4" />
                      Desktop
                    </Button>
                    <Button
                      variant={previewDevice === "tablet" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice("tablet")}
                      className="gap-2"
                    >
                      <Tablet className="h-4 w-4" />
                      Tablet
                    </Button>
                    <Button
                      variant={previewDevice === "mobile" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice("mobile")}
                      className="gap-2"
                    >
                      <Smartphone className="h-4 w-4" />
                      Mobile
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <StorefrontPreview device={previewDevice} fullHeight />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StorefrontKPIs detailed />
            <CustomerInsights detailed />
          </div>
        </TabsContent>

        {/* Customization Tab */}
        <TabsContent value="customization">
          <StorefrontCustomization />
        </TabsContent>
      </Tabs>
    </div>
  )
}
