import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Package, TrendingDown, Clock, CheckCircle } from "lucide-react"

const stockAlerts = [
  {
    id: 1,
    type: "low_stock",
    product: "Wooden Bowl Set",
    sku: "WB-003",
    currentStock: 3,
    minStock: 10,
    avgSales: 2.3,
    daysLeft: 1.3,
    priority: "high",
    image: "/wooden-bowl.png",
  },
  {
    id: 2,
    type: "out_of_stock",
    product: "Beaded Jewelry Set",
    sku: "BJ-004",
    currentStock: 0,
    minStock: 5,
    avgSales: 1.5,
    daysLeft: 0,
    priority: "critical",
    image: "/beaded-jewelry.png",
  },
  {
    id: 3,
    type: "low_stock",
    product: "Ceramic Vase Collection",
    sku: "CV-002",
    currentStock: 8,
    minStock: 15,
    avgSales: 1.2,
    daysLeft: 6.7,
    priority: "medium",
    image: "/ceramic-vase.png",
  },
  {
    id: 4,
    type: "reorder_suggestion",
    product: "Handwoven Basket Set",
    sku: "HWB-001",
    currentStock: 45,
    minStock: 20,
    avgSales: 5.2,
    daysLeft: 8.7,
    priority: "low",
    image: "/handwoven-basket.png",
  },
]

const reorderSuggestions = [
  {
    product: "Wooden Bowl Set",
    suggestedQuantity: 50,
    estimatedCost: 2750,
    supplier: "Artisan Crafts Ltd",
    leadTime: "7-10 days",
  },
  {
    product: "Beaded Jewelry Set",
    suggestedQuantity: 30,
    estimatedCost: 1200,
    supplier: "Local Beadwork Co",
    leadTime: "5-7 days",
  },
]

export function StockAlerts() {
  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-xl font-bold text-red-600">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <TrendingDown className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-xl font-bold text-amber-600">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reorder Soon</p>
                <p className="text-xl font-bold text-blue-600">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Well Stocked</p>
                <p className="text-xl font-bold text-emerald-600">243</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Alerts */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                  <img
                    src={alert.image || "/placeholder.svg"}
                    alt={alert.product}
                    className="w-10 h-10 rounded-lg object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{alert.product}</h4>
                      <Badge
                        variant={
                          alert.priority === "critical"
                            ? "destructive"
                            : alert.priority === "high"
                              ? "secondary"
                              : alert.priority === "medium"
                                ? "outline"
                                : "default"
                        }
                        className="text-xs"
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">SKU: {alert.sku}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Stock: {alert.currentStock} units</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.daysLeft > 0 ? `${alert.daysLeft.toFixed(1)} days left` : "Out of stock"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reorder Suggestions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Reorder Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reorderSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{suggestion.product}</h4>
                    <Badge variant="outline">Suggested</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-semibold">{suggestion.suggestedQuantity} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Cost</p>
                      <p className="font-semibold">K{suggestion.estimatedCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Supplier</p>
                      <p className="font-semibold">{suggestion.supplier}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Lead Time</p>
                      <p className="font-semibold">{suggestion.leadTime}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Create Purchase Order
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Supplier
                    </Button>
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
