"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Eye, Edit, Copy, Plus, Image, Type, Layout } from "lucide-react"

const emailTemplates = [
  {
    id: 1,
    name: "Welcome New Customer",
    subject: "Welcome to John's Artisan Store!",
    category: "Welcome",
    opens: 89,
    clicks: 34,
    conversions: 12,
    preview: "Thank you for joining our community of craft lovers...",
  },
  {
    id: 2,
    name: "Product Launch",
    subject: "New Handwoven Collection Just Arrived!",
    category: "Product",
    opens: 156,
    clicks: 67,
    conversions: 23,
    preview: "We're excited to share our latest handwoven baskets...",
  },
  {
    id: 3,
    name: "Order Confirmation",
    subject: "Your Order #{{order_number}} is Confirmed",
    category: "Transactional",
    opens: 234,
    clicks: 89,
    conversions: 45,
    preview: "Thank you for your purchase! Here are your order details...",
  },
  {
    id: 4,
    name: "Abandoned Cart",
    subject: "Don't Forget Your Beautiful Items",
    category: "Recovery",
    opens: 78,
    clicks: 23,
    conversions: 8,
    preview: "You left some amazing items in your cart...",
  },
]

export function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0])
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold">Email Templates</h2>
          <p className="text-muted-foreground">Create and manage professional email campaigns</p>
        </div>
        <Button className="gap-2 btn-studio-primary">
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="space-y-4">
          <Card className="studio-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Templates</CardTitle>
              <CardDescription>Choose a template to edit or preview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {emailTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-muted/30 ${
                    selectedTemplate.id === template.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 truncate">{template.subject}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.opens} opens</span>
                    <span>{template.clicks} clicks</span>
                    <span>{template.conversions} sales</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Template Editor/Preview */}
        <div className="lg:col-span-2">
          <Card className="studio-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading">{selectedTemplate.name}</CardTitle>
                  <CardDescription>Email template editor and preview</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2 bg-transparent"
                  >
                    {isEditing ? <Eye className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditing ? "Preview" : "Edit"}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Tabs defaultValue="content" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content" className="gap-2">
                      <Type className="h-4 w-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="design" className="gap-2">
                      <Layout className="h-4 w-4" />
                      Design
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject Line</Label>
                      <Input id="subject" defaultValue={selectedTemplate.subject} className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="preview">Preview Text</Label>
                      <Input id="preview" defaultValue={selectedTemplate.preview} className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="content">Email Content</Label>
                      <Textarea
                        id="content"
                        rows={12}
                        className="mt-1"
                        defaultValue={`Hi {{customer_name}},

${selectedTemplate.preview}

We're thrilled to have you as part of our community of craft enthusiasts. Our handmade products are created with love and care by skilled artisans right here in Zambia.

Here's what you can expect:
• Unique, high-quality handcrafted items
• Fast and reliable delivery
• Excellent customer service
• Regular updates on new arrivals

Browse our latest collection and discover something special for yourself or your loved ones.

Best regards,
John's Artisan Store Team

P.S. Use code WELCOME10 for 10% off your first order!`}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button className="btn-studio-primary">Save Changes</Button>
                      <Button variant="outline" className="bg-transparent">
                        Send Test Email
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Header Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input type="color" defaultValue="#0891b2" className="w-16 h-10 p-1" />
                          <Input defaultValue="#0891b2" className="flex-1" />
                        </div>
                      </div>
                      <div>
                        <Label>Text Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input type="color" defaultValue="#4b5563" className="w-16 h-10 p-1" />
                          <Input defaultValue="#4b5563" className="flex-1" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Header Image</Label>
                      <div className="mt-1 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Image className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload header image</p>
                      </div>
                    </div>

                    <div>
                      <Label>Font Style</Label>
                      <select className="w-full mt-1 p-2 border rounded-lg">
                        <option>DM Sans (Recommended)</option>
                        <option>Space Grotesk</option>
                        <option>Inter</option>
                        <option>Arial</option>
                      </select>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div>
                      <Label htmlFor="from-name">From Name</Label>
                      <Input id="from-name" defaultValue="John's Artisan Store" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="from-email">From Email</Label>
                      <Input id="from-email" defaultValue="hello@johnsartisanstore.com" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="reply-to">Reply To</Label>
                      <Input id="reply-to" defaultValue="support@johnsartisanstore.com" className="mt-1" />
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="track-opens" defaultChecked />
                      <Label htmlFor="track-opens">Track email opens</Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="track-clicks" defaultChecked />
                      <Label htmlFor="track-clicks">Track link clicks</Label>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="border rounded-lg p-6 bg-background">
                  <div className="max-w-2xl mx-auto">
                    {/* Email Preview */}
                    <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-lg">
                      <h1 className="font-heading text-2xl font-bold">John's Artisan Store</h1>
                      <p className="text-primary-foreground/80">Handcrafted with Love in Zambia</p>
                    </div>

                    <div className="bg-white p-6 text-gray-800 rounded-b-lg border">
                      <h2 className="font-heading text-xl font-bold mb-4">{selectedTemplate.subject}</h2>

                      <p className="mb-4">Hi Sarah,</p>

                      <p className="mb-4">{selectedTemplate.preview}</p>

                      <p className="mb-4">
                        We're thrilled to have you as part of our community of craft enthusiasts. Our handmade products
                        are created with love and care by skilled artisans right here in Zambia.
                      </p>

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold mb-2">Here's what you can expect:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Unique, high-quality handcrafted items</li>
                          <li>Fast and reliable delivery</li>
                          <li>Excellent customer service</li>
                          <li>Regular updates on new arrivals</li>
                        </ul>
                      </div>

                      <div className="text-center mb-4">
                        <Button className="btn-studio-primary">Browse Our Collection</Button>
                      </div>

                      <p className="mb-4">
                        Best regards,
                        <br />
                        John's Artisan Store Team
                      </p>

                      <div className="bg-secondary/10 p-3 rounded-lg text-sm">
                        <strong>P.S.</strong> Use code <strong>WELCOME10</strong> for 10% off your first order!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
