"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Activity, MessageCircle, ShoppingCart, Heart } from "lucide-react"

interface CustomerInsightsProps {
  detailed?: boolean
}

const recentActivity = [
  {
    type: "purchase",
    customer: "Sarah M.",
    action: "purchased Handwoven Basket",
    time: "2 minutes ago",
    amount: "K 450",
    avatar: "SM",
  },
  {
    type: "cart",
    customer: "John K.",
    action: "added Soap Set to cart",
    time: "5 minutes ago",
    avatar: "JK",
  },
  {
    type: "view",
    customer: "Mary L.",
    action: "viewed Copper Bracelet",
    time: "8 minutes ago",
    avatar: "ML",
  },
  {
    type: "message",
    customer: "David C.",
    action: "sent you a message",
    time: "12 minutes ago",
    avatar: "DC",
  },
  {
    type: "favorite",
    customer: "Grace N.",
    action: "favorited your store",
    time: "15 minutes ago",
    avatar: "GN",
  },
]

const insights = [
  {
    title: "Most Viewed Product",
    value: "Handwoven Basket",
    metric: "234 views today",
  },
  {
    title: "Peak Shopping Time",
    value: "2:00 PM - 4:00 PM",
    metric: "40% of daily traffic",
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5.0",
    metric: "Based on 156 reviews",
  },
]

export function CustomerInsights({ detailed = false }: CustomerInsightsProps) {
  if (detailed) {
    return (
      <div className="space-y-6">
        <Card className="studio-card">
          <CardHeader>
            <CardTitle className="font-heading">Customer Insights</CardTitle>
            <CardDescription>Detailed customer behavior and engagement data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Insights */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Key Insights</h4>
              {insights.map((insight, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{insight.title}</span>
                  </div>
                  <div className="text-lg font-bold text-primary mb-1">{insight.value}</div>
                  <div className="text-xs text-muted-foreground">{insight.metric}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Recent Customer Activity</h4>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => {
                  const getIcon = () => {
                    switch (activity.type) {
                      case "purchase":
                        return <ShoppingCart className="h-4 w-4 text-green-600" />
                      case "cart":
                        return <ShoppingCart className="h-4 w-4 text-blue-600" />
                      case "view":
                        return <Activity className="h-4 w-4 text-purple-600" />
                      case "message":
                        return <MessageCircle className="h-4 w-4 text-orange-600" />
                      case "favorite":
                        return <Heart className="h-4 w-4 text-red-600" />
                      default:
                        return <Activity className="h-4 w-4" />
                    }
                  }

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-muted/30 rounded-lg transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.customer}</span> {activity.action}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                          {activity.amount && (
                            <Badge variant="secondary" className="text-xs">
                              {activity.amount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {getIcon()}
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card className="studio-card">
      <CardHeader>
        <CardTitle className="font-heading">Live Customer Activity</CardTitle>
        <CardDescription>Real-time customer interactions with your store</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivity.slice(0, 4).map((activity, index) => {
            const getIcon = () => {
              switch (activity.type) {
                case "purchase":
                  return <ShoppingCart className="h-3 w-3 text-green-600" />
                case "cart":
                  return <ShoppingCart className="h-3 w-3 text-blue-600" />
                case "view":
                  return <Activity className="h-3 w-3 text-purple-600" />
                case "message":
                  return <MessageCircle className="h-3 w-3 text-orange-600" />
                case "favorite":
                  return <Heart className="h-3 w-3 text-red-600" />
                default:
                  return <Activity className="h-3 w-3" />
              }
            }

            return (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{activity.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs">
                    <span className="font-medium">{activity.customer}</span> {activity.action}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    {activity.amount && (
                      <Badge variant="secondary" className="text-xs h-4">
                        {activity.amount}
                      </Badge>
                    )}
                  </div>
                </div>
                {getIcon()}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
