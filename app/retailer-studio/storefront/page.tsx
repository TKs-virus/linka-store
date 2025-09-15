import type { Metadata } from "next"
import { RetailerStudioLayout } from "@/components/retailer-studio/retailer-studio-layout"
import { StorefrontManagement } from "@/components/retailer-studio/storefront-management"

export const metadata: Metadata = {
  title: "Storefront Management - Retailer Studio | Linka",
  description: "Manage your storefront, preview your store, and track customer engagement in real-time",
}

export default function StorefrontPage() {
  return (
    <RetailerStudioLayout>
      <StorefrontManagement />
    </RetailerStudioLayout>
  )
}
