"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  Eye,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  BarChart3,
  Activity,
} from "lucide-react"

const kpiData = [
  {
    title: "Visitors Today",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "Unique visitors in the last 24 hours",
  },
  {
    title: "Products Viewed",
    value: "8,392",
    change: "+8.2%",
    trend: "up",
    icon: Eye,
    description: "Total product page views",
  },
  {
    title: "Products Sold",
    value: "156",
    change: "+23.1%",
    trend: "up",
    icon: Package,
    description: "Items sold today",
  },
  {
    title: "Revenue Generated",
    value: "K 45,280",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    description: "Total revenue this month",
  },
]

const recentActivity = [
  {
    type: "sale",
    message: "New order #1234 - Handcrafted Bag",
    time: "2 minutes ago",
    amount: "K 450",
  },
  {
    type: "view",
    message: "5 customers viewed your Organic Soap",
    time: "5 minutes ago",
  },
  {
    type: "promotion",
    message: "Flash Sale promotion started",
    time: "1 hour ago",
  },
  {
    type: "message",
    message: "New message from Sarah M.",
    time: "2 hours ago",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          const TrendIcon = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight

          return (
            <Card key={kpi.title} className="studio-card group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold font-heading text-foreground">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendIcon className="h-4 w-4" />
                    {kpi.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Performance Chart */}
        <Card className="lg:col-span-2 studio-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-heading">Store Performance</CardTitle>
                <CardDescription>Sales and visitor trends over the last 30 days</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <BarChart3 className="h-4 w-4" />
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Chart visualization will be implemented</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="studio-card">
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "sale"
                      ? "bg-green-500"
                      : activity.type === "view"
                        ? "bg-blue-500"
                        : activity.type === "promotion"
                          ? "bg-orange-500"
                          : "bg-purple-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    {activity.amount && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.amount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="studio-card cursor-pointer hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-heading font-semibold">Add Product</h3>
            <p className="text-sm text-muted-foreground mt-1">List a new item in your store</p>
          </CardContent>
        </Card>

        <Card className="studio-card cursor-pointer hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-2" />
            <h3 className="font-heading font-semibold">Create Promotion</h3>
            <p className="text-sm text-muted-foreground mt-1">Boost sales with discounts</p>
          </CardContent>
        </Card>

        <Card className="studio-card cursor-pointer hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-heading font-semibold">Preview Store</h3>
            <p className="text-sm text-muted-foreground mt-1">See how customers view your store</p>
          </CardContent>
        </Card>

        <Card className="studio-card cursor-pointer hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-secondary mx-auto mb-2" />
            <h3 className="font-heading font-semibold">View Analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">Deep dive into your metrics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
