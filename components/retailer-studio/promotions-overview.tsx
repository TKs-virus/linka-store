"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp, ShoppingCart, Edit, Pause, Play, Trash2, MoreHorizontal, Target } from "lucide-react"

interface PromotionsOverviewProps {
  searchQuery: string
  onCreateNew: () => void
}

const promotions = [
  {
    id: 1,
    name: "Summer Flash Sale",
    type: "Flash Sale",
    discount: "30% off",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    products: 12,
    views: 1247,
    conversions: 89,
    revenue: "K 12,450",
    progress: 65,
    daysLeft: 3,
  },
  {
    id: 2,
    name: "Buy 2 Get 1 Free Soaps",
    type: "BOGO",
    discount: "BOGO Free",
    status: "active",
    startDate: "2024-01-10",
    endDate: "2024-01-31",
    products: 5,
    views: 892,
    conversions: 34,
    revenue: "K 4,280",
    progress: 45,
    daysLeft: 12,
  },
  {
    id: 3,
    name: "Free Delivery Weekend",
    type: "Free Shipping",
    discount: "Free delivery",
    status: "scheduled",
    startDate: "2024-01-25",
    endDate: "2024-01-27",
    products: 25,
    views: 0,
    conversions: 0,
    revenue: "K 0",
    progress: 0,
    daysLeft: 8,
  },
  {
    id: 4,
    name: "New Year Clearance",
    type: "Percentage",
    discount: "50% off",
    status: "expired",
    startDate: "2024-01-01",
    endDate: "2024-01-07",
    products: 18,
    views: 2156,
    conversions: 156,
    revenue: "K 18,920",
    progress: 100,
    daysLeft: 0,
  },
]

export function PromotionsOverview({ searchQuery, onCreateNew }: PromotionsOverviewProps) {
  const filteredPromotions = promotions.filter(
    (promotion) =>
      promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activePromotions = promotions.filter((p) => p.status === "active").length
  const totalRevenue = promotions.reduce(
    (sum, p) => sum + Number.parseInt(p.revenue.replace("K ", "").replace(",", "")),
    0,
  )
  const totalConversions = promotions.reduce((sum, p) => sum + p.conversions, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{activePromotions}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">K {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all promotions</p>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversions</CardTitle>
            <Target className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{totalConversions}</div>
            <p className="text-xs text-muted-foreground">Total sales from promos</p>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Conversion</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">
              {promotions.length > 0 ? Math.round((totalConversions / promotions.length) * 100) / 100 : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Average conversion rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="studio-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading">All Promotions</CardTitle>
              <CardDescription>Manage your promotional campaigns and track performance</CardDescription>
            </div>
            <Button onClick={onCreateNew} className="gap-2 btn-studio-primary">
              <Calendar className="h-4 w-4" />
              New Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPromotions.map((promotion) => (
              <div
                key={promotion.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                {/* Status Indicator */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      promotion.status === "active"
                        ? "bg-green-500 animate-pulse"
                        : promotion.status === "scheduled"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                    }`}
                  />
                  <Badge
                    variant={
                      promotion.status === "active"
                        ? "default"
                        : promotion.status === "scheduled"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {promotion.status}
                  </Badge>
                </div>

                {/* Promotion Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-lg font-heading">{promotion.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {promotion.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-bold text-primary">
                      {promotion.discount}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {new Date(promotion.startDate).toLocaleDateString()} -{" "}
                        {new Date(promotion.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Products</p>
                      <p className="font-medium">{promotion.products} items</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Views</p>
                      <p className="font-medium">{promotion.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium text-green-600">{promotion.revenue}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {promotion.status === "active" && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Campaign Progress</span>
                        <span>{promotion.daysLeft} days left</span>
                      </div>
                      <Progress value={promotion.progress} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>

                  {promotion.status === "active" ? (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : promotion.status === "scheduled" ? (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : null}

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredPromotions.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-lg font-medium mb-2">No promotions found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search terms" : "Create your first promotion to boost sales"}
              </p>
              <Button onClick={onCreateNew} className="gap-2 btn-studio-primary">
                <Calendar className="h-4 w-4" />
                Create Promotion
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
