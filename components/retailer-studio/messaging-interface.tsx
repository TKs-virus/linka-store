"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CustomerList } from "./customer-list"
import { ChatWindow } from "./chat-window"
import { QuickReplies } from "./quick-replies"
import { MessageSquare, Search, Settings, Users, Filter } from "lucide-react"

export interface Customer {
  id: string
  name: string
  avatar?: string
  initials: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  isTyping?: boolean
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "text" | "image" | "file"
  isOwn: boolean
  attachment?: {
    name: string
    url: string
    type: string
  }
}

const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "Sarah Mwanza",
    initials: "SM",
    lastMessage: "Thank you for the beautiful basket! When will you have more in stock?",
    timestamp: "2 min ago",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "John Kasongo",
    initials: "JK",
    lastMessage: "Can I get a discount for bulk orders?",
    timestamp: "15 min ago",
    unreadCount: 1,
    isOnline: true,
    isTyping: true,
  },
  {
    id: "3",
    name: "Mary Lungu",
    initials: "ML",
    lastMessage: "The soap set arrived safely. Great quality!",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "David Chanda",
    initials: "DC",
    lastMessage: "Do you ship to Ndola?",
    timestamp: "2 hours ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "5",
    name: "Grace Nyirenda",
    initials: "GN",
    lastMessage: "I love your store! Following for updates.",
    timestamp: "1 day ago",
    unreadCount: 0,
    isOnline: true,
  },
]

const sampleMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "1",
      senderName: "Sarah Mwanza",
      content: "Hi! I'm interested in your handwoven baskets. Do you have any in medium size?",
      timestamp: "10:30 AM",
      type: "text",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "retailer",
      senderName: "You",
      content:
        "Hello Sarah! Yes, we have beautiful medium-sized baskets available. They're K 450 each. Would you like to see some photos?",
      timestamp: "10:32 AM",
      type: "text",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Sarah Mwanza",
      content: "Yes please! I'd love to see them.",
      timestamp: "10:33 AM",
      type: "text",
      isOwn: false,
    },
    {
      id: "4",
      senderId: "retailer",
      senderName: "You",
      content: "Here are some of our latest medium baskets:",
      timestamp: "10:35 AM",
      type: "image",
      isOwn: true,
      attachment: {
        name: "basket-medium-1.jpg",
        url: "/handwoven-basket.png",
        type: "image",
      },
    },
    {
      id: "5",
      senderId: "1",
      senderName: "Sarah Mwanza",
      content: "These are gorgeous! I'll take the one with the geometric pattern. How can I pay?",
      timestamp: "10:38 AM",
      type: "text",
      isOwn: false,
    },
    {
      id: "6",
      senderId: "retailer",
      senderName: "You",
      content: "Perfect choice! You can pay via mobile money or bank transfer. I'll send you the payment details.",
      timestamp: "10:40 AM",
      type: "text",
      isOwn: true,
    },
    {
      id: "7",
      senderId: "1",
      senderName: "Sarah Mwanza",
      content: "Thank you for the beautiful basket! When will you have more in stock?",
      timestamp: "2 min ago",
      type: "text",
      isOwn: false,
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "2",
      senderName: "John Kasongo",
      content:
        "Good morning! I run a small hotel and I'm interested in buying your soaps in bulk. Do you offer wholesale prices?",
      timestamp: "9:15 AM",
      type: "text",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "retailer",
      senderName: "You",
      content:
        "Good morning John! Yes, we do offer wholesale pricing for bulk orders. How many units are you looking to purchase?",
      timestamp: "9:18 AM",
      type: "text",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "2",
      senderName: "John Kasongo",
      content: "I'd like to start with 50 soap sets. What would be your best price?",
      timestamp: "9:20 AM",
      type: "text",
      isOwn: false,
    },
    {
      id: "4",
      senderId: "retailer",
      senderName: "You",
      content:
        "For 50 sets, I can offer them at K 220 each instead of the regular K 280. That's a 20% discount. Would that work for you?",
      timestamp: "9:25 AM",
      type: "text",
      isOwn: true,
    },
    {
      id: "5",
      senderId: "2",
      senderName: "John Kasongo",
      content: "Can I get a discount for bulk orders?",
      timestamp: "15 min ago",
      type: "text",
      isOwn: false,
    },
  ],
}

export function MessagingInterface() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(sampleCustomers[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(sampleMessages["1"] || [])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (selectedCustomer) {
      setMessages(sampleMessages[selectedCustomer.id] || [])
    }
  }, [selectedCustomer])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedCustomer) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "retailer",
      senderName: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      isOwn: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate typing indicator and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Could add auto-response logic here
    }, 2000)
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
  }

  const filteredCustomers = sampleCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalUnread = sampleCustomers.reduce((sum, customer) => sum + customer.unreadCount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">Connect with your customers in real-time</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-2">
            <MessageSquare className="h-3 w-3" />
            {totalUnread} unread
          </Badge>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Customer List Sidebar */}
        <div className="lg:col-span-1">
          <Card className="studio-card h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold">Conversations</h3>
                <Badge variant="outline" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {filteredCustomers.length}
                </Badge>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <CustomerList
                customers={filteredCustomers}
                selectedCustomer={selectedCustomer}
                onSelectCustomer={setSelectedCustomer}
              />
            </ScrollArea>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3">
          <Card className="studio-card h-full flex flex-col">
            {selectedCustomer ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedCustomer.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {selectedCustomer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-heading font-semibold">{selectedCustomer.name}</h3>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              selectedCustomer.isOnline ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                          <span className="text-xs text-muted-foreground">
                            {selectedCustomer.isOnline ? "Online" : "Offline"}
                          </span>
                          {selectedCustomer.isTyping && (
                            <span className="text-xs text-primary animate-pulse">typing...</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <ChatWindow
                    messages={messages}
                    isTyping={isTyping}
                    customerName={selectedCustomer.name}
                    customerInitials={selectedCustomer.initials}
                  />
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Quick Replies */}
                <div className="px-4 py-2 border-t bg-muted/30">
                  <QuickReplies onSelectReply={handleQuickReply} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-2 bg-background border rounded-lg px-3 py-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="border-0 bg-transparent p-0 focus-visible:ring-0"
                      />
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground">
                        📎
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="btn-studio-primary">
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a customer from the list to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
