"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Eye, Users, ShoppingCart, Clock } from "lucide-react"

interface StorefrontKPIsProps {
  detailed?: boolean
}

const kpiData = [
  {
    title: "Store Views",
    value: "1,247",
    change: "+18.2%",
    trend: "up",
    icon: Eye,
    description: "Total store page visits today",
  },
  {
    title: "Unique Visitors",
    value: "892",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "Individual customers who visited",
  },
  {
    title: "Add to Cart",
    value: "156",
    change: "+23.1%",
    trend: "up",
    icon: ShoppingCart,
    description: "Products added to cart",
  },
  {
    title: "Avg. Time on Store",
    value: "3m 42s",
    change: "+8.7%",
    trend: "up",
    icon: Clock,
    description: "Average browsing duration",
  },
]

export function StorefrontKPIs({ detailed = false }: StorefrontKPIsProps) {
  if (detailed) {
    return (
      <div className="space-y-4">
        <Card className="studio-card">
          <CardHeader>
            <CardTitle className="font-heading">Store Performance</CardTitle>
            <CardDescription>Detailed analytics for your storefront</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {kpiData.map((kpi) => {
              const Icon = kpi.icon
              const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

              return (
                <div key={kpi.title} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{kpi.title}</p>
                      <p className="text-xs text-muted-foreground">{kpi.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{kpi.value}</p>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        kpi.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {kpi.change}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card className="studio-card">
      <CardHeader>
        <CardTitle className="font-heading">Store Metrics</CardTitle>
        <CardDescription>Key performance indicators for your storefront</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {kpiData.slice(0, 3).map((kpi) => {
          const Icon = kpi.icon
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

          return (
            <div key={kpi.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-sm">{kpi.title}</p>
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{kpi.value}</p>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {kpi.change}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
