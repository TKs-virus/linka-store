"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Star } from "lucide-react"

interface StorefrontPreviewProps {
  device: "desktop" | "tablet" | "mobile"
  fullHeight?: boolean
}

export function StorefrontPreview({ device, fullHeight = false }: StorefrontPreviewProps) {
  const containerClasses = cn(
    "mx-auto bg-background border rounded-lg overflow-hidden shadow-lg transition-all duration-300",
    device === "desktop" && "w-full max-w-4xl",
    device === "tablet" && "w-full max-w-2xl",
    device === "mobile" && "w-full max-w-sm",
    fullHeight ? "h-[600px]" : "h-[400px]",
  )

  return (
    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
      <div className={containerClasses}>
        <div className="h-full overflow-auto">
          {/* Store Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">JS</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">John's Artisan Store</h1>
            <p className="text-muted-foreground">Handcrafted goods from the heart of Zambia</p>
            <Badge className="mt-2 bg-green-100 text-green-800">⭐ 4.8 Rating • 156 Reviews</Badge>
          </div>

          {/* Featured Banner */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-secondary/20 to-primary/20 rounded-lg p-6 text-center">
              <h2 className="font-heading text-xl font-bold mb-2">Up to 30% off - Shop Now!</h2>
              <p className="text-muted-foreground mb-4">Limited time offer on selected handcrafted items</p>
              <Button className="btn-studio-secondary">Shop Sale Items</Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="p-4">
            <h3 className="font-heading text-lg font-semibold mb-4">Featured Products</h3>
            <div className={cn("grid gap-4", device === "mobile" ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3")}>
              {[
                { name: "Handwoven Basket", price: "K 450", image: "🧺", rating: 4.9 },
                { name: "Organic Soap Set", price: "K 280", image: "🧼", rating: 4.7 },
                { name: "Copper Bracelet", price: "K 320", image: "📿", rating: 4.8 },
              ].map((product, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-muted/50 flex items-center justify-center text-4xl">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1 text-xs">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" className="p-2 bg-transparent">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Store Info */}
          <div className="p-4 bg-muted/30 mt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">📍 Lusaka, Zambia • 🚚 Free delivery over K 500</p>
              <p className="text-xs text-muted-foreground">Open Mon-Sat 9AM-6PM • Contact: +260 123 456 789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
