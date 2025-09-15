"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, ShoppingCart, Palette, Scissors, Ruler } from "lucide-react"

interface Fabric {
  id: string
  name: string
  type: string
  price: number
  priceUnit: string
  image: string
  colors: string[]
  width: string
  weight: string
  composition: string
  rating: number
  reviews: number
  inStock: boolean
  vendor: {
    name: string
    location: string
    verified: boolean
  }
}

const fabricsData: Fabric[] = [
  {
    id: "fab-001",
    name: "Premium Cotton Chitenge",
    type: "Traditional Print",
    price: 45,
    priceUnit: "per meter",
    image: "/api/placeholder/400/300",
    colors: ["Royal Blue", "Orange", "Green", "Red"],
    width: "115cm",
    weight: "Medium",
    composition: "100% Cotton",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    vendor: {
      name: "Zambian Textiles Co.",
      location: "Lusaka",
      verified: true,
    },
  },
  {
    id: "fab-002",
    name: "Ankara Print Fabric",
    type: "African Print",
    price: 38,
    priceUnit: "per meter",
    image: "/api/placeholder/400/300",
    colors: ["Multi-color", "Blue Pattern", "Red Pattern"],
    width: "110cm",
    weight: "Light",
    composition: "100% Cotton",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    vendor: {
      name: "African Prints ZM",
      location: "Kitwe",
      verified: true,
    },
  },
  {
    id: "fab-003",
    name: "Silk Blend Traditional",
    type: "Premium Blend",
    price: 85,
    priceUnit: "per meter",
    image: "/api/placeholder/400/300",
    colors: ["Gold", "Silver", "Bronze"],
    width: "120cm",
    weight: "Light",
    composition: "70% Silk, 30% Cotton",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    vendor: {
      name: "Luxury Fabrics ZM",
      location: "Ndola",
      verified: true,
    },
  },
]

export default function TextilesFabrics() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="h-8 w-8 text-blue-600" />
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Premium Fabrics
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quality Fabrics Collection</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our extensive range of premium fabrics perfect for traditional and modern clothing
          </p>
        </motion.div>

        {/* Fabrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fabricsData.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={fabric.image || "/placeholder.svg"}
                    alt={fabric.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">{fabric.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{fabric.rating}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{fabric.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">ZMW {fabric.price}</span>
                    <span className="text-sm text-gray-600">{fabric.priceUnit}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Width: {fabric.width}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Weight: {fabric.weight}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Composition:</strong> {fabric.composition}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Available Colors:</h4>
                    <div className="flex flex-wrap gap-1">
                      {fabric.colors.map((color, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{fabric.rating}</span>
                    <span className="text-sm text-gray-500">({fabric.reviews} reviews)</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Order Fabric
                    </Button>
                    <Button variant="outline" size="sm" className="px-3 bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <Palette className="h-12 w-12 mx-auto mb-6 text-white" />
          <h3 className="text-3xl font-bold mb-4">Custom Fabric Orders</h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Need specific colors, patterns, or quantities? We offer custom fabric orders to meet your exact requirements
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            Request Custom Order
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
