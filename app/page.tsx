import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BarChart3, Shield, Globe, Mic, Brain } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-inter">NCO Smart Survey Tool</h1>
                <p className="text-sm text-muted-foreground">Government of India</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Trusted by Government Agencies
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
            Empowering India Through
            <span className="text-primary"> Smart Surveys</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A comprehensive, secure, and accessible platform for conducting large-scale government surveys with
            AI-powered insights and multilingual support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/citizen">Take a Survey</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/admin">Government Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 font-inter">Built for Modern Governance</h3>
            <p className="text-lg text-muted-foreground">
              Advanced features designed for transparency, accessibility, and efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-inter">Multilingual Support</CardTitle>
                <CardDescription>
                  AI-powered translation supporting English and all major Indian regional languages
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Mic className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-inter">Voice Responses</CardTitle>
                <CardDescription>
                  Speech-to-text technology enabling voice-based survey participation for better accessibility
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-inter">AI-Powered Analytics</CardTitle>
                <CardDescription>
                  Intelligent fraud detection, adaptive questioning, and real-time insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-secondary mb-2" />
                <CardTitle className="font-inter">Privacy & Security</CardTitle>
                <CardDescription>
                  End-to-end encryption, GDPR compliance, and privacy-by-design architecture
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-secondary mb-2" />
                <CardTitle className="font-inter">Role-Based Access</CardTitle>
                <CardDescription>
                  Secure authentication for citizens, survey creators, and data analysts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-secondary mb-2" />
                <CardTitle className="font-inter">Real-Time Dashboard</CardTitle>
                <CardDescription>Live analytics, demographic insights, and exportable reports</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-inter">10M+</div>
              <div className="text-sm text-muted-foreground">Survey Responses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-inter">22</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-inter">500+</div>
              <div className="text-sm text-muted-foreground">Government Agencies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-inter">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4 font-inter">
            Ready to Transform Your Survey Process?
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join thousands of government agencies already using our platform for better citizen engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/demo">Request Demo</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-foreground mb-4 font-inter">NCO Survey Tool</h4>
              <p className="text-sm text-muted-foreground">
                Official government platform for conducting secure, accessible surveys across India.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-3 font-inter">For Citizens</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/surveys" className="hover:text-primary">
                    Available Surveys
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-3 font-inter">For Government</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/admin" className="hover:text-primary">
                    Admin Portal
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-primary">
                    Analytics Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-primary">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-3 font-inter">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="hover:text-primary">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 Government of India. All rights reserved. | Built with security and accessibility in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
