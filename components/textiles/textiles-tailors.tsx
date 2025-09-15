"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Phone, Calendar, Scissors, Award } from "lucide-react"

interface Tailor {
  id: string
  name: string
  specialties: string[]
  experience: string
  rating: number
  reviews: number
  image: string
  location: string
  priceRange: string
  turnaroundTime: string
  verified: boolean
  services: string[]
  contact: {
    phone: string
    whatsapp: string
  }
  availability: string
}

const tailorsData: Tailor[] = [
  {
    id: "tailor-001",
    name: "Master John Mwanza",
    specialties: ["Traditional Wear", "Ceremonial Attire", "Custom Suits"],
    experience: "15+ years",
    rating: 4.9,
    reviews: 234,
    image: "/api/placeholder/300/300",
    location: "Lusaka Central",
    priceRange: "ZMW 150 - 500",
    turnaroundTime: "3-7 days",
    verified: true,
    services: ["Alterations", "Custom Design", "Repairs", "Fittings"],
    contact: {
      phone: "+260 97 123 4567",
      whatsapp: "+260 97 123 4567",
    },
    availability: "Mon-Sat 8AM-6PM",
  },
  {
    id: "tailor-002",
    name: "Grace Banda Tailoring",
    specialties: ["Women's Fashion", "Traditional Dresses", "Modern Styles"],
    experience: "12+ years",
    rating: 4.8,
    reviews: 189,
    image: "/api/placeholder/300/300",
    location: "Kitwe",
    priceRange: "ZMW 120 - 400",
    turnaroundTime: "2-5 days",
    verified: true,
    services: ["Custom Dresses", "Alterations", "Bridal Wear", "Casual Wear"],
    contact: {
      phone: "+260 96 234 5678",
      whatsapp: "+260 96 234 5678",
    },
    availability: "Mon-Fri 9AM-5PM",
  },
  {
    id: "tailor-003",
    name: "Heritage Crafts Studio",
    specialties: ["Cultural Attire", "Ceremonial Wear", "Traditional Patterns"],
    experience: "20+ years",
    rating: 4.9,
    reviews: 156,
    image: "/api/placeholder/300/300",
    location: "Ndola",
    priceRange: "ZMW 200 - 600",
    turnaroundTime: "5-10 days",
    verified: true,
    services: ["Cultural Designs", "Custom Embroidery", "Traditional Patterns", "Ceremonial Wear"],
    contact: {
      phone: "+260 95 345 6789",
      whatsapp: "+260 95 345 6789",
    },
    availability: "Mon-Sat 8AM-7PM",
  },
]

export default function TextilesTailors() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scissors className="h-8 w-8 text-green-600" />
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Expert Tailors
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Tailoring Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with skilled tailors who specialize in traditional and modern clothing
          </p>
        </motion.div>

        {/* Tailors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tailorsData.map((tailor, index) => (
            <motion.div
              key={tailor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white">
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={tailor.image || "/placeholder.svg"}
                      alt={tailor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {tailor.verified && (
                      <Badge className="bg-green-600 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge className="bg-blue-600 text-white">{tailor.experience}</Badge>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{tailor.rating}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tailor.name}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{tailor.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{tailor.rating}</span>
                    <span className="text-sm text-gray-500">({tailor.reviews} reviews)</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tailor.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Price Range:</span>
                      <span className="text-sm font-medium">{tailor.priceRange}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Turnaround:</span>
                      <span className="text-sm font-medium">{tailor.turnaroundTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tailor.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{tailor.availability}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="px-3 bg-transparent">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <Scissors className="h-12 w-12 mx-auto mb-6 text-white" />
          <h3 className="text-3xl font-bold mb-4">Join Our Tailor Network</h3>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Are you a skilled tailor? Join our platform and connect with customers looking for quality tailoring
            services
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
            Register as Tailor
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
