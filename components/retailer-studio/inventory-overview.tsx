import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, TrendingUp, DollarSign, Plus, Search, Filter, Download, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

const inventoryStats = [
  {
    title: "Total Products",
    value: "247",
    change: "+12 this month",
    trend: "up",
    icon: Package,
  },
  {
    title: "Low Stock Items",
    value: "18",
    change: "Needs attention",
    trend: "warning",
    icon: AlertTriangle,
  },
  {
    title: "Inventory Value",
    value: "K45,230",
    change: "+8.2% vs last month",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Top Performer",
    value: "Handwoven Baskets",
    change: "156 sold this month",
    trend: "up",
    icon: TrendingUp,
  },
]

const recentActivity = [
  {
    action: "Stock Updated",
    product: "Ceramic Vases",
    details: "Added 25 units",
    time: "2 hours ago",
    type: "stock_in",
  },
  {
    action: "Low Stock Alert",
    product: "Wooden Bowls",
    details: "Only 3 units left",
    time: "4 hours ago",
    type: "alert",
  },
  {
    action: "New Product",
    product: "Beaded Jewelry Set",
    details: "Added to catalog",
    time: "1 day ago",
    type: "new_product",
  },
  {
    action: "Stock Sold",
    product: "Handwoven Baskets",
    details: "12 units sold",
    time: "1 day ago",
    type: "stock_out",
  },
]

const topProducts = [
  {
    name: "Handwoven Baskets",
    sku: "HWB-001",
    stock: 45,
    sold: 156,
    revenue: "K12,480",
    status: "in_stock",
  },
  {
    name: "Ceramic Vases",
    sku: "CV-002",
    stock: 28,
    sold: 89,
    revenue: "K8,900",
    status: "in_stock",
  },
  {
    name: "Wooden Bowls",
    sku: "WB-003",
    stock: 3,
    sold: 67,
    revenue: "K6,700",
    status: "low_stock",
  },
  {
    name: "Beaded Jewelry",
    sku: "BJ-004",
    stock: 0,
    sold: 45,
    revenue: "K4,500",
    status: "out_of_stock",
  },
]

export function InventoryOverview() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-1" />
                Import
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : stat.trend === "warning"
                            ? "text-amber-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                      {stat.trend === "warning" && <AlertTriangle className="w-3 h-3" />}
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.trend === "warning" ? "bg-amber-100" : "bg-primary/10"}`}>
                    <Icon className={`w-5 h-5 ${stat.trend === "warning" ? "text-amber-600" : "text-primary"}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{product.name}</h4>
                      <Badge
                        variant={
                          product.status === "in_stock"
                            ? "default"
                            : product.status === "low_stock"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {product.status === "in_stock"
                          ? "In Stock"
                          : product.status === "low_stock"
                            ? "Low Stock"
                            : "Out of Stock"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">SKU: {product.sku}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Stock: {product.stock}</span>
                      <span>Sold: {product.sold}</span>
                      <span className="font-semibold text-primary">{product.revenue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "alert"
                        ? "bg-amber-100"
                        : activity.type === "stock_out"
                          ? "bg-red-100"
                          : activity.type === "new_product"
                            ? "bg-blue-100"
                            : "bg-emerald-100"
                    }`}
                  >
                    {activity.type === "alert" && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                    {activity.type === "stock_out" && <Package className="w-3 h-3 text-red-600" />}
                    {activity.type === "new_product" && <Plus className="w-3 h-3 text-blue-600" />}
                    {activity.type === "stock_in" && <TrendingUp className="w-3 h-3 text-emerald-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.product}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
