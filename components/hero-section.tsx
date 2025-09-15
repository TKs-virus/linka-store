"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative pt-8 pb-20 sm:pt-10 sm:pb-24 md:pt-12 md:pb-32 lg:pt-16 lg:pb-40 overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 z-10">
        {/* Tagline Bar */}
        <div className="mb-1 text-center">
          <div
            className="inline-flex items-center rounded-full px-8 py-4 text-sm backdrop-blur-lg transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
              border: '1px solid rgba(0, 153, 204, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 153, 204, 0.12), 0 1px 0 rgba(255, 255, 255, 0.8) inset'
            }}
          >
            <span className="mr-3 text-lg">📍</span>
            <span style={{color: '#333333'}} className="font-medium">Connecting local businesses with customers.</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <div className="flex flex-wrap items-baseline justify-center gap-x-4 mb-2">
              <div style={{color: '#000000'}}>Your Local</div>
              <div
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(135deg, #ff6600 0%, #0099cc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 153, 204, 0.1))'
                }}
              >
                E-commerce
              </div>
            </div>
            <div style={{color: '#000000'}}>Platform</div>
          </h1>
        </div>

        {/* Subheading */}
        <div className="text-center mb-16">
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
            style={{color: '#333333'}}
          >
            Discover amazing products from local retailers in your area. Support your
            community while enjoying fast delivery and personalized service.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/marketplace">
            <Button
              size="lg"
              className="px-10 py-5 text-xl font-bold rounded-xl border-none transition-all duration-200 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #0099cc 0%, #ff6600 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 32px rgba(0, 153, 204, 0.3)'
              }}
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Start Shopping
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
})
