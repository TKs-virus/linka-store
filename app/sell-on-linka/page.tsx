"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, LineChart, CreditCard, Store, Rocket, Settings, ShieldCheck } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function SellOnLinkaPage() {
  const { signup } = useAuth()
  const router = useRouter()

  const [businessName, setBusinessName] = useState("")
  const [legalName, setLegalName] = useState("")
  const [website, setWebsite] = useState("")
  const [category, setCategory] = useState("retail")
  const [country, setCountry] = useState("Zambia")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [payments, setPayments] = useState<{stripe: boolean; paypal: boolean; apple: boolean}>({ stripe: true, paypal: false, apple: false })
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const phoneDigits = phone.replace(/\D/g, "")
  const phoneValid = phoneDigits.length >= 7
  const passwordValid = password.length >= 6
  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const businessValid = businessName.trim().length >= 2
  const atLeastOnePayment = payments.stripe || payments.paypal || payments.apple
  const formValid = emailValid && phoneValid && passwordValid && passwordsMatch && businessValid && atLeastOnePayment && agree

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formValid) return
    setError("")
    setSuccess("")
    setLoading(true)
    try {
      const result = await signup({ email, password, name: businessName, role: 'retailer', businessName })
      if (!result.success) {
        setError(result.error || "Signup failed")
      } else {
        setSuccess("Your retailer account is ready. Redirecting to Studio...")
        setTimeout(() => router.replace('/retailer/studio'), 900)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const shimmer = "pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full group-active:translate-x-0 transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(14,165,183,0.28),rgba(0,153,204,0.28),rgba(255,102,0,0.28),transparent)]"

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(0,153,204,0.22), transparent)"}} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
        <motion.div className="absolute top-32 right-0 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(255,102,0,0.16), transparent)"}} animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 10 }} />
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(14,165,183,0.18), transparent)"}} animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 9 }} />
      </div>

      {/* Hero */}
      <section className="relative pt-16 pb-10 sm:pb-14 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white/80 shadow-sm">
              <Rocket className="h-3.5 w-3.5 text-[#ff6600]" />
              <span className="font-medium text-slate-700">Grow your business with Linka</span>
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Sell on Linka</h1>
            <p className="mt-3 text-slate-600 text-base md:text-lg max-w-prose">Join thousands of retailers reaching customers across Zambia. Manage inventory in real time, run campaigns, and get paid securely with integrated solutions.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a href="#apply" className="group relative inline-flex">
                  <Button className="relative overflow-hidden group w-full text-white bg-[linear-gradient(90deg,#0ea5b7_0%,#0099cc_50%,#ff6600_100%)] hover:shadow-xl">
                    <span className={shimmer} />
                    Get Started
                  </Button>
                </a>
              </motion.div>
              <Link href="/for-retailers" className="text-[#0099cc] hover:underline font-medium">Learn more</Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
              <div className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> PCI DSS-aligned payments</div>
              <div className="inline-flex items-center gap-2"><Settings className="h-4 w-4 text-[#0ea5b7]" /> Powerful retailer studio</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#0099cc40] via-white to-[#ff660040] shadow-xl">
              <Card className="bg-white/90 backdrop-blur border-white/40">
                <CardHeader>
                  <CardTitle className="text-lg">Why sell with Linka?</CardTitle>
                  <CardDescription>Reach more customers with tools that scale as you grow.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border p-4 bg-white/80">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-[#0099cc]" />
                        <div className="font-semibold text-slate-800">Vast customer base</div>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Tap into a nationwide audience ready to shop.</p>
                    </div>
                    <div className="rounded-xl border p-4 bg-white/80">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-[#0ea5b7]" />
                        <div className="font-semibold text-slate-800">Advanced studio tools</div>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Inventory, promotions, campaigns, and analytics.</p>
                    </div>
                    <div className="rounded-xl border p-4 bg-white/80">
                      <div className="flex items-center gap-3">
                        <LineChart className="h-5 w-5 text-[#ff6600]" />
                        <div className="font-semibold text-slate-800">Competitive commissions</div>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Transparent pricing to maximize your earnings.</p>
                    </div>
                    <div className="rounded-xl border p-4 bg-white/80">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-[#0099cc]" />
                        <div className="font-semibold text-slate-800">Integrated payments</div>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Stripe, PayPal, and Apple Pay supported.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">How it works</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[{i:1,t:"Create account",d:"Sign up and verify your business details."},{i:2,t:"Set up store",d:"Customize your storefront and add policies."},{i:3,t:"Add products",d:"Create listings and manage inventory in real-time."},{i:4,t:"Launch & grow",d:"Run promotions and track performance in the studio."}].map((s)=> (
              <motion.div key={s.i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:0.3}} transition={{duration:0.4, delay: s.i*0.05}} className="rounded-xl border bg-white/80 p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0099cc1a] text-[#0099cc] font-bold">{s.i}</div>
                <div className="mt-2 font-semibold text-slate-800">{s.t}</div>
                <p className="text-sm text-slate-600">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockups & Testimonials */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.45}} className="lg:col-span-2">
            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#0099cc40] via-white to-[#ff660040] shadow-xl h-full">
              <Card className="bg-white/90 backdrop-blur border-white/40 h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Retailer Studio Preview</CardTitle>
                  <CardDescription>Manage inventory, orders, and marketing from one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border overflow-hidden">
                    <img src="/placeholder.svg" alt="Retailer studio mockup" className="w-full h-64 object-cover" />
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg border p-3 bg-white/80 inline-flex items-center gap-2 text-sm text-slate-700"><Store className="h-4 w-4 text-[#0099cc]" /> Storefront</div>
                    <div className="rounded-lg border p-3 bg-white/80 inline-flex items-center gap-2 text-sm text-slate-700"><LineChart className="h-4 w-4 text-[#ff6600]" /> Analytics</div>
                    <div className="rounded-lg border p-3 bg-white/80 inline-flex items-center gap-2 text-sm text-slate-700"><Settings className="h-4 w-4 text-[#0ea5b7]" /> Campaigns</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.05}} className="space-y-4">
            {[{n:'TechHub Zambia',q:'Linka helped us scale fast. Inventory sync and promotions are a game changer.'},{n:'GreenMart',q:'Simple setup and secure payments. Our sales grew within weeks.'},{n:'FashionCorner',q:'The studio tools make running campaigns effortless.'}].map((t,idx)=> (
              <div key={idx} className="rounded-xl border bg-white/80 p-4">
                <div className="flex items-center gap-3">
                  <img src="/placeholder.svg" alt="Seller avatar" className="h-10 w-10 rounded-full border" />
                  <div className="font-semibold text-slate-800">{t.n}</div>
                </div>
                <p className="mt-2 text-sm text-slate-600">“{t.q}”</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.45}} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Get started</h2>
            <p className="text-slate-600">Complete your details to create your retailer account. You can connect payments like Stripe, PayPal, or Apple Pay at any time.</p>
            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#0099cc40] via-white to-[#ff660040] shadow-xl">
              <Card className="bg-white/90 backdrop-blur border-white/40">
                <CardHeader>
                  <CardTitle className="text-lg">Retailer sign-up</CardTitle>
                  <CardDescription>Fast onboarding with real-time validation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business name</Label>
                        <Input id="businessName" value={businessName} onChange={(e)=>setBusinessName(e.target.value)} placeholder="e.g., TechHub Zambia" className={`${businessName && !businessValid ? 'border-red-300 focus:ring-red-400' : ''}`} required />
                        {businessName && !businessValid && <p className="text-xs text-red-600">Enter a valid business name</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="legalName">Legal name</Label>
                        <Input id="legalName" value={legalName} onChange={(e)=>setLegalName(e.target.value)} placeholder="Registered entity name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Business email</Label>
                        <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@business.com" className={`${email && !emailValid ? 'border-red-300 focus:ring-red-400' : ''}`} required />
                        {email && !emailValid && <p className="text-xs text-red-600">Enter a valid email address</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="e.g., +260 97 123-4567" className={`${phone && !phoneValid ? 'border-red-300 focus:ring-red-400' : ''}`} required />
                        {phone && !phoneValid && <p className="text-xs text-red-600">Enter a valid phone number</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="https://example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select id="category" value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0ea5b7]">
                          <option value="retail">Retail</option>
                          <option value="fashion">Fashion & Textiles</option>
                          <option value="electronics">Electronics</option>
                          <option value="beauty">Beauty & Wellness</option>
                          <option value="home">Home & Decor</option>
                          <option value="services">Services</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <select id="country" value={country} onChange={(e)=>setCountry(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0ea5b7]">
                          <option>Zambia</option>
                          <option>Zimbabwe</option>
                          <option>Malawi</option>
                          <option>Namibia</option>
                          <option>Botswana</option>
                        </select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Business address</Label>
                        <Textarea id="address" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Street, City, Province" className="min-h-[90px]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Create a password" className={`${password && !passwordValid ? 'border-red-300 focus:ring-red-400' : ''}`} required />
                        {password && !passwordValid && <p className="text-xs text-red-600">At least 6 characters</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm password</Label>
                        <Input id="confirm" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Re-enter password" className={`${confirmPassword && !passwordsMatch ? 'border-red-300 focus:ring-red-400' : ''}`} required />
                        {confirmPassword && !passwordsMatch && <p className="text-xs text-red-600">Passwords do not match</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-medium text-slate-800">Payment setup</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <label className="inline-flex items-center gap-2 rounded-lg border bg-white/80 p-3 cursor-pointer">
                          <input type="checkbox" checked={payments.stripe} onChange={(e)=>setPayments(p=>({...p, stripe: e.target.checked}))} />
                          <span className="inline-flex items-center gap-1"><CreditCard className="h-4 w-4 text-[#0099cc]" /> Stripe</span>
                        </label>
                        <label className="inline-flex items-center gap-2 rounded-lg border bg-white/80 p-3 cursor-pointer">
                          <input type="checkbox" checked={payments.paypal} onChange={(e)=>setPayments(p=>({...p, paypal: e.target.checked}))} />
                          <span className="inline-flex items-center gap-1"><CreditCard className="h-4 w-4 text-[#0ea5b7]" /> PayPal</span>
                        </label>
                        <label className="inline-flex items-center gap-2 rounded-lg border bg-white/80 p-3 cursor-pointer">
                          <input type="checkbox" checked={payments.apple} onChange={(e)=>setPayments(p=>({...p, apple: e.target.checked}))} />
                          <span className="inline-flex items-center gap-1"><CreditCard className="h-4 w-4 text-[#ff6600]" /> Apple Pay</span>
                        </label>
                      </div>
                      {!atLeastOnePayment && <p className="text-xs text-red-600">Select at least one payment method</p>}
                      <p className="text-xs text-slate-500">Payments are processed by integrated providers. Card data is handled by providers with strong encryption and PCI DSS alignment.</p>
                    </div>

                    <label className="inline-flex items-center gap-2 select-none">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0099cc] focus:ring-[#0099cc]" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
                      <span className="text-sm text-slate-600">I agree to the <Link href="/terms" className="text-[#0099cc] hover:underline">Terms</Link> and <Link href="/privacy" className="text-[#0099cc] hover:underline">Privacy Policy</Link></span>
                    </label>

                    {error && (
                      <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
                    )}
                    {success && (
                      <Alert><AlertDescription>{success}</AlertDescription></Alert>
                    )}

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button type="submit" disabled={!formValid || loading} className="relative overflow-hidden group w-full text-white bg-[linear-gradient(90deg,#0ea5b7_0%,#0099cc_50%,#ff6600_100%)] hover:shadow-xl">
                        <span className={shimmer} />
                        {loading ? 'Creating account…' : 'Join Now'}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.05}} className="space-y-4">
            <div className="rounded-xl border bg-white/80 p-4">
              <div className="font-semibold text-slate-800">What you get</div>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Store className="h-4 w-4 text-[#0099cc]" /> Storefront and inventory tools</li>
                <li className="flex items-center gap-2"><Settings className="h-4 w-4 text-[#0ea5b7]" /> Promotions & campaign builder</li>
                <li className="flex items-center gap-2"><LineChart className="h-4 w-4 text-[#ff6600]" /> Performance analytics</li>
                <li className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-[#0099cc]" /> Integrated payments</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-white/80 p-4">
              <div className="font-semibold text-slate-800">Need help?</div>
              <p className="text-sm text-slate-600">Our team can assist with onboarding and migration from other platforms.</p>
              <Link href="/contact" className="text-sm text-[#0099cc] hover:underline">Contact support</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
