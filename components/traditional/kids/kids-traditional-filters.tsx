"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X, MapPin, Palette, Crown, Baby, Gift } from "lucide-react"

interface KidsTraditionalFilter {
  categories?: string
  ageGroups?: string
  regions?: string
  patterns?: string
  priceRange?: { min: number; max: number }
  sizes?: string
  occasions?: string
}

interface KidsTraditionalFiltersProps {
  filters?: KidsTraditionalFilter
  onFiltersChange?: (filters: KidsTraditionalFilter) => void
}

export default function KidsTraditionalFilters({
  filters = {},
  onFiltersChange = () => {},
}: KidsTraditionalFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 300])

  const categories = [
    { id: "dresses", name: "Traditional Dresses", count: 18 },
    { id: "shirts", name: "Cultural Shirts", count: 15 },
    { id: "sets", name: "Complete Sets", count: 12 },
    { id: "skirts", name: "Traditional Skirts", count: 10 },
    { id: "costumes", name: "Dance Costumes", count: 8 },
    { id: "uniforms", name: "Heritage Uniforms", count: 6 },
  ]

  const ageGroups = [
    { id: "0-2", name: "0-2 years (Baby)", count: 8 },
    { id: "2-4", name: "2-4 years (Toddler)", count: 15 },
    { id: "4-6", name: "4-6 years (Preschool)", count: 18 },
    { id: "6-8", name: "6-8 years (Early School)", count: 22 },
    { id: "8-10", name: "8-10 years (School Age)", count: 16 },
    { id: "10-12", name: "10-12 years (Pre-teen)", count: 12 },
    { id: "12+", name: "12+ years (Teen)", count: 9 },
  ]

  const regions = [
    { id: "northern", name: "Northern Province", count: 12 },
    { id: "western", name: "Western Province", count: 10 },
    { id: "southern", name: "Southern Province", count: 14 },
    { id: "northwestern", name: "Northwestern Province", count: 6 },
    { id: "eastern", name: "Eastern Province", count: 8 },
    { id: "national", name: "Pan-Zambian", count: 25 },
  ]

  const patterns = [
    { id: "chitenge", name: "Traditional Chitenge", count: 20 },
    { id: "bemba", name: "Bemba Traditional", count: 12 },
    { id: "lozi", name: "Lozi Royal", count: 8 },
    { id: "tonga", name: "Tonga Traditional", count: 10 },
    { id: "kaonde", name: "Kaonde Traditional", count: 6 },
    { id: "modern-traditional", name: "Modern Traditional", count: 15 },
  ]

  const occasions = [
    { id: "daily", name: "Daily Wear", count: 25 },
    { id: "festivals", name: "Cultural Festivals", count: 18 },
    { id: "ceremonies", name: "Traditional Ceremonies", count: 15 },
    { id: "school", name: "School Events", count: 12 },
    { id: "dance", name: "Cultural Dance", count: 10 },
    { id: "special", name: "Special Occasions", count: 8 },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, categories: categoryId })
    } else {
      onFiltersChange({ ...filters, categories: undefined })
    }
  }

  const handleAgeGroupChange = (ageGroupId: string) => {
    onFiltersChange({ ...filters, ageGroups: ageGroupId })
  }

  const handleRegionChange = (regionId: string) => {
    onFiltersChange({ ...filters, regions: regionId })
  }

  const handlePatternChange = (patternId: string) => {
    onFiltersChange({ ...filters, patterns: patternId })
  }

  const handleOccasionChange = (occasionId: string) => {
    onFiltersChange({ ...filters, occasions: occasionId })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    onFiltersChange({
      ...filters,
      priceRange: { min: values[0], max: values[1] },
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 300])
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some((key) => filters[key as keyof KidsTraditionalFilter] !== undefined)

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-600 hover:text-red-700">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Crown className="h-4 w-4 mr-2" />
            Category
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories === category.id}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={category.id} className="text-sm cursor-pointer">
                    {category.name}
                  </Label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Age Groups */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Baby className="h-4 w-4 mr-2" />
            Age Group
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={filters.ageGroups || ""} onValueChange={handleAgeGroupChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((ageGroup) => (
                <SelectItem key={ageGroup.id} value={ageGroup.id}>
                  {ageGroup.name} ({ageGroup.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Cultural Regions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Cultural Region
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={filters.regions || ""} onValueChange={handleRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name} ({region.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Traditional Patterns */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Pattern Style
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={filters.patterns || ""} onValueChange={handlePatternChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select pattern" />
            </SelectTrigger>
            <SelectContent>
              {patterns.map((pattern) => (
                <SelectItem key={pattern.id} value={pattern.id}>
                  {pattern.name} ({pattern.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Occasions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Gift className="h-4 w-4 mr-2" />
            Occasion
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={filters.occasions || ""} onValueChange={handleOccasionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              {occasions.map((occasion) => (
                <SelectItem key={occasion.id} value={occasion.id}>
                  {occasion.name} ({occasion.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range (ZMW)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={300}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>ZMW {priceRange[0]}</span>
              <span>ZMW {priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Size</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={filters.sizes || ""} onValueChange={(size) => onFiltersChange({ ...filters, sizes: size })}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-3M">0-3 Months</SelectItem>
              <SelectItem value="3-6M">3-6 Months</SelectItem>
              <SelectItem value="6-12M">6-12 Months</SelectItem>
              <SelectItem value="12-18M">12-18 Months</SelectItem>
              <SelectItem value="18-24M">18-24 Months</SelectItem>
              <SelectItem value="2T">2T</SelectItem>
              <SelectItem value="3T">3T</SelectItem>
              <SelectItem value="4T">4T</SelectItem>
              <SelectItem value="5">Size 5</SelectItem>
              <SelectItem value="6">Size 6</SelectItem>
              <SelectItem value="7">Size 7</SelectItem>
              <SelectItem value="8">Size 8</SelectItem>
              <SelectItem value="10">Size 10</SelectItem>
              <SelectItem value="12">Size 12</SelectItem>
              <SelectItem value="14">Size 14</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Cultural Information */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-purple-900 mb-2">Cultural Heritage for Kids</h3>
          <p className="text-sm text-purple-800 leading-relaxed">
            Our kids collection introduces young ones to Zambian cultural heritage through age-appropriate designs that
            celebrate tradition while ensuring comfort and playfulness.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
