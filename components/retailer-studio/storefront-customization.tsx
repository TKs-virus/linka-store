"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Palette, Type, Layout, Save } from "lucide-react"

export function StorefrontCustomization() {
  const [storeName, setStoreName] = useState("John's Artisan Store")
  const [storeDescription, setStoreDescription] = useState("Handcrafted goods from the heart of Zambia")
  const [primaryColor, setPrimaryColor] = useState("#0891b2")
  const [accentColor, setAccentColor] = useState("#ea580c")

  return (
    <div className="space-y-6">
      <Card className="studio-card">
        <CardHeader>
          <CardTitle className="font-heading">Store Customization</CardTitle>
          <CardDescription>Personalize your storefront appearance and branding</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="branding" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="branding" className="gap-2">
                <Type className="h-4 w-4" />
                Branding
              </TabsTrigger>
              <TabsTrigger value="colors" className="gap-2">
                <Palette className="h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="layout" className="gap-2">
                <Layout className="h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="banner" className="gap-2">
                <Upload className="h-4 w-4" />
                Banner
              </TabsTrigger>
            </TabsList>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="store-description">Store Description</Label>
                    <Textarea
                      id="store-description"
                      value={storeDescription}
                      onChange={(e) => setStoreDescription(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="store-logo">Store Logo</Label>
                    <div className="mt-1 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Store Preview</Label>
                    <div className="mt-1 p-4 border rounded-lg bg-muted/30">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold">JS</span>
                        </div>
                        <h3 className="font-heading font-bold">{storeName}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{storeDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="accent-color"
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Color Presets</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { primary: "#0891b2", accent: "#ea580c" },
                        { primary: "#7c3aed", accent: "#f59e0b" },
                        { primary: "#dc2626", accent: "#059669" },
                        { primary: "#1f2937", accent: "#f97316" },
                      ].map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setPrimaryColor(preset.primary)
                            setAccentColor(preset.accent)
                          }}
                          className="flex h-8 rounded-md overflow-hidden border hover:scale-105 transition-transform"
                        >
                          <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                          <div className="flex-1" style={{ backgroundColor: preset.accent }} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Color Preview</Label>
                    <div className="mt-1 p-4 border rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                      <div className="space-y-3">
                        <div
                          className="px-4 py-2 rounded text-white text-sm font-medium"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Primary Button
                        </div>
                        <div
                          className="px-4 py-2 rounded text-white text-sm font-medium"
                          style={{ backgroundColor: accentColor }}
                        >
                          Accent Button
                        </div>
                        <div className="text-sm text-muted-foreground">
                          This is how your colors will appear in your store
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Store Rating</Label>
                    <p className="text-sm text-muted-foreground">Display your store rating and review count</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Product Favorites</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to favorite products</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Stock Levels</Label>
                    <p className="text-sm text-muted-foreground">Display remaining stock to customers</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Live Chat</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to message you directly</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            {/* Banner Tab */}
            <TabsContent value="banner" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Promotional Banner</Label>
                  <div className="mt-1 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Upload Banner Image</h3>
                    <p className="text-sm text-muted-foreground mb-4">Recommended size: 1200x400px</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="banner-text">Banner Text</Label>
                  <Input id="banner-text" placeholder="Up to 30% off - Shop Now!" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="banner-link">Banner Link (Optional)</Label>
                  <Input id="banner-link" placeholder="https://your-promotion-page.com" className="mt-1" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t">
            <Button className="gap-2 btn-studio-primary">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
