"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Store, MessageSquare, TrendingUp, Package, Megaphone, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function RetailerStudioShowcase() {
  const features = [
    {
      icon: Store,
      title: "Storefront Management",
      description: "Live preview with real-time customization",
      color: "bg-gradient-to-br from-teal-500/20 to-teal-600/20 border-teal-500/30",
    },
    {
      icon: TrendingUp,
      title: "Smart Promotions",
      description: "AI-powered campaign builder with templates",
      color: "bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30",
    },
    {
      icon: MessageSquare,
      title: "Real-Time Messaging",
      description: "WhatsApp-style customer communication",
      color: "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30",
    },
    {
      icon: Megaphone,
      title: "Marketing Campaigns",
      description: "Email & social media automation tools",
      color: "bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Professional catalog with stock alerts",
      color: "bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Performance insights and growth metrics",
      color: "bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
    },
  ]

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-orange-50/50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-orange-500/10 backdrop-blur-sm border border-teal-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">New: Retailer Studio</span>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-700 border-orange-500/30">
              Beta
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance"
          >
            Empower Your Business with{" "}
            <span className="bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
              World-Class Tools
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 text-pretty"
          >
            Transform your small business into a professional operation with our comprehensive Retailer Studio. Get
            enterprise-level features designed specifically for SME vendors in Zambia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/retailer-studio" className="inline-flex items-center gap-2">
                Launch Retailer Studio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-orange-500/30 text-orange-700 hover:bg-orange-50 bg-transparent"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`p-6 h-full backdrop-blur-sm border-2 ${feature.color} hover:shadow-lg transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/50 group-hover:bg-white/70 transition-colors">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-br from-teal-500/5 via-white/50 to-orange-500/5 backdrop-blur-sm border-2 border-teal-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h3>
            <p className="text-gray-600 mb-6 text-pretty">
              Join thousands of SME vendors who are already using Retailer Studio to grow their businesses with
              professional tools and insights.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/retailer-studio" className="inline-flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
