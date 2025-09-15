import type { Metadata } from "next"
import { RetailerStudioLayout } from "@/components/retailer-studio/retailer-studio-layout"
import { MessagingInterface } from "@/components/retailer-studio/messaging-interface"

export const metadata: Metadata = {
  title: "Messages - Retailer Studio | Linka",
  description: "Communicate with customers in real-time and build stronger relationships",
}

export default function MessagesPage() {
  return (
    <RetailerStudioLayout>
      <MessagingInterface />
    </RetailerStudioLayout>
  )
}
