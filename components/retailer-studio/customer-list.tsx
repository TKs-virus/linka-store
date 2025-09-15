"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Customer } from "./messaging-interface"

interface CustomerListProps {
  customers: Customer[]
  selectedCustomer: Customer | null
  onSelectCustomer: (customer: Customer) => void
}

export function CustomerList({ customers, selectedCustomer, onSelectCustomer }: CustomerListProps) {
  return (
    <div className="space-y-1 p-2">
      {customers.map((customer) => (
        <div
          key={customer.id}
          onClick={() => onSelectCustomer(customer)}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-muted/50",
            selectedCustomer?.id === customer.id && "bg-primary/10 border border-primary/20",
          )}
        >
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={customer.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                {customer.initials}
              </AvatarFallback>
            </Avatar>
            {customer.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm truncate">{customer.name}</h4>
              <div className="flex items-center gap-1">
                {customer.unreadCount > 0 && (
                  <Badge className="h-5 w-5 p-0 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    {customer.unreadCount}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">{customer.timestamp}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground truncate flex-1 mr-2">
                {customer.isTyping ? (
                  <span className="text-primary animate-pulse">typing...</span>
                ) : (
                  customer.lastMessage
                )}
              </p>
            </div>
          </div>
        </div>
      ))}

      {customers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">No conversations found</p>
        </div>
      )}
    </div>
  )
}
