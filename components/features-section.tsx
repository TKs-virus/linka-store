import { Search, ShoppingCart, Truck, Heart } from "lucide-react"

const features = [
  {
    number: 1,
    icon: Search,
    title: "Discover Local Products",
    description: "Browse products from retailers in your area and find exactly what you're looking for.",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    number: 2,
    icon: ShoppingCart,
    title: "Shop with Confidence",
    description: "Add items to your cart and checkout securely with multiple payment options.",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    number: 3,
    icon: Truck,
    title: "Fast Local Delivery",
    description: "Enjoy quick delivery from nearby retailers, often within hours of ordering.",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    number: 4,
    icon: Heart,
    title: "Support Your Community",
    description: "Every purchase helps support local businesses and strengthens your community.",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={feature.number} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div className="relative mb-6 sm:mb-8">
                  <div
                    className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.bgGradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon
                      className={`h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
                      style={{ WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}
                    />
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${feature.gradient} text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg`}
                  >
                    {feature.number}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 text-center sm:text-left">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-center sm:text-left">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 md:mt-20 px-4">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-pink-100 px-6 sm:px-8 py-3 sm:py-4 text-orange-700 border border-orange-200/50 shadow-lg backdrop-blur-sm">
            <span className="text-base sm:text-lg font-medium">Ready to get started?</span>
            <span className="ml-2 text-2xl">✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}
