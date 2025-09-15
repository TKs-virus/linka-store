import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
              <p className="text-center text-purple-100 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing or using the LINKA platform, you agree to be bound by these Terms of Service and all
                  applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                  using or accessing this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Platform Description</h2>
                <p className="text-gray-600">
                  LINKA is a comprehensive marketplace platform that connects buyers and sellers, provides various
                  services, and facilitates e-commerce transactions. We reserve the right to modify, suspend, or
                  discontinue any aspect of our platform at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts and Responsibilities</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Account Creation:</strong> You must provide accurate and complete information when creating
                    an account.
                  </p>
                  <p>
                    <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your
                    account credentials.
                  </p>
                  <p>
                    <strong>Prohibited Activities:</strong> You may not use our platform for illegal activities, fraud,
                    spam, or harassment.
                  </p>
                  <p>
                    <strong>Content Responsibility:</strong> You are solely responsible for all content you post or
                    transmit through our platform.
                  </p>
                </div>
              </section>

              <section className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h2 className="text-2xl font-semibold text-red-800 mb-4">4. Intellectual Property Protection</h2>
                <div className="space-y-4 text-red-700">
                  <p>
                    <strong>Proprietary Rights:</strong> All content, features, functionality, and technology of the
                    LINKA platform are the exclusive property of LINKA and are protected by copyright, trademark,
                    patent, and other intellectual property laws.
                  </p>

                  <p>
                    <strong>Reverse Engineering Prohibition:</strong> You are strictly prohibited from:
                  </p>
                  <div className="ml-4 space-y-2">
                    <p>• Reverse engineering, decompiling, or disassembling any part of our platform</p>
                    <p>• Attempting to derive source code, algorithms, or trade secrets</p>
                    <p>• Creating derivative works or competing platforms based on our technology</p>
                    <p>• Using automated tools to scrape, copy, or extract our data or functionality</p>
                    <p>• Circumventing security measures or access controls</p>
                  </div>

                  <p>
                    <strong>Legal Enforcement:</strong> Violation of these intellectual property rights will result in
                    immediate account termination and may subject you to civil and criminal penalties, including
                    monetary damages and injunctive relief.
                  </p>

                  <p>
                    <strong>Patent Protection:</strong> Our platform incorporates proprietary technologies and business
                    methods that may be protected by pending or issued patents. Unauthorized use may constitute patent
                    infringement.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Transaction Terms</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Payment Processing:</strong> All transactions are processed through secure third-party
                    payment processors.
                  </p>
                  <p>
                    <strong>Fees:</strong> We charge service fees as outlined in our fee schedule, which may be updated
                    from time to time.
                  </p>
                  <p>
                    <strong>Refunds:</strong> Refund policies vary by seller and are subject to our dispute resolution
                    process.
                  </p>
                  <p>
                    <strong>Tax Responsibility:</strong> Users are responsible for all applicable taxes on their
                    transactions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy and Data Protection</h2>
                <p className="text-gray-600">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                  platform, to understand our practices regarding the collection and use of your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600">
                  LINKA shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Indemnification</h2>
                <p className="text-gray-600">
                  You agree to defend, indemnify, and hold harmless LINKA and its officers, directors, employees, and
                  agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising
                  from your use of the platform or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Termination</h2>
                <p className="text-gray-600">
                  We may terminate or suspend your account and access to the platform immediately, without prior notice
                  or liability, for any reason whatsoever, including without limitation if you breach the Terms of
                  Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Dispute Resolution</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Governing Law:</strong> These terms shall be governed by and construed in accordance with
                    applicable laws.
                  </p>
                  <p>
                    <strong>Arbitration:</strong> Any disputes arising from these terms or your use of the platform
                    shall be resolved through binding arbitration.
                  </p>
                  <p>
                    <strong>Class Action Waiver:</strong> You agree not to participate in class action lawsuits against
                    LINKA.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify or replace these terms at any time. If a revision is material, we will
                  try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
                <div className="text-gray-600">
                  <p>If you have any questions about these Terms of Service, please contact us at:</p>
                  <p className="mt-2">
                    <strong>Email:</strong> legal@linka.com
                    <br />
                    <strong>Address:</strong> LINKA Legal Department, [Your Business Address]
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
