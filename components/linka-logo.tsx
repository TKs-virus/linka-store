"use client"

import { memo } from "react"
import Link from "next/link"

interface LinkaLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LinkaLogo = memo(function LinkaLogo({ 
  size = 'md', 
  className = '' 
}: LinkaLogoProps) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  }
  
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <div className="flex items-center gap-2">
        {/* Linka logo image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fff70a9d1d4c94f05abf49c16f38a3166%2Fc1466dbe53ca47d2aa868423f1920755?format=webp&width=800"
          alt="Linka Logo"
          width={size === 'sm' ? '36' : size === 'md' ? '48' : '56'}
          height={size === 'sm' ? '36' : size === 'md' ? '48' : '56'}
          className="transition-transform duration-200 group-hover:scale-105 relative"
          style={{
            objectFit: 'contain',
            background: 'transparent',
            top: '-2px'
          }}
        />
        
        {/* Linka text */}
        <span 
          className={`font-bold ${sizeClasses[size]} transition-all duration-200`}
          style={{
            background: 'linear-gradient(135deg, #ff6600 0%, #0099cc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(0, 153, 204, 0.2))'
          }}
        >
          Linka
        </span>
      </div>
    </Link>
  )
})
