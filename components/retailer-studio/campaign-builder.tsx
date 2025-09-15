"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Wand2,
  Target,
  CalendarIcon,
  Mail,
  MessageSquare,
  Instagram,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const campaignTypes = [
  {
    id: "email",
    name: "Email Campaign",
    description: "Send targeted emails to your customers",
    icon: Mail,
    color: "bg-blue-500",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Create posts for Facebook and Instagram",
    icon: Instagram,
    color: "bg-pink-500",
  },
  {
    id: "sms",
    name: "SMS Campaign",
    description: "Send text messages to customers",
    icon: MessageSquare,
    color: "bg-green-500",
  },
  {
    id: "combined",
    name: "Multi-Channel",
    description: "Combine email, social, and SMS",
    icon: Target,
    color: "bg-purple-500",
  },
]

const audienceSegments = [
  { id: "all", name: "All Customers", count: 1247 },
  { id: "frequent", name: "Frequent Buyers", count: 156 },
  { id: "new", name: "New Customers", count: 89 },
  { id: "inactive", name: "Inactive Customers", count: 234 },
  { id: "high_value", name: "High Value Customers", count: 67 },
]

const steps = [
  { id: 1, name: "Campaign Type", description: "Choose your campaign channel" },
  { id: 2, name: "Audience", description: "Select your target audience" },
  { id: 3, name: "Content", description: "Create your campaign content" },
  { id: 4, name: "Schedule", description: "Set timing and budget" },
  { id: 5, name: "Review", description: "Review and launch" },
]

export function CampaignBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    type: "",
    name: "",
    audience: [],
    content: {
      subject: "",
      message: "",
      cta: "",
    },
    schedule: {
      startDate: null,
      endDate: null,
      budget: "",
    },
  })

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Choose Campaign Type</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select the channel you want to use for your marketing campaign
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaignTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      campaignData.type === type.id ? "ring-2 ring-primary" : "",
                    )}
                    onClick={() => setCampaignData({ ...campaignData, type: type.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${type.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{type.name}</h4>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Target Audience</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose which customer segments to target with your campaign
              </p>
            </div>
            <div className="space-y-3">
              {audienceSegments.map((segment) => (
                <div key={segment.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-card/50">
                  <Checkbox
                    id={segment.id}
                    checked={campaignData.audience.includes(segment.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCampaignData({
                          ...campaignData,
                          audience: [...campaignData.audience, segment.id],
                        })
                      } else {
                        setCampaignData({
                          ...campaignData,
                          audience: campaignData.audience.filter((id) => id !== segment.id),
                        })
                      }
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor={segment.id} className="font-semibold cursor-pointer">
                      {segment.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{segment.count} customers</p>
                  </div>
                  <Badge variant="outline">{segment.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Create Campaign Content</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Write compelling content that will engage your audience
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="Enter campaign name"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter subject line"
                  value={campaignData.content.subject}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      content: { ...campaignData.content, subject: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your campaign message..."
                  rows={6}
                  value={campaignData.content.message}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      content: { ...campaignData.content, message: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cta">Call to Action</Label>
                <Input
                  id="cta"
                  placeholder="e.g., Shop Now, Learn More"
                  value={campaignData.content.cta}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      content: { ...campaignData.content, cta: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            {/* AI Suggestions */}
            <Card className="glass-card border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-primary">AI Content Suggestions</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    💡 Try: "Discover handcrafted treasures that tell a story" for your subject line
                  </p>
                  <p className="text-muted-foreground">
                    🎯 Tip: Mention "limited time" or "exclusive" to create urgency
                  </p>
                  <p className="text-muted-foreground">
                    ✨ CTA: "Shop Authentic Crafts" performs 23% better than generic CTAs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Schedule & Budget</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set when your campaign should run and how much to spend
              </p>
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
                          "w-full justify-start text-left font-normal",
                          !campaignData.schedule.startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {campaignData.schedule.startDate ? (
                          format(campaignData.schedule.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={campaignData.schedule.startDate}
                        onSelect={(date) =>
                          setCampaignData({
                            ...campaignData,
                            schedule: { ...campaignData.schedule, startDate: date },
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>End Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !campaignData.schedule.endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {campaignData.schedule.endDate ? (
                          format(campaignData.schedule.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={campaignData.schedule.endDate}
                        onSelect={(date) =>
                          setCampaignData({
                            ...campaignData,
                            schedule: { ...campaignData.schedule, endDate: date },
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget">Budget (K)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="0.00"
                    value={campaignData.schedule.budget}
                    onChange={(e) =>
                      setCampaignData({
                        ...campaignData,
                        schedule: { ...campaignData.schedule, budget: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Estimated Reach</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Audience Size:</span>
                      <span className="font-semibold">
                        {campaignData.audience.reduce((total, segmentId) => {
                          const segment = audienceSegments.find((s) => s.id === segmentId)
                          return total + (segment?.count || 0)
                        }, 0)}{" "}
                        customers
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected CTR:</span>
                      <span className="font-semibold">4.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Clicks:</span>
                      <span className="font-semibold text-primary">
                        {Math.round(
                          campaignData.audience.reduce((total, segmentId) => {
                            const segment = audienceSegments.find((s) => s.id === segmentId)
                            return total + (segment?.count || 0)
                          }, 0) * 0.042,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Review Campaign</h3>
              <p className="text-sm text-muted-foreground mb-4">Review your campaign details before launching</p>
            </div>
            <div className="space-y-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Campaign Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Campaign Name:</p>
                      <p className="font-semibold">{campaignData.name || "Untitled Campaign"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type:</p>
                      <p className="font-semibold">
                        {campaignTypes.find((t) => t.id === campaignData.type)?.name || "Not selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Audience:</p>
                      <p className="font-semibold">
                        {campaignData.audience.reduce((total, segmentId) => {
                          const segment = audienceSegments.find((s) => s.id === segmentId)
                          return total + (segment?.count || 0)
                        }, 0)}{" "}
                        customers
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Budget:</p>
                      <p className="font-semibold">K{campaignData.schedule.budget || "0"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Content Preview</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Subject:</p>
                      <p className="font-semibold">{campaignData.content.subject || "No subject"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Message:</p>
                      <p className="text-muted-foreground">{campaignData.content.message || "No message content"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Call to Action:</p>
                      <Badge variant="outline">{campaignData.content.cta || "No CTA"}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Campaign Builder</h2>
            <Badge variant="outline">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold",
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("w-12 h-0.5 mx-2", currentStep > step.id ? "bg-primary" : "bg-muted")} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="glass-card">
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <div className="flex gap-2">
          {currentStep < steps.length ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Wand2 className="w-4 h-4 mr-1" />
              Launch Campaign
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
