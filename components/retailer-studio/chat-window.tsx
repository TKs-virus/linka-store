"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message } from "./messaging-interface"

interface ChatWindowProps {
  messages: Message[]
  isTyping: boolean
  customerName: string
  customerInitials: string
}

export function ChatWindow({ messages, isTyping, customerName, customerInitials }: ChatWindowProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex gap-3", message.isOwn ? "justify-end" : "justify-start")}>
          {!message.isOwn && (
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                {customerInitials}
              </AvatarFallback>
            </Avatar>
          )}

          <div className={cn("max-w-[70%] space-y-1", message.isOwn && "items-end")}>
            <div
              className={cn(
                "rounded-2xl px-4 py-2 text-sm",
                message.isOwn ? "bg-primary text-primary-foreground ml-auto" : "bg-muted text-foreground",
              )}
            >
              {message.type === "text" && <p>{message.content}</p>}

              {message.type === "image" && message.attachment && (
                <div className="space-y-2">
                  {message.content && <p>{message.content}</p>}
                  <img
                    src={message.attachment.url || "/placeholder.svg"}
                    alt={message.attachment.name}
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}

              {message.type === "file" && message.attachment && (
                <div className="space-y-2">
                  {message.content && <p>{message.content}</p>}
                  <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">📄</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{message.attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{message.attachment.type}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className={cn("text-xs text-muted-foreground", message.isOwn ? "text-right" : "text-left")}>
              {message.timestamp}
            </p>
          </div>

          {message.isOwn && (
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-secondary/10 text-secondary font-medium text-xs">You</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex gap-3 justify-start">
          <Avatar className="h-8 w-8 mt-1">
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
              {customerInitials}
            </AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-2xl px-4 py-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
