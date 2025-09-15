"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, ShoppingCart, Eye, DollarSign, Target, Calendar } from "lucide-react"

const analyticsData = [
  {
    promotion: "Summer Flash Sale",
    status: "active",
    impressions: 12450,
    clicks: 892,
    conversions: 89,
    revenue: 12450,
    ctr: 7.2,
    conversionRate: 10.0,
    roi: 245,
    daysLeft: 3,
    progress: 65,
  },
  {
    promotion: "Buy 2 Get 1 Free Soaps",
    status: "active",
    impressions: 8920,
    clicks: 534,
    conversions: 34,
    revenue: 4280,
    ctr: 6.0,
    conversionRate: 6.4,
    roi: 180,
    daysLeft: 12,
    progress: 45,
  },
  {
    promotion: "New Year Clearance",
    status: "completed",
    impressions: 21560,
    clicks: 1456,
    conversions: 156,
    revenue: 18920,
    ctr: 6.8,
    conversionRate: 10.7,
    roi: 320,
    daysLeft: 0,
    progress: 100,
  },
]

export function PromotionAnalytics() {
  const totalRevenue = analyticsData.reduce((sum, promo) => sum + promo.revenue, 0)
  const totalConversions = analyticsData.reduce((sum, promo) => sum + promo.conversions, 0)
  const avgCTR = analyticsData.reduce((sum, promo) => sum + promo.ctr, 0) / analyticsData.length
  const avgROI = analyticsData.reduce((sum, promo) => sum + promo.roi, 0) / analyticsData.length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">K {totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{totalConversions}</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              +23.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Click Rate</CardTitle>
            <Eye className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{avgCTR.toFixed(1)}%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              +2.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{avgROI.toFixed(0)}%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="studio-card">
        <CardHeader>
          <CardTitle className="font-heading">Promotion Performance</CardTitle>
          <CardDescription>Detailed analytics for all your promotional campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analyticsData.map((promo, index) => (
              <div key={index} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-lg font-semibold">{promo.promotion}</h3>
                    <Badge variant={promo.status === "active" ? "default" : "secondary"}>{promo.status}</Badge>
                  </div>
                  {promo.status === "active" && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{promo.daysLeft} days left</p>
                      <Progress value={promo.progress} className="w-24 h-2 mt-1" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Eye className="h-3 w-3" />
                      <span className="text-xs">Impressions</span>
                    </div>
                    <p className="font-bold text-lg">{promo.impressions.toLocaleString()}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Users className="h-3 w-3" />
                      <span className="text-xs">Clicks</span>
                    </div>
                    <p className="font-bold text-lg">{promo.clicks}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <ShoppingCart className="h-3 w-3" />
                      <span className="text-xs">Conversions</span>
                    </div>
                    <p className="font-bold text-lg text-green-600">{promo.conversions}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <DollarSign className="h-3 w-3" />
                      <span className="text-xs">Revenue</span>
                    </div>
                    <p className="font-bold text-lg text-green-600">K {promo.revenue.toLocaleString()}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Target className="h-3 w-3" />
                      <span className="text-xs">CTR</span>
                    </div>
                    <p className="font-bold text-lg">{promo.ctr}%</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">Conv. Rate</span>
                    </div>
                    <p className="font-bold text-lg">{promo.conversionRate}%</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs">ROI</span>
                    </div>
                    <p className="font-bold text-lg text-primary">{promo.roi}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="studio-card">
          <CardHeader>
            <CardTitle className="font-heading">Top Performing Promotions</CardTitle>
            <CardDescription>Ranked by conversion rate and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData
                .sort((a, b) => b.conversionRate - a.conversionRate)
                .map((promo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : index === 1
                              ? "bg-gray-400 text-white"
                              : "bg-orange-500 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{promo.promotion}</p>
                        <p className="text-xs text-muted-foreground">{promo.conversionRate}% conversion rate</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">K {promo.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{promo.conversions} sales</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader>
            <CardTitle className="font-heading">Promotion Insights</CardTitle>
            <CardDescription>Key insights to improve your campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Best Performance</span>
                </div>
                <p className="text-sm text-green-700">
                  Flash sales perform 40% better than regular discounts. Consider more time-limited offers.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Optimization Tip</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your BOGO promotions have lower conversion rates. Try bundling complementary products instead.
                </p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Timing Insight</span>
                </div>
                <p className="text-sm text-orange-700">
                  Weekend promotions get 25% more engagement. Schedule your next campaign for Friday-Sunday.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
