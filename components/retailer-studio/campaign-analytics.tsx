import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Eye,
  MousePointer,
  ShoppingCart,
  Users,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
} from "lucide-react"

const campaignData = [
  {
    id: 1,
    name: "Summer Collection Launch",
    type: "Email + Social",
    status: "active",
    budget: 2500,
    spent: 1850,
    reach: 12500,
    impressions: 45600,
    clicks: 2340,
    conversions: 156,
    revenue: 18750,
    ctr: 5.1,
    conversionRate: 6.7,
    roas: 10.1,
  },
  {
    id: 2,
    name: "Flash Sale Weekend",
    type: "Social Media",
    status: "completed",
    budget: 800,
    spent: 800,
    reach: 8200,
    impressions: 28400,
    clicks: 1420,
    conversions: 89,
    revenue: 6750,
    ctr: 5.0,
    conversionRate: 6.3,
    roas: 8.4,
  },
]

export function CampaignAnalytics() {
  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold text-primary">20.7K</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% vs last month
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold text-primary">5.1%</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +0.8% vs last month
                </p>
              </div>
              <div className="p-2 bg-accent/10 rounded-lg">
                <MousePointer className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold text-primary">245</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18.2% vs last month
                </p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-primary">K25.5K</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +22.1% vs last month
                </p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {campaignData.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">{campaign.type}</p>
                  </div>
                  <Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-semibold">K{campaign.budget}</p>
                    <Progress value={(campaign.spent / campaign.budget) * 100} className="mt-1 h-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reach</p>
                    <p className="font-semibold">{campaign.reach.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CTR</p>
                    <p className="font-semibold text-primary">{campaign.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ROAS</p>
                    <p className="font-semibold text-emerald-600">{campaign.roas}x</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  {campaign.status === "active" && (
                    <Button variant="outline" size="sm">
                      <Target className="w-4 h-4 mr-1" />
                      Optimize
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            AI Marketing Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="font-semibold text-primary mb-2">🎯 Optimization Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Your "Summer Collection" campaign performs 23% better on weekends. Consider increasing weekend budget
                allocation for better ROI.
              </p>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
              <h4 className="font-semibold text-accent mb-2">📱 Channel Insight</h4>
              <p className="text-sm text-muted-foreground">
                Instagram Stories generate 2.3x higher engagement than feed posts. Try creating more story content for
                your handcrafted products.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-700 mb-2">💡 Content Suggestion</h4>
              <p className="text-sm text-muted-foreground">
                Behind-the-scenes content of your crafting process gets 40% more engagement. Consider showcasing your
                artisan skills in upcoming campaigns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
