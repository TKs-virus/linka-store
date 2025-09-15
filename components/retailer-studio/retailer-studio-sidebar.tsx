"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Store,
  Megaphone,
  MessageSquare,
  TrendingUp,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react"

interface RetailerStudioSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/retailer-studio",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
  },
  {
    title: "Storefront",
    href: "/retailer-studio/storefront",
    icon: Store,
    description: "Manage your store",
  },
  {
    title: "Promotions",
    href: "/retailer-studio/promotions",
    icon: Megaphone,
    description: "Sales & Discounts",
  },
  {
    title: "Messages",
    href: "/retailer-studio/messages",
    icon: MessageSquare,
    description: "Customer chat",
  },
  {
    title: "Marketing",
    href: "/retailer-studio/marketing",
    icon: TrendingUp,
    description: "Campaigns & Growth",
  },
  {
    title: "Inventory",
    href: "/retailer-studio/inventory",
    icon: Package,
    description: "Products & Stock",
  },
]

export function RetailerStudioSidebar({ collapsed, onToggle }: RetailerStudioSidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full glass-sidebar transition-all duration-300 ease-in-out z-50",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Crown className="h-8 w-8 text-primary crown-glow" />
            <div>
              <h1 className="font-heading text-lg font-bold text-foreground">Retailer Studio</h1>
              <p className="text-xs text-muted-foreground">Premium Dashboard</p>
            </div>
          </div>
        )}

        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0 hover:bg-primary/10">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-primary/10 hover:transform hover:scale-[1.02]",
                  "group cursor-pointer",
                  isActive && "bg-primary/15 border border-primary/20 shadow-sm",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                  )}
                />

                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "font-medium text-sm transition-colors",
                        isActive ? "text-primary" : "text-foreground group-hover:text-primary",
                      )}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <Link href="/retailer-studio/settings">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
              "hover:bg-muted/50 cursor-pointer group",
            )}
          >
            <Settings className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            {!collapsed && (
              <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground">Settings</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}
