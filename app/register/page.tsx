import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-secondary-foreground" />
          </div>
          <CardTitle className="text-2xl font-inter">Citizen Registration</CardTitle>
          <CardDescription>Join the NCO Smart Survey platform to participate in government surveys</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-sm">
              Automatic Registration Available
            </Badge>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For citizens, registration happens automatically when you first login using your Aadhaar number, phone
              number, or email address. No separate registration required.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-foreground font-inter">What you'll need:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Valid Aadhaar number (recommended)</li>
              <li>• Mobile number for OTP verification</li>
              <li>• Email address (optional)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button className="w-full" asChild>
              <Link href="/login">Proceed to Login</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Government employees and analysts require separate credentials.{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact support
              </Link>{" "}
              for access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
