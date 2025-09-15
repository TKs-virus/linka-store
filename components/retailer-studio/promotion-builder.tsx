"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Clock,
  Percent,
  Gift,
  Truck,
  Zap,
  Search,
  Check,
  Eye,
  Rocket,
} from "lucide-react"
import { format } from "date-fns"

interface PromotionBuilderProps {
  onClose: () => void
}

const promotionTypes = [
  {
    id: "percentage",
    name: "Percentage Discount",
    description: "Reduce prices by a percentage",
    icon: Percent,
    example: "20% off selected items",
  },
  {
    id: "bogo",
    name: "Buy One Get One",
    description: "BOGO offers to increase order value",
    icon: Gift,
    example: "Buy 2 get 1 free",
  },
  {
    id: "free-delivery",
    name: "Free Delivery",
    description: "Free shipping on qualifying orders",
    icon: Truck,
    example: "Free delivery over K 500",
  },
  {
    id: "flash-sale",
    name: "Flash Sale",
    description: "Limited time urgent promotions",
    icon: Zap,
    example: "Flash sale - 24 hours only",
  },
]

const sampleProducts = [
  { id: 1, name: "Handwoven Traditional Basket", price: "K 450", image: "🧺", category: "Home & Decor" },
  { id: 2, name: "Organic Shea Butter Soap Set", price: "K 280", image: "🧼", category: "Beauty & Care" },
  { id: 3, name: "Copper Wire Bracelet", price: "K 320", image: "📿", category: "Jewelry" },
  { id: 4, name: "Chitenge Fabric Bag", price: "K 380", image: "👜", category: "Fashion" },
  { id: 5, name: "Wooden Carved Elephant", price: "K 650", image: "🐘", category: "Art & Crafts" },
  { id: 6, name: "Traditional Pottery Vase", price: "K 420", image: "🏺", category: "Home & Decor" },
]

export function PromotionBuilder({ onClose }: PromotionBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [promotionData, setPromotionData] = useState({
    name: "",
    description: "",
    type: "",
    discountValue: "",
    selectedProducts: [] as number[],
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: "09:00",
    endTime: "23:59",
  })
  const [productSearch, setProductSearch] = useState("")

  const steps = [
    { number: 1, title: "Promotion Type", description: "Choose your promotion style" },
    { number: 2, title: "Select Products", description: "Pick products to include" },
    { number: 3, title: "Set Duration", description: "Choose when to run" },
    { number: 4, title: "Preview & Launch", description: "Review and activate" },
  ]

  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearch.toLowerCase()),
  )

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleProductToggle = (productId: number) => {
    setPromotionData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter((id) => id !== productId)
        : [...prev.selectedProducts, productId],
    }))
  }

  const selectedPromotionType = promotionTypes.find((type) => type.id === promotionData.type)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Promotions
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-3xl font-bold text-foreground">Create New Promotion</h1>
          <p className="text-muted-foreground">
            Step {currentStep} of 4 - {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors",
                  currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-sm">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && <div className="w-12 md:w-24 h-px bg-border mx-4" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="studio-card">
        <CardContent className="p-8">
          {/* Step 1: Promotion Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-2">Choose Promotion Type</h2>
                <p className="text-muted-foreground">Select the type of promotion that best fits your goals</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="promo-name">Promotion Name</Label>
                  <Input
                    id="promo-name"
                    placeholder="e.g., Summer Flash Sale"
                    value={promotionData.name}
                    onChange={(e) => setPromotionData((prev) => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="promo-description">Description (Optional)</Label>
                  <Textarea
                    id="promo-description"
                    placeholder="Brief description of your promotion"
                    value={promotionData.description}
                    onChange={(e) => setPromotionData((prev) => ({ ...prev, description: e.target.value }))}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Promotion Type</Label>
                <RadioGroup
                  value={promotionData.type}
                  onValueChange={(value) => setPromotionData((prev) => ({ ...prev, type: value }))}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {promotionTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <div key={type.id} className="relative">
                          <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                          <Label
                            htmlFor={type.id}
                            className={cn(
                              "flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-muted/30",
                              promotionData.type === type.id ? "border-primary bg-primary/5" : "border-border",
                            )}
                          >
                            <div
                              className={cn(
                                "p-2 rounded-lg",
                                promotionData.type === type.id ? "bg-primary text-primary-foreground" : "bg-muted",
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{type.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                              <p className="text-xs text-primary font-medium">{type.example}</p>
                            </div>
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>
              </div>

              {promotionData.type && (
                <div className="space-y-4">
                  <Label>Discount Value</Label>
                  {promotionData.type === "percentage" && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="20"
                        value={promotionData.discountValue}
                        onChange={(e) => setPromotionData((prev) => ({ ...prev, discountValue: e.target.value }))}
                        className="w-24"
                      />
                      <span className="text-muted-foreground">% off</span>
                    </div>
                  )}
                  {promotionData.type === "free-delivery" && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Free delivery on orders over K</span>
                      <Input
                        type="number"
                        placeholder="500"
                        value={promotionData.discountValue}
                        onChange={(e) => setPromotionData((prev) => ({ ...prev, discountValue: e.target.value }))}
                        className="w-24"
                      />
                    </div>
                  )}
                  {promotionData.type === "bogo" && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Buy one get one free will be applied automatically
                      </p>
                    </div>
                  )}
                  {promotionData.type === "flash-sale" && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="30"
                        value={promotionData.discountValue}
                        onChange={(e) => setPromotionData((prev) => ({ ...prev, discountValue: e.target.value }))}
                        className="w-24"
                      />
                      <span className="text-muted-foreground">% off (Flash Sale)</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Products */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-2">Select Products</h2>
                <p className="text-muted-foreground">Choose which products to include in this promotion</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Badge variant="secondary">{promotionData.selectedProducts.length} selected</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={cn(
                      "border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                      promotionData.selectedProducts.includes(product.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                    onClick={() => handleProductToggle(product.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={promotionData.selectedProducts.includes(product.id)}
                        onChange={() => handleProductToggle(product.id)}
                      />
                      <div className="flex-1">
                        <div className="text-2xl mb-2">{product.image}</div>
                        <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                        <p className="font-bold text-primary">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No products found matching your search</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Set Duration */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-2">Set Duration</h2>
                <p className="text-muted-foreground">Choose when your promotion will run</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !promotionData.startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {promotionData.startDate ? format(promotionData.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={promotionData.startDate}
                          onSelect={(date) => setPromotionData((prev) => ({ ...prev, startDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={promotionData.startTime}
                      onChange={(e) => setPromotionData((prev) => ({ ...prev, startTime: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !promotionData.endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {promotionData.endDate ? format(promotionData.endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={promotionData.endDate}
                          onSelect={(date) => setPromotionData((prev) => ({ ...prev, endDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={promotionData.endTime}
                      onChange={(e) => setPromotionData((prev) => ({ ...prev, endTime: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Duration Presets */}
              <div className="space-y-3">
                <Label>Quick Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "24 Hours", hours: 24 },
                    { label: "3 Days", hours: 72 },
                    { label: "1 Week", hours: 168 },
                    { label: "2 Weeks", hours: 336 },
                    { label: "1 Month", hours: 720 },
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const start = new Date()
                        const end = new Date(start.getTime() + preset.hours * 60 * 60 * 1000)
                        setPromotionData((prev) => ({
                          ...prev,
                          startDate: start,
                          endDate: end,
                        }))
                      }}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Preview & Launch */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-2">Preview & Launch</h2>
                <p className="text-muted-foreground">Review your promotion before launching</p>
              </div>

              {/* Promotion Preview */}
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-primary/5">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full mb-4">
                    {selectedPromotionType?.icon && <selectedPromotionType.icon className="h-4 w-4" />}
                    <span className="font-medium">{promotionData.name || "Your Promotion"}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold mb-2">
                    {promotionData.type === "percentage" && `${promotionData.discountValue}% OFF`}
                    {promotionData.type === "bogo" && "BUY ONE GET ONE FREE"}
                    {promotionData.type === "free-delivery" && "FREE DELIVERY"}
                    {promotionData.type === "flash-sale" && `FLASH SALE - ${promotionData.discountValue}% OFF`}
                  </h3>

                  {promotionData.description && (
                    <p className="text-muted-foreground mb-4">{promotionData.description}</p>
                  )}

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {promotionData.startDate && format(promotionData.startDate, "MMM dd")} -{" "}
                      {promotionData.endDate && format(promotionData.endDate, "MMM dd")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {promotionData.startTime} - {promotionData.endTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{promotionData.selectedProducts.length}</div>
                    <p className="text-sm text-muted-foreground">Products included</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {promotionData.startDate && promotionData.endDate
                        ? Math.ceil(
                            (promotionData.endDate.getTime() - promotionData.startDate.getTime()) /
                              (1000 * 60 * 60 * 24),
                          )
                        : 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Days duration</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{selectedPromotionType?.name.split(" ")[0]}</div>
                    <p className="text-sm text-muted-foreground">Promotion type</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-3">
          {currentStep === 4 ? (
            <>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                Save as Draft
              </Button>
              <Button className="gap-2 btn-studio-primary">
                <Rocket className="h-4 w-4" />
                Launch Promotion
              </Button>
            </>
          ) : (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!promotionData.name || !promotionData.type)) ||
                (currentStep === 2 && promotionData.selectedProducts.length === 0) ||
                (currentStep === 3 && (!promotionData.startDate || !promotionData.endDate))
              }
              className="gap-2 btn-studio-primary"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
