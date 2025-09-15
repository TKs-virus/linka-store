"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { PromotionsOverview } from "./promotions-overview"
import { PromotionBuilder } from "./promotion-builder"
import { PromotionAnalytics } from "./promotion-analytics"
import { Plus, Search, Filter, TrendingUp, Calendar, Zap } from "lucide-react"

export function PromotionsManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showBuilder, setShowBuilder] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  if (showBuilder) {
    return <PromotionBuilder onClose={() => setShowBuilder(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Promotions & Campaigns</h1>
          <p className="text-muted-foreground mt-1">Create powerful promotions to boost sales and engage customers</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-2">
            <TrendingUp className="h-3 w-3" />3 Active Campaigns
          </Badge>

          <Button onClick={() => setShowBuilder(true)} className="gap-2 btn-studio-primary animate-pulse-orange">
            <Plus className="h-4 w-4" />
            Create Promotion
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <Calendar className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <Zap className="h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search promotions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-background/50"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="overview">
          <PromotionsOverview searchQuery={searchQuery} onCreateNew={() => setShowBuilder(true)} />
        </TabsContent>

        <TabsContent value="analytics">
          <PromotionAnalytics />
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Flash Sale",
                description: "Limited time discount on selected products",
                discount: "Up to 50% off",
                duration: "24 hours",
                color: "bg-red-500",
              },
              {
                title: "Buy One Get One",
                description: "BOGO offer to increase order value",
                discount: "BOGO Free",
                duration: "1 week",
                color: "bg-green-500",
              },
              {
                title: "Free Delivery",
                description: "Free shipping on orders above threshold",
                discount: "Free shipping",
                duration: "Ongoing",
                color: "bg-blue-500",
              },
              {
                title: "New Customer",
                description: "Welcome discount for first-time buyers",
                discount: "20% off",
                duration: "Ongoing",
                color: "bg-purple-500",
              },
              {
                title: "Bulk Discount",
                description: "Tiered discounts for quantity purchases",
                discount: "5-15% off",
                duration: "1 month",
                color: "bg-orange-500",
              },
              {
                title: "Seasonal Sale",
                description: "Holiday and seasonal promotions",
                discount: "30% off",
                duration: "2 weeks",
                color: "bg-pink-500",
              },
            ].map((template, index) => (
              <Card key={index} className="studio-card cursor-pointer hover:shadow-lg transition-all group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${template.color}`} />
                    <CardTitle className="font-heading text-lg">{template.title}</CardTitle>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Discount:</span>
                      <span className="font-medium text-primary">{template.discount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{template.duration}</span>
                    </div>
                    <Button
                      className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setShowBuilder(true)}
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
