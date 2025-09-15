"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Scissors, Star, Users, ShoppingBag, Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  {
    icon: Palette,
    title: "Premium Quality Fabrics",
    description: "Sourced from trusted suppliers with quality guarantee",
  },
  {
    icon: Scissors,
    title: "Expert Tailoring",
    description: "Skilled artisans with years of experience",
  },
  {
    icon: Star,
    title: "Customer Satisfaction",
    description: "4.8+ average rating from thousands of customers",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Supporting local businesses and artisans",
  },
]

const stats = [
  { number: "500+", label: "Happy Customers" },
  { number: "50+", label: "Expert Tailors" },
  { number: "1000+", label: "Fabric Varieties" },
  { number: "4.8", label: "Average Rating" },
]

export default function TextilesCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-4">
            Start Your Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Create Something Beautiful?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you need premium fabrics or expert tailoring services, we're here to bring your vision to life
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Browse Fabrics
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Scissors className="h-5 w-5 mr-2" />
              Find a Tailor
            </Button>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center h-full bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by the Community</h3>
            <p className="text-gray-600">Join thousands of satisfied customers who trust us for their textile needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Need Custom Solutions?</h3>
              <p className="text-blue-100 mb-6">
                Have specific requirements? Our team is ready to help you find the perfect fabrics and tailoring
                services for your unique needs.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Custom fabric orders</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Bulk pricing available</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Expert consultation</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="h-5 w-5 mr-2" />
                Call Us: +260 97 123 4567
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email: info@textiles.zm
              </Button>
              <div className="flex items-center justify-center gap-2 text-blue-100">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Visit our showroom in Lusaka</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
