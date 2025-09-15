import type { Metadata } from "next"
import { RetailerStudioLayout } from "@/components/retailer-studio/retailer-studio-layout"
import { PromotionsManagement } from "@/components/retailer-studio/promotions-management"

export const metadata: Metadata = {
  title: "Promotions Management - Retailer Studio | Linka",
  description: "Create and manage promotional campaigns to boost your sales and engage customers",
}

export default function PromotionsPage() {
  return (
    <RetailerStudioLayout>
      <PromotionsManagement />
    </RetailerStudioLayout>
  )
}
