import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, Hash, TrendingUp, Users, Lightbulb } from "lucide-react"

const suggestions = [
  {
    type: "timing",
    title: "Optimal Posting Time",
    description: "Your audience is most active on Tuesdays at 2-4 PM",
    impact: "high",
    action: "Schedule next post",
    icon: Clock,
  },
  {
    type: "product",
    title: "Feature Trending Product",
    description: "Handwoven baskets are trending +45% this week",
    impact: "high",
    action: "Create campaign",
    icon: TrendingUp,
  },
  {
    type: "hashtags",
    title: "Hashtag Optimization",
    description: "#ZambianCrafts #HandmadeWithLove are performing well",
    impact: "medium",
    action: "Use in next post",
    icon: Hash,
  },
  {
    type: "audience",
    title: "Audience Expansion",
    description: "Target similar audiences to your best customers",
    impact: "medium",
    action: "Expand targeting",
    icon: Users,
  },
]

export function AISuggestions() {
  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Marketing Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card/50">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                    <Badge variant={suggestion.impact === "high" ? "default" : "secondary"} className="text-xs">
                      {suggestion.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <Lightbulb className="w-3 h-3 mr-1" />
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
