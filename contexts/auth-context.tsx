"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "retailer"
  avatar?: string
  phone?: string
  location?: string
  businessName?: string
  verificationStatus?: "pending" | "verified" | "rejected"
  joinedAt: string
  isDemo?: boolean
  supabaseUser?: SupabaseUser
  profile?: {
    first_name?: string
    last_name?: string
    phone?: string
    avatar_url?: string
    user_type?: "customer" | "retailer"
    address?: string
    city?: string
    state?: string
    zip?: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  getRoleBasedRedirectUrl: (user: User) => string
  signInDemo: (role: "customer" | "retailer") => Promise<{ success: boolean; user: User }>
}

interface SignupData {
  email: string
  password: string
  name: string
  role: "customer" | "retailer"
  phone?: string
  businessName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setIsLoading(false)
          return
        }

        if (session?.user) {
          await loadUserProfile(session.user)
        }

        // Listen for auth changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "SIGNED_IN" && session?.user) {
            await loadUserProfile(session.user)
          } else if (event === "SIGNED_OUT") {
            setUser(null)
          }
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", supabaseUser.id).single()

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        console.error("Error loading profile:", error)
      }

      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        name: profile
          ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
          : supabaseUser.email?.split("@")[0] || "",
        role: profile?.user_type || "customer",
        avatar: profile?.avatar_url,
        phone: profile?.phone,
        location: profile?.city && profile?.state ? `${profile.city}, ${profile.state}` : undefined,
        verificationStatus: "verified",
        joinedAt: supabaseUser.created_at,
        supabaseUser,
        profile,
      }

      setUser(userData)
    } catch (error) {
      console.error("Error loading user profile:", error)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/customer-dashboard`,
        },
      })

      if (error) {
        setIsLoading(false)
        return { success: false, error: error.message }
      }

      if (data.user) {
        await loadUserProfile(data.user)
        setIsLoading(false)
        return { success: true, user }
      }

      setIsLoading(false)
      return { success: false, error: "Login failed" }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/customer-dashboard`,
          data: {
            first_name: data.name.split(" ")[0],
            last_name: data.name.split(" ").slice(1).join(" "),
            user_type: data.role,
            phone: data.phone,
            business_name: data.businessName,
          },
        },
      })

      setIsLoading(false)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Signup failed. Please try again." }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "No user logged in" }

    try {
      const profileUpdate: any = {}

      if (data.name) {
        const nameParts = data.name.split(" ")
        profileUpdate.first_name = nameParts[0]
        profileUpdate.last_name = nameParts.slice(1).join(" ")
      }

      if (data.phone) profileUpdate.phone = data.phone
      if (data.avatar) profileUpdate.avatar_url = data.avatar
      if (data.location) {
        const [city, state] = data.location.split(", ")
        profileUpdate.city = city
        profileUpdate.state = state
      }

      const { error } = await supabase.from("profiles").update(profileUpdate).eq("id", user.id)

      if (error) {
        return { success: false, error: error.message }
      }

      // Reload user profile
      if (user.supabaseUser) {
        await loadUserProfile(user.supabaseUser)
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: "Profile update failed. Please try again." }
    }
  }

  const getRoleBasedRedirectUrl = (user: User): string => {
    switch (user.role) {
      case "customer":
        return "/customer-dashboard"
      case "retailer":
        return "/retailer/studio"
      default:
        return "/customer-dashboard"
    }
  }

  const signInDemo = async (role: "customer" | "retailer"): Promise<{ success: boolean; user: User }> => {
    const demoUser: User = {
      id: "demo-" + role,
      email: role === "retailer" ? "demo.retailer@linka.zm" : "demo.customer@linka.zm",
      name: role === "retailer" ? "Demo Retailer" : "Demo Customer",
      role,
      avatar: "/placeholder.svg?height=100&width=100",
      location: "Zambia",
      businessName: role === "retailer" ? "Demo Store" : undefined,
      verificationStatus: "verified",
      joinedAt: new Date().toISOString(),
      isDemo: true,
    }
    setUser(demoUser)
    return { success: true, user: demoUser }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        getRoleBasedRedirectUrl,
        signInDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
