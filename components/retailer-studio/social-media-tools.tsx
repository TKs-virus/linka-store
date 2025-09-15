"use client"

import { useState } from "react"

const socialPosts = [
  {
    id: 1,
    platform: "facebook",
    content:
      "🧺 New handwoven baskets just arrived! Each one tells a story of traditional Zambian craftsmanship. Perfect for your home or as a thoughtful gift. #HandmadeInZambia #SupportLocal",
    image: "/handwoven-basket.png",
    scheduled: "2024-01-25 14:00",
    status: "scheduled",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: 2,
    platform: "instagram",
    content:
      "✨ Behind the scenes: Watch our artisans create magic with their hands. Every stitch, every weave tells a story of heritage and skill. 🇿🇲 #AfricanCrafts #Handmade #TraditionalArt",
    image: "/handwoven-basket.png",
    scheduled: "2024-01-24 16:30",
    status: "published",
    engagement: { likes: 45, comments: 8, shares: 12 },
  },
  {
    id: 3,
    platform: "facebook",
    content:
      "🌿 Eco-friendly, sustainable, and beautiful. Our organic soap collection is made with natural ingredients sourced locally. Treat your skin to the best of nature! #EcoFriendly #NaturalSkincare",
    image: "/handwoven-basket.png",
    scheduled: "2024-01-23 10:00",
    status: "published",
    engagement: { likes: 67, comments: 15, shares: 23 },
  },
]

export function SocialMediaTools() {
  const [selectedPlatform, setSelectedPlatform] = useState("facebook")
  const [postContent, setPostContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const generatePost = (product: string) => {
    const templates = {
      facebook: [\
