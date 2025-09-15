import type { Metadata } from "next"
import { RetailerStudioLayout } from "@/components/retailer-studio/retailer-studio-layout"
import { MarketingCampaigns } from "@/components/retailer-studio/marketing-campaigns"

export const metadata: Metadata = {
  title: "Marketing Campaigns - Retailer Studio | Linka",
  description: "Create and manage marketing campaigns to grow your business and reach more customers",
}

export default function MarketingPage() {
  return (
    <RetailerStudioLayout>
      <MarketingCampaigns />
    </RetailerStudioLayout>
  )
}
