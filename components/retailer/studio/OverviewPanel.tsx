"use client"
import { motion } from "framer-motion"
import { useRetailerAuth } from "@/contexts/retailer-auth-context"
import { TrendingUp, ShoppingBag, DollarSign, Package, ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react"

const COLORS = [
  "hsl(180, 100%, 25%)",
  "hsl(18, 95%, 56%)",
  "hsl(180, 100%, 35%)",
  "hsl(43, 96%, 56%)",
  "hsl(142, 76%, 36%)",
]

function useGreeting(name?: string | null) {
  const hours = new Date().getHours()
  const time = hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening"
  return `Good ${time}, ${name || "Retailer"}`
}

const coreKPIs = [
  { key: "sales", label: "Total Sales", value: 152300, currency: "ZK", delta: 8.2, icon: DollarSign },
  { key: "orders", label: "Total Orders", value: 1256, delta: 3.4, icon: ShoppingBag },
  { key: "revenue", label: "Monthly Revenue", value: 175400, currency: "ZK", delta: 6.3, icon: TrendingUp },
  { key: "products", label: "Active Products", value: 89, delta: 2.1, icon: Package },
]

const recentOrders = [
  {
    id: "#10241",
    customer: "Mary Banda",
    items: "2× Headphones, 1× USB-C Cable",
    date: "2025-08-27",
    status: "Completed",
    value: 945,
  },
  { id: "#10240", customer: "James Phiri", items: "1× Hoodie", date: "2025-08-27", status: "Processing", value: 320 },
  {
    id: "#10239",
    customer: "Chipo Mwila",
    items: "3× Sports T-Shirt",
    date: "2025-08-27",
    status: "Pending",
    value: 540,
  },
  {
    id: "#10238",
    customer: "John Tembo",
    items: "1× Smartwatch",
    date: "2025-08-26",
    status: "Completed",
    value: 2150,
  },
  {
    id: "#10237",
    customer: "Loveness Zulu",
    items: "2× Sneakers",
    date: "2025-08-26",
    status: "Processing",
    value: 1760,
  },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Processing: "bg-blue-50 text-blue-700 border-blue-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${map[status] || "bg-slate-50 text-slate-700 border-slate-200"}`}
    >
      {status}
    </span>
  )
}

export function OverviewPanel() {
  const { user } = useRetailerAuth()
  const greeting = useGreeting(user?.name)

  const monthlyTarget = 250000 // ZK
  const monthSales = 175400 // ZK
  const targetPct = Math.min(100, Math.round((monthSales / monthlyTarget) * 100))

  return (
    <div className="space-y-8">
      <motion.div
        className="glass-card p-8 animate-cardHover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm font-semibold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Welcome back
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">{greeting} 👋</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Here's your store performance overview. Focus on what matters most to grow your business.
          </p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coreKPIs.map((kpi, i) => (
          <motion.div
            key={kpi.key}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
            className="group glass-card p-8 animate-cardHover cursor-pointer"
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-teal-500/10 to-orange-500/10 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <kpi.icon className="h-6 w-6 text-teal-600" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-slate-600">{kpi.label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <motion.h3
                      className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                    >
                      {kpi.currency ? `${kpi.currency} ${kpi.value.toLocaleString()}` : kpi.value.toLocaleString()}
                    </motion.h3>
                  </div>
                </div>
              </div>

              <motion.div
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                  kpi.delta >= 0
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
              >
                {kpi.delta >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {Math.abs(kpi.delta)}%
              </motion.div>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, kpi.delta + 50)}%` }}
                  transition={{ delay: i * 0.1 + 0.7, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="glass-card p-8 animate-cardHover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
            <p className="text-sm text-slate-600 mt-1">Latest transactions from your store</p>
          </div>
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-all"
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            View all orders
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-2 text-sm font-semibold text-slate-700">Order ID</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-slate-700">Customer</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-slate-700">Products</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-slate-700">Date</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-right py-4 px-2 text-sm font-semibold text-slate-700">Value (ZK)</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-2">
                    <span className="font-mono text-sm font-medium text-slate-900">{order.id}</span>
                  </td>
                  <td className="py-4 px-2 text-sm text-slate-700">{order.customer}</td>
                  <td className="py-4 px-2 text-sm text-slate-600 max-w-xs truncate">{order.items}</td>
                  <td className="py-4 px-2 text-sm text-slate-600">{order.date}</td>
                  <td className="py-4 px-2">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="font-semibold text-slate-900">{order.value.toLocaleString()}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        className="glass-card p-8 animate-cardHover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Monthly Sales Target</h2>
          <p className="text-slate-600 mb-6">
            You've achieved <span className="font-bold text-teal-600">{targetPct}%</span> of your monthly target — keep
            going!
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="h-6 rounded-full bg-slate-100 overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 via-orange-500 to-orange-600 shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${targetPct}%` }}
                transition={{ delay: 0.9, duration: 2, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-600 mt-2">
              <span>ZK 0</span>
              <span className="font-semibold">
                ZK {monthSales.toLocaleString()} / {monthlyTarget.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Orders", value: "982/1,200", delay: 1.1 },
              { label: "Revenue", value: `ZK ${monthSales.toLocaleString()}`, delay: 1.2 },
              { label: "Badge", value: "Rising Star ⭐", delay: 1.3 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="glass-card p-4 text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
              >
                <div className="text-sm text-slate-600 mb-1">{item.label}</div>
                <div className="font-semibold text-slate-900">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
