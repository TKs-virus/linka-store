"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, ArrowRight, TrendingUp, Eye, Heart } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  {
    id: 1,
    name: "Fashion Industry (Apparel)",
    description: "Modern apparel and traditional wear from leading brands.",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80&auto=format&fit=crop",
    href: "/categories/fashion",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "2,100+",
    trending: true,
    featured: ["Chitenge Dresses", "Modern Suits", "Traditional Wear"]
  },
  {
    id: 2,
    name: "Food & Beverages Industry (Groceries)",
    description: "Local spices, organic honey and everyday essentials.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80&auto=format&fit=crop",
    href: "/categories/food-beverages",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "1,800+",
    trending: false,
    featured: ["Organic Honey", "Local Spices", "Traditional Foods"]
  },
  {
    id: 3,
    name: "Home Industry (Home & Furniture)",
    description: "Furniture, decor and interior upgrades for every space.",
    image: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=600&q=80&auto=format&fit=crop",
    href: "/industries/home-decor",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "950+",
    trending: true,
    featured: ["Modern Furniture", "Wall Art", "Lighting"]
  },
  {
    id: 4,
    name: "Jewelry & Accessories Industry (Handcrafted)",
    description: "Handcrafted jewelry and premium accessories.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop",
    href: "/categories/jewelry-accessories",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "680+",
    trending: false,
    featured: ["Copper Jewelry", "Gemstones", "Handmade Items"]
  },
  {
    id: 5,
    name: "Entertainment Industry (Written)",
    description: "Books, articles and local written media.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80&auto=format&fit=crop",
    href: "/entertainment/local-content",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "420+",
    trending: true,
    featured: ["Fiction", "Non-fiction", "Local Authors"]
  },
  {
    id: 6,
    name: "Tools & Hardware Industry (Construction)",
    description: "Reliable tools and hardware for projects of any size.",
    image: "https://images.unsplash.com/photo-1504148455329-9f5a1c3a1e86?w=600&q=80&auto=format&fit=crop",
    href: "/categories/tools-hardware",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "1,100+",
    trending: false,
    featured: ["Power Tools", "Hardware", "Construction"]
  },
  {
    id: 7,
    name: "Agriculture Industry (Natural Products)",
    description: "Seeds, farming supplies and sustainable goods.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80&auto=format&fit=crop",
    href: "/categories/agriculture-natural",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "1,350+",
    trending: true,
    featured: ["Organic Seeds", "Farm Tools", "Natural Products"]
  },
  {
    id: 8,
    name: "Traditional Crafts Industry (Artisans)",
    description: "Authentic crafts, carvings and cultural pieces.",
    image: "https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=600&q=80&auto=format&fit=crop",
    href: "/categories/traditional-crafts",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "1,200+",
    trending: true,
    featured: ["Wood Carvings", "Pottery", "Baskets"]
  },
  {
    id: 9,
    name: "Technology Industry (Electronics)",
    description: "Latest gadgets, devices and accessories.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80&auto=format&fit=crop",
    href: "/categories/electronics",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "1,600+",
    trending: true,
    featured: ["Smartphones", "Laptops", "Headphones"]
  },
  {
    id: 10,
    name: "Health Industry (Wellness)",
    description: "Wellness, personal care and health services.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80&auto=format&fit=crop",
    href: "/services/health-wellness",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "700+",
    trending: false,
    featured: ["Wellness", "Personal Care", "Supplies"]
  },
  {
    id: 11,
    name: "Financial Services Industry (Payments)",
    description: "Mobile money, gateways and financial tools.",
    image: "https://images.unsplash.com/photo-1518544801976-3e188ea1f699?w=600&q=80&auto=format&fit=crop",
    href: "/financial-services",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "300+",
    trending: false,
    featured: ["Mobile Money", "Gateways", "Payments"]
  },
  {
    id: 12,
    name: "Entertainment Industry (Gaming)",
    description: "Games, accessories and esports content.",
    image: "https://images.unsplash.com/photo-1591899116521-3256f1af4f9c?w=600&q=80&auto=format&fit=crop",
    href: "/entertainment/gaming",
    gradient: "from-[#0ea5b7] via-[#0099cc] to-[#ff6600]",
    bgGradient: "from-[#0099cc1a] via-transparent to-[#ff66001a]",
    products: "540+",
    trending: true,
    featured: ["Consoles", "Games", "Accessories"]
  }
]

export function EnhancedCategoryGrid() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative">
      {/* Dynamic background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div className="absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(0,153,204,0.18), transparent)"}} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
        <motion.div className="absolute top-16 right-0 h-60 w-60 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(255,102,0,0.12), transparent)"}} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 10 }} />
        <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(14,165,183,0.14), transparent)"}} animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 9 }} />
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            Shop by Category
          </h2>
          <p className="text-slate-600">Discover amazing products from local Zambian businesses</p>
        </div>
        <button
          onClick={() => router.push('/categories')}
          className="group flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:gap-3"
        >
          Explore All Categories
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className={`group cursor-pointer transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/50 overflow-hidden shadow-lg hover:shadow-2xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              transitionDelay: `${index * 100}ms`
            }}
            onClick={() => router.push(category.href)}
            onMouseEnter={() => setHoveredCard(category.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent className="p-0 relative overflow-hidden">
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Floating Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-2 right-2 w-16 h-16 bg-gradient-to-br ${category.gradient}/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700`}></div>
                <div className={`absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-br ${category.gradient}/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} style={{ transitionDelay: '200ms' }}></div>
              </div>

              {/* Header Section */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-28 h-20 rounded-2xl overflow-hidden shadow-lg group-hover:scale-[1.03] group-hover:rotate-1 transition-all duration-300`}>
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>

                  {category.trending && (
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-semibold px-2 py-1 animate-pulse">
                      Trending
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                  {category.description}
                </p>
              </div>

              {/* Stats Section */}
              <div className="relative px-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700">{category.products}</span>
                    <span className="text-xs text-slate-500">products</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span className="text-xs text-slate-500">Popular</span>
                  </div>
                </div>
              </div>

              {/* Featured Items Preview */}
              <div className={`relative px-6 pb-6 transition-all duration-300 overflow-hidden ${
                hoveredCard === category.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-slate-200/50 pt-4">
                  <p className="text-xs font-semibold text-slate-600 mb-2">Featured Items:</p>
                  <div className="space-y-1">
                    {category.featured.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${category.gradient} rounded-full`}></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="relative px-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Tap to explore
                  </div>
                  
                  <div className={`flex items-center gap-1 text-purple-600 group-hover:text-purple-700 transition-all duration-300 ${
                    hoveredCard === category.id ? 'translate-x-1' : ''
                  }`}>
                    <span className="text-sm font-semibold">Browse</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50">
                <div 
                  className={`h-full bg-gradient-to-r ${category.gradient} transition-all duration-700 ease-out ${
                    hoveredCard === category.id ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action */}
      <div className="mt-12 text-center">
        <button
          onClick={() => router.push('/categories')}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <TrendingUp className="h-5 w-5 group-hover:animate-bounce" />
          Explore All Categories
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
