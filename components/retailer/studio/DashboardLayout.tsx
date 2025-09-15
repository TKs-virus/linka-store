"use client"

import { type ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LinkaLogo } from "@/components/linka-logo"
import {
  LayoutDashboard,
  Boxes,
  MessageSquare,
  Tag,
  Megaphone,
  BarChart3,
  Store,
  Bell,
  Settings,
  SearchIcon,
  Plus,
  Sparkles,
  UserIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { StudioSection } from "@/app/retailer/studio/page"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { ContextPanel } from "./ContextPanel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  active: StudioSection
  onSelect: (s: StudioSection) => void
  title: string
  subtitle?: string
  children: ReactNode
}

const items: { key: StudioSection; label: string; Icon: any }[] = [
  { key: "overview", label: "Dashboard", Icon: LayoutDashboard },
  { key: "inventory", label: "Inventory", Icon: Boxes },
  { key: "messages", label: "Messages", Icon: MessageSquare },
  { key: "promotions", label: "Promotions", Icon: Tag },
  { key: "marketing", label: "Marketing", Icon: Megaphone },
  { key: "analytics", label: "Analytics", Icon: BarChart3 },
  { key: "storefront", label: "Storefront", Icon: Store },
  { key: "notifications", label: "Notifications", Icon: Bell },
  { key: "settings", label: "Settings", Icon: Settings },
]

export function DashboardLayout({ active, onSelect, title, subtitle, children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightOpen, setRightOpen] = useState(true)
  const [notifCount] = useState(3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(closest-side, hsl(180, 100%, 25%), transparent)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-10 right-0 h-96 w-96 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, hsl(18, 95%, 56%), transparent)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(closest-side, hsl(180, 100%, 35%), transparent)" }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div
        className={`grid transition-all duration-300 ${sidebarCollapsed ? "grid-cols-[80px,1fr]" : "grid-cols-[280px,1fr]"} md:${sidebarCollapsed ? "grid-cols-[80px,1fr]" : "grid-cols-[320px,1fr]"}`}
      >
        <motion.aside
          className="hidden md:flex h-screen sticky top-0 flex-col glass-sidebar"
          animate={{ width: sidebarCollapsed ? 80 : 320 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <LinkaLogo size="md" />
                  <div className="text-xs font-semibold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
                    Retailer Studio
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4 text-slate-600" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-slate-600" />
              )}
            </motion.button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            {items.map(({ key, label, Icon }, index) => (
              <motion.button
                key={key}
                onClick={() => onSelect(key)}
                className={`group flex w-full items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all relative ${
                  active === key ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                }`}
                aria-current={active === key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                {active === key && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-orange-500 rounded-r-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <motion.span
                  className={`relative grid h-10 w-10 place-items-center rounded-xl border transition-all ${
                    active === key
                      ? "bg-gradient-to-br from-teal-500 to-orange-500 text-white border-transparent shadow-lg animate-glowPulse"
                      : "border-slate-200 group-hover:border-slate-300 group-hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.span>

                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {label}
                  </div>
                )}
              </motion.button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                className="px-5 py-4 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <motion.div
                  className="rounded-xl border border-white/20 p-3 bg-gradient-to-r from-teal-500/10 to-orange-500/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-600 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Tips
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    Use panels to manage your store efficiently
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        <PanelGroup direction="horizontal" className="min-h-screen">
          <Panel defaultSize={rightOpen ? 70 : 100} minSize={50}>
            <motion.header
              className="sticky top-0 z-20 glass-card border-0 border-b border-white/20 rounded-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3">
                  <div className="hidden lg:flex items-center gap-3">
                    <LinkaLogo size="sm" />
                    <span className="text-xs font-semibold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
                      Studio
                    </span>
                  </div>
                  <div className="relative flex-1 max-w-xl">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      aria-label="Search"
                      placeholder="Search products, orders, campaigns..."
                      className="w-full rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm px-9 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelect("inventory")}
                  className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all shadow-sm"
                >
                  <Plus className="h-4 w-4 text-teal-600" />
                  Add Product
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelect("promotions")}
                  className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  New Campaign
                </motion.button>

                <motion.button
                  aria-label="Notifications"
                  onClick={() => onSelect("notifications")}
                  className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all shadow-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="h-4 w-4 text-teal-600" />
                  {notifCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] px-1.5 py-[2px] font-bold shadow-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {notifCount}
                    </motion.span>
                  )}
                </motion.button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all shadow-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <UserIcon className="h-4 w-4" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card border-white/20">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onSelect("settings")}>Profile & Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSelect("storefront")}>Storefront</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => location.assign("/")}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 flex items-center justify-between">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
                </motion.div>

                <motion.button
                  onClick={() => setRightOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {rightOpen ? "Hide Insights" : "Show Insights"}
                </motion.button>
              </div>
            </motion.header>

            <motion.div
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          </Panel>

          <PanelResizeHandle className="hidden lg:block w-[1px] bg-white/20" />

          {rightOpen && (
            <Panel defaultSize={30} minSize={18}>
              <motion.div
                className="sticky top-0 h-screen overflow-y-auto glass-sidebar border-l border-white/20 p-4 custom-scrollbar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ContextPanel />
              </motion.div>
            </Panel>
          )}
        </PanelGroup>
      </div>
    </div>
  )
}
