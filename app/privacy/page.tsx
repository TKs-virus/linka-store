import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
              <p className="text-center text-blue-100 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Personal Information:</strong> When you create an account, we collect your name, email
                    address, phone number, and billing information.
                  </p>
                  <p>
                    <strong>Business Information:</strong> For retailers, we collect business name, tax ID, business
                    address, and banking details for payments.
                  </p>
                  <p>
                    <strong>Usage Data:</strong> We automatically collect information about how you use our platform,
                    including IP address, browser type, pages visited, and interaction patterns.
                  </p>
                  <p>
                    <strong>Transaction Data:</strong> We collect information about purchases, sales, payments, and
                    other transactions on our platform.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <div className="space-y-2 text-gray-600">
                  <p>• Provide and maintain our marketplace services</p>
                  <p>• Process transactions and payments</p>
                  <p>• Communicate with you about your account and transactions</p>
                  <p>• Improve our platform and develop new features</p>
                  <p>• Prevent fraud and ensure platform security</p>
                  <p>• Comply with legal obligations</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>With Other Users:</strong> Your public profile information and listings are visible to other
                    platform users.
                  </p>
                  <p>
                    <strong>Service Providers:</strong> We share information with trusted third-party service providers
                    who help us operate our platform.
                  </p>
                  <p>
                    <strong>Legal Requirements:</strong> We may disclose information when required by law or to protect
                    our rights and safety.
                  </p>
                  <p>
                    <strong>Business Transfers:</strong> Information may be transferred in connection with mergers,
                    acquisitions, or asset sales.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
                <p className="text-gray-600">
                  We implement industry-standard security measures to protect your personal information, including
                  encryption, secure servers, and regular security audits. However, no method of transmission over the
                  internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
                <div className="space-y-2 text-gray-600">
                  <p>• Access and update your personal information</p>
                  <p>• Request deletion of your account and data</p>
                  <p>• Opt out of marketing communications</p>
                  <p>• Request data portability</p>
                  <p>• Lodge complaints with data protection authorities</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies and Tracking</h2>
                <p className="text-gray-600">
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and
                  provide personalized content. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Children's Privacy</h2>
                <p className="text-gray-600">
                  Our platform is not intended for users under 18 years of age. We do not knowingly collect personal
                  information from children under 18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Transfers</h2>
                <p className="text-gray-600">
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place for such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this privacy policy from time to time. We will notify you of any material changes by
                  posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
                <div className="text-gray-600">
                  <p>If you have questions about this privacy policy, please contact us at:</p>
                  <p className="mt-2">
                    <strong>Email:</strong> privacy@linka.com
                    <br />
                    <strong>Address:</strong> LINKA Privacy Team, [Your Business Address]
                    <br />
                    <strong>Phone:</strong> [Your Contact Number]
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
