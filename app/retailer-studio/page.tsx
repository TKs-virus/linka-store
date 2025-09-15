import type { Metadata } from "next"
import { RetailerStudioLayout } from "@/components/retailer-studio/retailer-studio-layout"
import { DashboardOverview } from "@/components/retailer-studio/dashboard-overview"

export const metadata: Metadata = {
  title: "Retailer Studio - Dashboard | Linka",
  description: "Manage your store, track performance, and grow your business with Linka Retailer Studio",
}

export default function RetailerStudioPage() {
  return (
    <RetailerStudioLayout>
      <DashboardOverview />
    </RetailerStudioLayout>
  )
}
