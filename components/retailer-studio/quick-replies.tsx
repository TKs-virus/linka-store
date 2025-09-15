"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface QuickRepliesProps {
  onSelectReply: (reply: string) => void
}

const quickReplies = [
  "Thank you for your interest!",
  "Yes, we have that in stock.",
  "Let me check availability for you.",
  "We offer free delivery over K 500.",
  "Payment can be made via mobile money.",
  "I'll send you more photos.",
  "What size are you looking for?",
  "We can arrange a custom order.",
  "Thank you for your purchase!",
  "Your order is ready for pickup.",
]

export function QuickReplies({ onSelectReply }: QuickRepliesProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground font-medium">Quick Replies:</p>
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onSelectReply(reply)}
              className="whitespace-nowrap text-xs bg-background/50 hover:bg-primary/10 hover:border-primary/20"
            >
              {reply}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
