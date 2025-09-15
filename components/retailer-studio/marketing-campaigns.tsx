"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CampaignOverview } from "./campaign-overview"
import { CampaignBuilder } from "./campaign-builder"
import { CampaignAnalytics } from "./campaign-analytics"
import { EmailTemplates } from "./email-templates"
import { SocialMediaTools } from "./social-media-tools"
import { Plus, Search, Filter, TrendingUp, Mail, Share2, BarChart3, Lightbulb } from "lucide-react"

export function MarketingCampaigns() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showBuilder, setShowBuilder] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  if (showBuilder) {
    return <CampaignBuilder onClose={() => setShowBuilder(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Marketing Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Create professional marketing campaigns to grow your business and reach more customers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-2">
            <TrendingUp className="h-3 w-3" />5 Active Campaigns
          </Badge>

          <Button onClick={() => setShowBuilder(true)} className="gap-2 btn-studio-primary animate-pulse-orange">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2">
              <Share2 className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-background/50"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="overview">
          <CampaignOverview searchQuery={searchQuery} onCreateNew={() => setShowBuilder(true)} />
        </TabsContent>

        <TabsContent value="email">
          <EmailTemplates />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaTools />
        </TabsContent>

        <TabsContent value="analytics">
          <CampaignAnalytics />
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="studio-card">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-secondary" />
                  AI Campaign Suggestions
                </CardTitle>
                <CardDescription>Personalized recommendations to improve your marketing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Optimal Timing</span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Your customers are most active on weekends between 2-6 PM. Schedule your next campaign for Saturday
                    afternoon.
                  </p>
                  <Button size="sm" variant="outline" className="text-green-700 border-green-300 bg-transparent">
                    Schedule Campaign
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Product Focus</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Your handwoven baskets have 40% higher engagement. Feature them in your next social media campaign.
                  </p>
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 bg-transparent">
                    Create Post
                  </Button>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Email Strategy</span>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">
                    Customers who receive welcome emails spend 25% more. Set up an automated welcome series.
                  </p>
                  <Button size="sm" variant="outline" className="text-purple-700 border-purple-300 bg-transparent">
                    Setup Automation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="studio-card">
              <CardHeader>
                <CardTitle className="font-heading">Trending Hashtags</CardTitle>
                <CardDescription>Popular hashtags for your industry this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { tag: "#HandmadeInZambia", posts: "2.3K", trend: "+15%" },
                    { tag: "#SupportLocal", posts: "1.8K", trend: "+22%" },
                    { tag: "#AfricanCrafts", posts: "3.1K", trend: "+8%" },
                    { tag: "#EcoFriendly", posts: "4.2K", trend: "+12%" },
                    { tag: "#SmallBusiness", posts: "5.7K", trend: "+18%" },
                    { tag: "#TraditionalArt", posts: "1.2K", trend: "+25%" },
                  ].map((hashtag, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-primary">{hashtag.tag}</p>
                        <p className="text-xs text-muted-foreground">{hashtag.posts} posts this week</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{hashtag.trend}</p>
                        <Button size="sm" variant="ghost" className="h-6 text-xs">
                          Use
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
