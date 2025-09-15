"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  Share2,
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  Edit,
  Pause,
  Play,
  Trash2,
  MoreHorizontal,
} from "lucide-react"

interface CampaignOverviewProps {
  searchQuery: string
  onCreateNew: () => void
}

const campaigns = [
  {
    id: 1,
    name: "Summer Collection Launch",
    type: "Email + Social",
    status: "active",
    channel: ["email", "facebook", "instagram"],
    budget: 500,
    spent: 320,
    reach: 12450,
    engagement: 892,
    conversions: 45,
    revenue: 8920,
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    progress: 65,
    ctr: 7.2,
  },
  {
    id: 2,
    name: "Customer Testimonials",
    type: "Social Media",
    status: "active",
    channel: ["facebook", "instagram"],
    budget: 200,
    spent: 85,
    reach: 5680,
    engagement: 456,
    conversions: 18,
    revenue: 2340,
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    progress: 40,
    ctr: 8.1,
  },
  {
    id: 3,
    name: "Welcome Email Series",
    type: "Email Automation",
    status: "active",
    channel: ["email"],
    budget: 0,
    spent: 0,
    reach: 234,
    engagement: 156,
    conversions: 23,
    revenue: 1890,
    startDate: "2024-01-01",
    endDate: "Ongoing",
    progress: 100,
    ctr: 12.5,
  },
  {
    id: 4,
    name: "Flash Sale Announcement",
    type: "Multi-Channel",
    status: "scheduled",
    channel: ["email", "facebook", "instagram"],
    budget: 300,
    spent: 0,
    reach: 0,
    engagement: 0,
    conversions: 0,
    revenue: 0,
    startDate: "2024-02-01",
    endDate: "2024-02-03",
    progress: 0,
    ctr: 0,
  },
  {
    id: 5,
    name: "Holiday Gift Guide",
    type: "Email Campaign",
    status: "completed",
    channel: ["email"],
    budget: 150,
    spent: 150,
    reach: 8920,
    engagement: 1245,
    conversions: 89,
    revenue: 15680,
    startDate: "2023-12-15",
    endDate: "2023-12-25",
    progress: 100,
    ctr: 14.2,
  },
]

export function CampaignOverview({ searchQuery, onCreateNew }: CampaignOverviewProps) {
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0)
  const avgCTR = campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-3 w-3" />
      case "facebook":
        return <Share2 className="h-3 w-3" />
      case "instagram":
        return <Share2 className="h-3 w-3" />
      default:
        return <Share2 className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">K {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all campaigns</p>
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget Used</CardTitle>
            <Eye className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">
              K {totalSpent} / K {totalBudget}
            </div>
            <Progress value={(totalSpent / totalBudget) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="studio-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. CTR</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{avgCTR.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Click-through rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="studio-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading">All Campaigns</CardTitle>
              <CardDescription>Manage your marketing campaigns and track performance</CardDescription>
            </div>
            <Button onClick={onCreateNew} className="gap-2 btn-studio-primary">
              <TrendingUp className="h-4 w-4" />
              New Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                {/* Status Indicator */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      campaign.status === "active"
                        ? "bg-green-500 animate-pulse"
                        : campaign.status === "scheduled"
                          ? "bg-blue-500"
                          : campaign.status === "completed"
                            ? "bg-gray-500"
                            : "bg-red-500"
                    }`}
                  />
                  <Badge
                    variant={
                      campaign.status === "active"
                        ? "default"
                        : campaign.status === "scheduled"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {campaign.status}
                  </Badge>
                </div>

                {/* Campaign Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-lg font-heading">{campaign.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {campaign.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {campaign.channel.map((ch, index) => (
                        <div key={index} className="p-1 bg-muted rounded">
                          {getChannelIcon(ch)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-medium">
                        K {campaign.spent} / K {campaign.budget || "∞"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reach</p>
                      <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-medium">{campaign.engagement}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversions</p>
                      <p className="font-medium text-green-600">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium text-green-600">K {campaign.revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {campaign.status === "active" && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Campaign Progress</span>
                        <span>CTR: {campaign.ctr}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>

                  {campaign.status === "active" ? (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : campaign.status === "scheduled" ? (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : null}

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-lg font-medium mb-2">No campaigns found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Create your first marketing campaign to grow your business"}
              </p>
              <Button onClick={onCreateNew} className="gap-2 btn-studio-primary">
                <TrendingUp className="h-4 w-4" />
                Create Campaign
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
