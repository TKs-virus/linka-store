"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, Trash2, Plus, Edit2, Check, Wallet, Bitcoin, Banknote, Apple, Store, Building2 } from "lucide-react"

// Types for stored methods (no sensitive data persisted)
interface StoredCard {
  id: string
  brand: string
  last4: string
  exp: string // MM/YY
  holder: string
}

interface PaymentMethodsState {
  cards: StoredCard[]
  paypal?: { email: string } | null
  stripe?: { email: string } | null
  applePay?: boolean
  googlePay?: boolean
  bankTransfer?: { bank: string; accountName: string } | null
  crypto?: { network: string; address: string } | null
  bnpl?: { provider: string } | null
}

const STORAGE_KEY = "linka_payment_methods"

const luhnValid = (num: string) => {
  const s = num.replace(/\s+/g, "")
  let sum = 0
  let dbl = false
  for (let i = s.length - 1; i >= 0; i--) {
    let d = parseInt(s[i], 10)
    if (dbl) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    dbl = !dbl
  }
  return sum % 10 === 0
}

export function PaymentMethodsManager() {
  const [state, setState] = useState<PaymentMethodsState>({ cards: [] })
  const [addingCard, setAddingCard] = useState(false)
  const [newCard, setNewCard] = useState({ number: "", exp: "", cvc: "", holder: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setState(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  const validateCard = (): boolean => {
    const e: Record<string, string> = {}
    const nn = newCard.number.replace(/\s+/g, "")
    if (!(nn.length >= 12 && nn.length <= 19 && luhnValid(nn))) e.number = "Invalid card number"
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(newCard.exp)) e.exp = "Use MM/YY"
    if (!/^\d{3,4}$/.test(newCard.cvc)) e.cvc = "Invalid CVC"
    if (!newCard.holder.trim()) e.holder = "Cardholder required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const addCard = () => {
    if (!validateCard()) return
    const last4 = newCard.number.replace(/\s+/g, "").slice(-4)
    const brand = detectBrand(newCard.number)
    const card: StoredCard = {
      id: `card_${Date.now()}`,
      brand,
      last4,
      exp: newCard.exp,
      holder: newCard.holder.trim()
    }
    setState(prev => ({ ...prev, cards: [card, ...prev.cards] }))
    setNewCard({ number: "", exp: "", cvc: "", holder: "" })
    setAddingCard(false)
  }

  const removeCard = (id: string) => setState(prev => ({ ...prev, cards: prev.cards.filter(c => c.id !== id) }))

  const detectBrand = (num: string): string => {
    const s = num.replace(/\s+/g, "")
    if (/^4/.test(s)) return "Visa"
    if (/^5[1-5]/.test(s)) return "Mastercard"
    if (/^3[47]/.test(s)) return "AmEx"
    if (/^6/.test(s)) return "Discover"
    return "Card"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" /> Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-50">
            <div className="text-sm text-blue-700">Active Cards</div>
            <div className="text-2xl font-bold text-blue-900">{state.cards.length}</div>
          </div>
          <div className="p-4 rounded-lg bg-teal-50">
            <div className="text-sm text-teal-700">Digital Wallets</div>
            <div className="text-2xl font-bold text-teal-900">{(state.applePay?1:0)+(state.googlePay?1:0)}</div>
          </div>
          <div className="p-4 rounded-lg bg-orange-50">
            <div className="text-sm text-orange-700">Alternatives</div>
            <div className="text-2xl font-bold text-orange-900">{[state.paypal, state.stripe, state.bankTransfer, state.crypto, state.bnpl].filter(Boolean).length}</div>
          </div>
        </div>

        <Separator />

        {/* Cards list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Saved Cards</h3>
            <Button onClick={() => setAddingCard(v => !v)} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
              <Plus className="h-4 w-4 mr-1" /> Add Card
            </Button>
          </div>

          <AnimatePresenceWrapper show={addingCard}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white border rounded-lg p-4">
              <Input placeholder="Card number" inputMode="numeric" value={newCard.number} onChange={e => setNewCard({ ...newCard, number: e.target.value })} aria-invalid={!!errors.number} />
              <Input placeholder="MM/YY" value={newCard.exp} onChange={e => setNewCard({ ...newCard, exp: e.target.value })} aria-invalid={!!errors.exp} />
              <Input placeholder="CVC" inputMode="numeric" value={newCard.cvc} onChange={e => setNewCard({ ...newCard, cvc: e.target.value })} aria-invalid={!!errors.cvc} />
              <Input placeholder="Cardholder name" value={newCard.holder} onChange={e => setNewCard({ ...newCard, holder: e.target.value })} aria-invalid={!!errors.holder} />
              <div className="col-span-full flex gap-2">
                <Button onClick={addCard} className="bg-blue-600 text-white"><Check className="h-4 w-4 mr-1"/>Save</Button>
                <Button variant="outline" onClick={() => { setAddingCard(false); setErrors({}); }}>Cancel</Button>
              </div>
              {(Object.keys(errors).length > 0) && (
                <div className="col-span-full text-sm text-red-600">{Object.values(errors).join(" • ")}</div>
              )}
            </div>
          </AnimatePresenceWrapper>

          {state.cards.length === 0 && <div className="text-sm text-gray-600">No cards saved yet.</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {state.cards.map(card => (
              <div key={card.id} className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-sm font-bold">
                    {card.brand[0]}
                  </div>
                  <div>
                    <div className="font-medium">{card.brand} •••• {card.last4}</div>
                    <div className="text-xs text-gray-600">Exp {card.exp} • {card.holder}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">PCI DSS</Badge>
                  <Button variant="outline" onClick={() => removeCard(card.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Other methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <OtherMethod
            title="PayPal"
            icon={<Wallet className="h-4 w-4" />}
            active={!!state.paypal}
            onAdd={(email) => setState(prev => ({ ...prev, paypal: { email } }))}
            onRemove={() => setState(prev => ({ ...prev, paypal: null }))}
          />
          <OtherMethod
            title="Stripe"
            icon={<Store className="h-4 w-4" />}
            active={!!state.stripe}
            onAdd={(email) => setState(prev => ({ ...prev, stripe: { email } }))}
            onRemove={() => setState(prev => ({ ...prev, stripe: null }))}
          />
          <ToggleMethod title="Apple Pay" icon={<Apple className="h-4 w-4" />} active={!!state.applePay} onToggle={(v) => setState(prev => ({ ...prev, applePay: v }))} />
          <ToggleMethod title="Google Pay" icon={<CreditCard className="h-4 w-4" />} active={!!state.googlePay} onToggle={(v) => setState(prev => ({ ...prev, googlePay: v }))} />
          <OtherMethod
            title="Bank Transfer"
            icon={<Building2 className="h-4 w-4" />}
            active={!!state.bankTransfer}
            placeholder="Bank name"
            onAdd={(bank) => setState(prev => ({ ...prev, bankTransfer: { bank, accountName: "Primary" } }))}
            onRemove={() => setState(prev => ({ ...prev, bankTransfer: null }))}
          />
          <OtherMethod
            title="Cryptocurrency"
            icon={<Bitcoin className="h-4 w-4" />}
            active={!!state.crypto}
            placeholder="Network or address"
            onAdd={(network) => setState(prev => ({ ...prev, crypto: { network, address: "on-file" } }))}
            onRemove={() => setState(prev => ({ ...prev, crypto: null }))}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ToggleMethod({ title, icon, active, onToggle }: { title: string; icon: React.ReactNode; active: boolean; onToggle: (v: boolean) => void }) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <div className="font-medium">{title}</div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={active ? "default" : "outline"}>{active ? "Enabled" : "Disabled"}</Badge>
        <Button variant="outline" onClick={() => onToggle(!active)}>{active ? "Disable" : "Enable"}</Button>
      </div>
    </div>
  )
}

function OtherMethod({ title, icon, active, placeholder = "Email", onAdd, onRemove }: { title: string; icon: React.ReactNode; active: boolean; placeholder?: string; onAdd: (value: string) => void; onRemove: () => void }) {
  const [value, setValue] = useState("")
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><span>{icon}</span><div className="font-medium">{title}</div></div>
        <Badge variant={active ? "default" : "outline"}>{active ? "Connected" : "Not connected"}</Badge>
      </div>
      {!active ? (
        <div className="flex gap-2">
          <Input value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} />
          <Button onClick={() => { if (value.trim()) { onAdd(value.trim()); setValue("") } }} className="bg-teal-600 text-white">Connect</Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Connected</div>
          <Button variant="outline" onClick={onRemove} className="text-red-600"><Trash2 className="h-4 w-4"/> Disconnect</Button>
        </div>
      )}
    </div>
  )
}

function AnimatePresenceWrapper({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>{show ? <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{children}</motion.div> : null}</AnimatePresence>
  )
}
