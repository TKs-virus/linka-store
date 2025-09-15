"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, ImageIcon, Package, MoreHorizontal } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Handwoven Basket Set",
    sku: "HWB-001",
    category: "Home Decor",
    price: 80,
    cost: 45,
    stock: 45,
    sold: 156,
    status: "active",
    image: "/handwoven-basket.png",
    description: "Beautiful handcrafted baskets made from natural materials",
  },
  {
    id: 2,
    name: "Ceramic Vase Collection",
    sku: "CV-002",
    category: "Home Decor",
    price: 100,
    cost: 60,
    stock: 28,
    sold: 89,
    status: "active",
    image: "/ceramic-vase.png",
    description: "Elegant ceramic vases perfect for modern homes",
  },
  {
    id: 3,
    name: "Wooden Bowl Set",
    sku: "WB-003",
    category: "Kitchenware",
    price: 100,
    cost: 55,
    stock: 3,
    sold: 67,
    status: "low_stock",
    image: "/wooden-bowl.png",
    description: "Handcrafted wooden bowls for serving and decoration",
  },
  {
    id: 4,
    name: "Beaded Jewelry Set",
    sku: "BJ-004",
    category: "Jewelry",
    price: 100,
    cost: 40,
    stock: 0,
    sold: 45,
    status: "out_of_stock",
    image: "/beaded-jewelry.png",
    description: "Traditional beaded jewelry with modern designs",
  },
]

export function ProductCatalog() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Product Catalog</h2>
          <p className="text-sm text-muted-foreground">Manage your product inventory and details</p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-1" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Create a new product in your inventory</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Auto-generated" disabled />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home-decor">Home Decor</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="kitchenware">Kitchenware</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="price">Selling Price (K)</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="cost">Cost Price (K)</Label>
                    <Input id="cost" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="stock">Initial Stock</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drag & drop images or click to browse</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Product description..." rows={4} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddProductOpen(false)}>Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold">K{product.price}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Stock:</span>
                      <Badge
                        variant={
                          product.status === "active"
                            ? "default"
                            : product.status === "low_stock"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {product.stock} units
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Sold:</span>
                      <span>{product.sold} units</span>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-3">
                    <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                      <Package className="w-3 h-3 mr-1" />
                      Restock
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
