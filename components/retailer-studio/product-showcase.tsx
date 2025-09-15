"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, TrendingUp, MoreHorizontal, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Handwoven Traditional Basket",
    price: "K 450",
    stock: 12,
    views: 234,
    sales: 8,
    rating: 4.9,
    image: "🧺",
    status: "active",
    trending: true,
  },
  {
    id: 2,
    name: "Organic Shea Butter Soap Set",
    price: "K 280",
    stock: 25,
    views: 189,
    sales: 15,
    rating: 4.7,
    image: "🧼",
    status: "active",
    trending: false,
  },
  {
    id: 3,
    name: "Copper Wire Bracelet",
    price: "K 320",
    stock: 8,
    views: 156,
    sales: 6,
    rating: 4.8,
    image: "📿",
    status: "low-stock",
    trending: false,
  },
  {
    id: 4,
    name: "Chitenge Fabric Bag",
    price: "K 380",
    stock: 0,
    views: 98,
    sales: 3,
    rating: 4.6,
    image: "👜",
    status: "out-of-stock",
    trending: false,
  },
]

export function ProductShowcase() {
  return (
    <Card className="studio-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading">Product Performance</CardTitle>
            <CardDescription>Track how your products are performing with customers</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All Products
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
            >
              {/* Product Image */}
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm truncate">{product.name}</h4>
                  {product.trending && (
                    <Badge variant="secondary" className="text-xs gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-medium text-primary">{product.price}</span>
                  <span>Stock: {product.stock}</span>
                  <span>{product.views} views</span>
                  <span>{product.sales} sold</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <Badge
                  variant={
                    product.status === "active"
                      ? "default"
                      : product.status === "low-stock"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {product.status === "active"
                    ? "Active"
                    : product.status === "low-stock"
                      ? "Low Stock"
                      : "Out of Stock"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
