"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Filter, Search, Star } from "lucide-react"
import { ProductFilters } from "@/services/product-service"

interface ShopFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  isLoading: boolean
}

const CATEGORIES = [
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories', count: 45 },
  { id: 'fashion-textiles', name: 'Fashion & Textiles', count: 67 },
  { id: 'food-beverages', name: 'Food & Beverages', count: 89 },
  { id: 'agriculture-natural', name: 'Agriculture & Natural', count: 41 },
  { id: 'tools-hardware', name: 'Tools & Hardware', count: 23 },
  { id: 'art-culture', name: 'Art & Culture', count: 19 },
  { id: 'traditional-crafts', name: 'Traditional Crafts', count: 45 },
]

const POPULAR_TAGS = [
  'handmade', 'organic', 'traditional', 'premium', 'local', 'certified', 'sustainable', 'artisan'
]

const PRICE_RANGES = [
  { min: 0, max: 100, label: 'Under ZMW 100' },
  { min: 100, max: 300, label: 'ZMW 100 - 300' },
  { min: 300, max: 500, label: 'ZMW 300 - 500' },
  { min: 500, max: 1000, label: 'ZMW 500 - 1,000' },
  { min: 1000, max: 99999, label: 'Over ZMW 1,000' },
]

export function ShopFilters({ filters, onFiltersChange, isLoading }: ShopFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '')
  const [priceRange, setPriceRange] = useState([
    filters.priceRange?.min || 0,
    filters.priceRange?.max || 2000
  ])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.category ? [filters.category] : []
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || [])
  const [selectedRating, setSelectedRating] = useState(filters.rating || 0)
  const [inStockOnly, setInStockOnly] = useState(filters.inStock || false)

  // Apply filters when local state changes
  useEffect(() => {
    const newFilters: ProductFilters = {
      searchQuery: searchQuery || undefined,
      category: selectedCategories.length === 1 ? selectedCategories[0] : undefined,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      rating: selectedRating > 0 ? selectedRating : undefined,
      inStock: inStockOnly || undefined,
    }

    // Remove undefined values
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key as keyof ProductFilters] === undefined) {
        delete newFilters[key as keyof ProductFilters]
      }
    })

    onFiltersChange(newFilters)
  }, [searchQuery, priceRange, selectedCategories, selectedTags, selectedRating, inStockOnly])

  const clearAllFilters = () => {
    setSearchQuery('')
    setPriceRange([0, 2000])
    setSelectedCategories([])
    setSelectedTags([])
    setSelectedRating(0)
    setInStockOnly(false)
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [categoryId] // Only allow one category at a time
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0 || selectedRating > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 2000

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-slate-600 hover:text-slate-900"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardContent className="pt-6">
          <Label htmlFor="search" className="text-sm font-medium mb-3 block">
            Search Products
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                  disabled={isLoading}
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-3">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={2000}
              step={50}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>ZMW {priceRange[0].toLocaleString()}</span>
            <span>ZMW {priceRange[1].toLocaleString()}</span>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            {PRICE_RANGES.map((range, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm"
                onClick={() => setPriceRange([range.min, range.max])}
                disabled={isLoading}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                disabled={isLoading}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm ml-2">& up</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
                disabled={isLoading}
                className="text-xs"
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
              disabled={isLoading}
            />
            <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h4 className="font-medium text-emerald-900">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    Search: "{searchQuery}"
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {selectedCategories.map(categoryId => {
                  const category = CATEGORIES.find(c => c.id === categoryId)
                  return (
                    <Badge key={categoryId} variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {category?.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0"
                        onClick={() => toggleCategory(categoryId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )
                })}
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-800">
                    #{tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => toggleTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {selectedRating > 0 && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    {selectedRating}+ stars
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => setSelectedRating(0)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {inStockOnly && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    In Stock
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => setInStockOnly(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
