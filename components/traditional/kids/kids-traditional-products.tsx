"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingCart, Eye, MapPin, Grid3X3, List, ArrowUpDown, Crown, Gift } from "lucide-react"

interface KidsTraditionalProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  rating: number
  reviews: number
  category: string
  region: string
  pattern: string
  ageGroup: string
  sizes: string[]
  colors: string[]
  vendor: {
    name: string
    location: string
    verified: boolean
  }
  inStock: boolean
  cultural_significance: string
  care_instructions: string[]
  isNew: boolean
  isTrending: boolean
}

const kidsTraditionalProducts: KidsTraditionalProduct[] = [
  {
    id: "kids-trad-1",
    name: "Little Princess Chitenge Dress",
    price: 95,
    originalPrice: 120,
    image: "/api/placeholder/400/500",
    brand: "Kids Heritage",
    rating: 4.9,
    reviews: 67,
    category: "dresses",
    region: "National",
    pattern: "Traditional Chitenge",
    ageGroup: "2-6 years",
    sizes: ["2T", "3T", "4T", "5", "6"],
    colors: ["Bright Orange", "Royal Blue", "Traditional Red"],
    vendor: {
      name: "Children's Cultural Wear",
      location: "Lusaka, Zambia",
      verified: true,
    },
    inStock: true,
    cultural_significance: "Beautiful chitenge dress introducing young girls to Zambian cultural heritage",
    care_instructions: ["Hand wash in cold water", "Air dry in shade", "Iron on low heat"],
    isNew: true,
    isTrending: true,
  },
  {
    id: "kids-trad-2",
    name: "Young Chief Traditional Shirt",
    price: 85,
    image: "/api/placeholder/400/500",
    brand: "Little Leaders",
    rating: 4.8,
    reviews: 45,
    category: "shirts",
    region: "Northern Province",
    pattern: "Bemba Traditional",
    ageGroup: "4-10 years",
    sizes: ["4", "5", "6", "7", "8", "9", "10"],
    colors: ["Traditional Blue", "Cultural Brown", "Heritage Gold"],
    vendor: {
      name: "Young Heritage Crafts",
      location: "Kasama, Zambia",
      verified: true,
    },
    inStock: true,
    cultural_significance: "Traditional shirt design teaching young boys about Bemba cultural values",
    care_instructions: ["Machine wash cold", "Gentle cycle", "Medium heat iron"],
    isNew: false,
    isTrending: true,
  },
  {
    id: "kids-trad-3",
    name: "Cultural Festival Outfit Set",
    price: 150,
    originalPrice: 190,
    image: "/api/placeholder/400/500",
    brand: "Festival Kids",
    rating: 4.7,
    reviews: 89,
    category: "sets",
    region: "Western Province",
    pattern: "Lozi Traditional",
    ageGroup: "3-8 years",
    sizes: ["3", "4", "5", "6", "7", "8"],
    colors: ["Festival Multi", "Royal Colors", "Traditional Mix"],
    vendor: {
      name: "Cultural Festival Wear",
      location: "Mongu, Zambia",
      verified: true,
    },
    inStock: true,
    cultural_significance: "Complete outfit set perfect for cultural festivals and traditional ceremonies",
    care_instructions: ["Professional dry clean recommended", "Store carefully", "Handle with care"],
    isNew: true,
    isTrending: false,
  },
  {
    id: "kids-trad-4",
    name: "Mini Traditional Wrap Skirt",
    price: 65,
    image: "/api/placeholder/400/500",
    brand: "Little Traditions",
    rating: 4.6,
    reviews: 34,
    category: "skirts",
    region: "Southern Province",
    pattern: "Tonga Traditional",
    ageGroup: "2-7 years",
    sizes: ["2T", "3T", "4", "5", "6", "7"],
    colors: ["Earth Tones", "Traditional Brown", "Cultural Beige"],
    vendor: {
      name: "Southern Heritage Kids",
      location: "Choma, Zambia",
      verified: true,
    },
    inStock: true,
    cultural_significance: "Traditional wrap skirt introducing young girls to Tonga cultural dress",
    care_instructions: ["Hand wash preferred", "Air dry", "Steam iron if needed"],
    isNew: false,
    isTrending: false,
  },
  {
    id: "kids-trad-5",
    name: "Cultural Dance Costume",
    price: 180,
    image: "/api/placeholder/400/500",
    brand: "Dance Heritage",
    rating: 4.9,
    reviews: 56,
    category: "costumes",
    region: "Northwestern Province",
    pattern: "Kaonde Traditional",
    ageGroup: "5-12 years",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["Dance Orange", "Cultural Red", "Traditional Brown"],
    vendor: {
      name: "Cultural Dance Wear",
      location: "Solwezi, Zambia",
      verified: true,
    },
    inStock: true,
    cultural_significance: "Authentic dance costume for traditional Kaonde cultural performances",
    care_instructions: ["Gentle hand wash", "Natural air dry", "Professional care for performances"],
    isNew: false,
    isTrending: true,
  },
  {
    id: "kids-trad-6",
    name: "Heritage School Uniform",
    price: 120,
    originalPrice: 145,
    image: "/api/placeholder/400/500",
    brand: "Cultural Education",
    rating: 4.8,
    reviews: 78,
    category: "uniforms",
    region: "National",
    pattern: "Modern Traditional",
    ageGroup: "6-14 years",
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13", "14"],
    colors: ["School Navy", "Traditional Accents", "Cultural Trim"],
    vendor: {
      name: "Heritage School Wear",
      location: "Ndola, Zambia",
      verified: true,
    },
    inStock: true,
    cultural_significance: "School uniform incorporating traditional elements to promote cultural pride",
    care_instructions: ["Machine wash cold", "Tumble dry low", "Iron medium heat"],
    isNew: true,
    isTrending: false,
  },
]

export default function KidsTraditionalProducts() {
  const [filteredProducts, setFilteredProducts] = useState<KidsTraditionalProduct[]>(kidsTraditionalProducts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

  const addToCart = (product: KidsTraditionalProduct) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const toggleWishlist = (productId: string) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  useEffect(() => {
    const sorted = [...kidsTraditionalProducts]

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "cultural":
        sorted.sort((a, b) => a.region.localeCompare(b.region))
        break
      case "newest":
      default:
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
    }

    setFilteredProducts(sorted)
  }, [sortBy])

  const ProductCard = ({ product }: { product: KidsTraditionalProduct }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-2">
              {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
              {product.isTrending && <Badge className="bg-orange-500 text-white">Trending</Badge>}
              {product.originalPrice && (
                <Badge className="bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              <Badge className="bg-purple-500 text-white">{product.ageGroup}</Badge>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart className={`h-4 w-4 ${wishlistItems.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Vendor Verification */}
            {product.vendor.verified && (
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-white/90 text-slate-700">✓ Cultural Expert</Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="mb-3">
              <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-slate-500">{product.brand}</p>
              <p className="text-xs text-purple-600 font-medium">{product.pattern}</p>
            </div>

            <div className="flex items-center space-x-1 mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-slate-500">({product.reviews})</span>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-bold text-slate-900">ZMW {product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through">ZMW {product.originalPrice}</span>
              )}
            </div>

            <div className="flex items-center text-xs text-slate-500 mb-4">
              <MapPin className="h-3 w-3 mr-1" />
              {product.vendor.name}, {product.vendor.location}
            </div>

            {/* Cultural Significance */}
            <div className="mb-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <p className="text-xs text-purple-800 font-medium mb-1">Cultural Significance:</p>
              <p className="text-xs text-purple-700">{product.cultural_significance}</p>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => addToCart(product)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Crown className="h-8 w-8 text-purple-600" />
            Kids Traditional Collection
          </h2>
          <p className="text-slate-600">{filteredProducts.length} beautiful pieces for young cultural ambassadors</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          {cartItems.length > 0 && (
            <Button className="bg-purple-600 hover:bg-purple-700 relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cartItems.length})
            </Button>
          )}

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="cultural">By Cultural Region</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Cultural Heritage Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center"
      >
        <Gift className="h-12 w-12 mx-auto mb-4 text-white" />
        <h3 className="text-2xl font-bold mb-4">Nurturing Cultural Pride in Young Hearts</h3>
        <p className="text-purple-100 max-w-2xl mx-auto">
          Every piece in our kids collection is designed to introduce children to the beauty of Zambian culture,
          fostering pride in their heritage from an early age.
        </p>
      </motion.div>

      {/* Load More */}
      <div className="text-center">
        <Button size="lg" variant="outline">
          Load More Traditional Kids Wear
        </Button>
      </div>
    </div>
  )
}
