"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart, useFavorites } from "@/contexts/marketplace-context"
import { productService } from "@/services/product-service"
import type { Product } from "@/lib/types"
import {
  Heart,
  ShoppingCart,
  Star,
  Trash2,
  Share2,
  Grid3X3,
  List,
  Clock,
  MapPin,
  Copy,
  Mail,
  Send,
  Sparkles,
} from "lucide-react"

function encodeShare(ids: string[]): string {
  try {
    return encodeURIComponent(btoa(JSON.stringify({ ids })))
  } catch {
    return ""
  }
}

function decodeShare(param: string | null): string[] {
  if (!param) return []
  try {
    const json = atob(decodeURIComponent(param))
    const parsed = JSON.parse(json)
    if (parsed && Array.isArray(parsed.ids)) return parsed.ids as string[]
  } catch {}
  return []
}

export default function WishlistPage() {
  const router = useRouter()
  const params = useSearchParams()
  const shareParam = params.get("share")

  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)

  // Load wishlist products (either from favorites or shared ids)
  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const ids = shareParam ? decodeShare(shareParam) : favorites
        const unique = Array.from(new Set(ids))
        const fetched: Product[] = []
        for (const id of unique) {
          const p = await productService.getProduct(id)
          if (p) fetched.push(p)
        }
        if (active) setProducts(fetched)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [favorites, shareParam])

  const isSharedView = Boolean(shareParam)

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return products.filter(p =>
      !q || p.name.toLowerCase().includes(q) || p.retailerName?.toLowerCase().includes(q)
    )
  }, [products, searchQuery])

  const totalValue = useMemo(() => filtered.reduce((sum, p) => sum + (p.price || 0), 0), [filtered])

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const ids = products.map(p => p.id)
    const token = encodeShare(ids)
    return `${window.location.origin}/wishlist?share=${token}`
  }, [products])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {}
  }

  const shareEmail = () => {
    const subject = encodeURIComponent("My Linka Wishlist")
    const body = encodeURIComponent(`Check out my wishlist on Linka:\n${shareUrl}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`My Linka wishlist: ${shareUrl}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const importSharedToMyWishlist = () => {
    const ids = products.map(p => p.id)
    ids.forEach(id => {
      if (!isFavorite(id)) toggleFavorite(id)
    })
    router.replace("/wishlist")
  }

  // Anim
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 100], [1, 0.9])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <Header />

        {/* Sticky header */}
        <motion.div className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-white/20" style={{ y, opacity }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    {isSharedView ? "Shared Wishlist" : "My Wishlist"}
                    <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>❤️</motion.span>
                  </h1>
                  <p className="text-gray-600">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!isSharedView && (
                  <>
                    <Button onClick={() => setShowShareModal(true)} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      <Share2 className="h-4 w-4 mr-2" /> Share Wishlist
                    </Button>
                  </>
                )}
                {isSharedView && (
                  <Button onClick={importSharedToMyWishlist} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                    Save to My Wishlist
                  </Button>
                )}
                <div className="flex bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-200">
                  <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="rounded-none px-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className="rounded-none px-3">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Tools */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-white/20 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex-1 relative">
              <Input placeholder="Search your wishlist..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-3 bg-white/60 backdrop-blur-sm border-gray-200" />
            </div>
            {!isSharedView && (
              <div className="text-sm text-gray-600">
                Total value: <span className="font-semibold text-blue-600">ZMW {totalValue.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Heart className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{isSharedView ? 'Nothing to show' : 'Your wishlist is empty'}</h2>
              {!isSharedView && (
                <Link href="/marketplace">
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-lg px-8 py-3">
                    <Sparkles className="h-5 w-5 mr-2" /> Discover products
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="group">
                  <Card className="overflow-hidden h-full bg-white/90 backdrop-blur-md border border-white/30 hover:shadow-2xl transition-all duration-500">
                    <div className="relative">
                      <Link href={`/products/${item.id}`}>
                        <div className="aspect-square bg-gray-50 cursor-pointer overflow-hidden relative">
                          <motion.img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }} />
                        </div>
                      </Link>

                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <Button aria-label="Remove from wishlist" onClick={() => toggleFavorite(item.id)} className="w-9 h-9 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">{item.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{item.rating?.toFixed(1) ?? '4.8'}</span>
                          <span className="text-gray-500">({item.reviewCount ?? 0})</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{item.retailerLocation ?? 'Lusaka'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl font-bold text-blue-700">ZMW {item.price.toFixed(2)}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <Badge className="bg-orange-500 text-white">-{Math.round((1 - item.price / item.originalPrice) * 100)}%</Badge>
                        )}
                      </div>

                      <div className="flex gap-2 pt-3">
                        <Button onClick={() => addToCart(item, 1)} className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                        </Button>
                        <Link href={`/products/${item.id}`}>
                          <Button variant="outline" size="sm" className="px-3">
                            <Clock className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowShareModal(false)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-2">Share your wishlist</h3>
                <p className="text-sm text-gray-600 mb-4">Copy a link or share directly</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input readOnly value={shareUrl} className="flex-1" aria-label="Shareable wishlist link" />
                    <Button onClick={copyLink} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={shareEmail} className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </Button>
                    <Button variant="outline" onClick={shareWhatsApp} className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> WhatsApp
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setShowShareModal(false)} className="w-full mt-4">Close</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  )
}
