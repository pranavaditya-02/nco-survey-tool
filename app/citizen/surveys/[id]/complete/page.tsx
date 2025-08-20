import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Share2, Home, Award, Clock } from "lucide-react"
import Link from "next/link"

export default function SurveyComplete({ params }: { params: { id: string } }) {
  const survey = {
    id: params.id,
    title: "Digital India Awareness Survey",
    completedAt: new Date().toLocaleDateString(),
    timeSpent: "7 minutes 32 seconds",
    certificateId: "CERT-DIA-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-secondary-foreground" />
          </div>
          <CardTitle className="text-2xl font-inter">Survey Completed Successfully!</CardTitle>
          <CardDescription className="text-base">
            Thank you for participating in "{survey.title}". Your responses have been recorded securely.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Completion Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">Time Spent</span>
              </div>
              <p className="text-sm text-muted-foreground">{survey.timeSpent}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                <span className="font-medium">Completed</span>
              </div>
              <p className="text-sm text-muted-foreground">{survey.completedAt}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">Certificate</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Available
              </Badge>
            </div>
          </div>

          {/* Certificate Section */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-inter">Certificate of Participation</CardTitle>
              </div>
              <CardDescription>Your official certificate is ready for download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-1">Certificate ID: {survey.certificateId}</p>
                <p className="text-xs text-muted-foreground">
                  This certificate verifies your participation in the government survey and can be used for official
                  purposes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate (PDF)
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Achievement
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Impact Message */}
          <div className="text-center p-4 bg-secondary/10 rounded-lg">
            <h4 className="font-medium text-foreground mb-2 font-inter">Your Voice Matters</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your responses will help the Government of India improve digital services and make them more accessible
              for all citizens. Thank you for contributing to a better digital India.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href="/citizen">
                <Home className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/citizen">Take Another Survey</Link>
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
            <p>
              Your data is protected under the Digital Personal Data Protection Act, 2023.
              <Link href="/privacy" className="text-primary hover:underline ml-1">
                Learn more about data privacy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
