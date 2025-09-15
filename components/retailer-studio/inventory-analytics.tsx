import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Target, PieChart } from "lucide-react"

const inventoryMetrics = [
  {
    title: "Inventory Turnover",
    value: "4.2x",
    change: "+0.8 vs last quarter",
    trend: "up",
    description: "How quickly inventory is sold",
  },
  {
    title: "Stockout Rate",
    value: "2.1%",
    change: "-0.5% vs last month",
    trend: "up",
    description: "Percentage of time products are out of stock",
  },
  {
    title: "Carrying Cost",
    value: "K1,250",
    change: "+K150 vs last month",
    trend: "down",
    description: "Monthly cost to hold inventory",
  },
  {
    title: "Dead Stock Value",
    value: "K890",
    change: "-K200 vs last month",
    trend: "up",
    description: "Value of unsold inventory over 90 days",
  },
]

const categoryPerformance = [
  {
    category: "Home Decor",
    revenue: 18750,
    units: 245,
    margin: 42.5,
    growth: 15.2,
    color: "bg-primary",
  },
  {
    category: "Jewelry",
    revenue: 12400,
    units: 156,
    margin: 38.8,
    growth: 8.7,
    color: "bg-accent",
  },
  {
    category: "Kitchenware",
    revenue: 9800,
    units: 134,
    margin: 35.2,
    growth: -2.1,
    color: "bg-emerald-500",
  },
  {
    category: "Clothing",
    revenue: 6200,
    units: 89,
    margin: 28.5,
    growth: 22.3,
    color: "bg-amber-500",
  },
]

const topMovers = [
  {
    product: "Handwoven Baskets",
    movement: "fast",
    velocity: 5.2,
    daysToSell: 8.7,
    trend: "up",
  },
  {
    product: "Ceramic Vases",
    movement: "medium",
    velocity: 3.1,
    daysToSell: 16.1,
    trend: "up",
  },
  {
    product: "Wooden Bowls",
    movement: "slow",
    velocity: 1.8,
    daysToSell: 27.8,
    trend: "down",
  },
  {
    product: "Beaded Jewelry",
    movement: "dead",
    velocity: 0.5,
    daysToSell: 89.2,
    trend: "down",
  },
]

export function InventoryAnalytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryMetrics.map((metric, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-2xl font-bold text-primary">{metric.value}</p>
                <p className={`text-xs ${metric.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                  {metric.change}
                </p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="font-semibold text-sm">{category.category}</span>
                    </div>
                    <Badge variant={category.growth > 0 ? "default" : "secondary"} className="text-xs">
                      {category.growth > 0 ? "+" : ""}
                      {category.growth}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-semibold">K{category.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Units Sold</p>
                      <p className="font-semibold">{category.units}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Margin</p>
                      <p className="font-semibold">{category.margin}%</p>
                    </div>
                  </div>

                  <Progress value={(category.revenue / 25000) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Movement */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Inventory Movement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMovers.map((mover, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{mover.product}</h4>
                      <Badge
                        variant={
                          mover.movement === "fast"
                            ? "default"
                            : mover.movement === "medium"
                              ? "secondary"
                              : mover.movement === "slow"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {mover.movement}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Velocity: {mover.velocity}/day</span>
                      <span>Days to sell: {mover.daysToSell}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {mover.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Inventory Optimization Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="font-semibold text-primary mb-2">📈 Restock Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                Your "Handwoven Baskets" are selling 40% faster than average. Consider increasing your next order by 25
                units to avoid stockouts.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-700 mb-2">⚠️ Slow Moving Alert</h4>
              <p className="text-sm text-muted-foreground">
                "Wooden Bowls" have been moving slowly for 3 weeks. Consider a 15% discount promotion to clear
                inventory.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-700 mb-2">💰 Profit Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Your jewelry category has the highest margin (38.8%) and growing demand. Consider expanding this
                category by 20%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
