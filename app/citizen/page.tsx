import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, Users, Award, Globe, Mic, Play, CheckCircle, Calendar, Filter } from "lucide-react"
import Link from "next/link"

export default function CitizenDashboard() {
  const availableSurveys = [
    {
      id: 1,
      title: "Digital India Awareness Survey",
      description: "Help us understand digital literacy and technology adoption across India",
      department: "IT Ministry",
      duration: "8-12 minutes",
      responses: 15420,
      maxResponses: 50000,
      endDate: "2024-03-15",
      languages: ["English", "Hindi", "Bengali", "Tamil"],
      incentive: "Certificate of Participation",
      status: "available",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Healthcare Service Feedback",
      description: "Share your experience with government healthcare services in your area",
      department: "Health Ministry",
      duration: "5-8 minutes",
      responses: 8750,
      maxResponses: 25000,
      endDate: "2024-04-20",
      languages: ["English", "Hindi", "Marathi", "Gujarati"],
      incentive: "Healthcare Tips Guide",
      status: "available",
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "Urban Transportation Study",
      description: "Help improve public transportation in your city",
      department: "Urban Affairs",
      duration: "10-15 minutes",
      responses: 3240,
      maxResponses: 15000,
      endDate: "2024-04-10",
      languages: ["English", "Hindi", "Telugu", "Kannada"],
      incentive: "Transportation Report Access",
      status: "available",
      difficulty: "Medium",
    },
  ]

  const completedSurveys = [
    {
      id: 4,
      title: "Education Quality Assessment",
      completedDate: "2024-02-15",
      certificate: true,
    },
    {
      id: 5,
      title: "Rural Development Feedback",
      completedDate: "2024-01-28",
      certificate: true,
    },
  ]

  const stats = [
    { label: "Surveys Completed", value: "12", icon: CheckCircle, color: "text-secondary" },
    { label: "Certificates Earned", value: "10", icon: Award, color: "text-primary" },
    { label: "Total Time Contributed", value: "2.5 hrs", icon: Clock, color: "text-secondary" },
    { label: "Impact Points", value: "850", icon: Users, color: "text-primary" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground font-inter">Citizen Portal</h1>
              <p className="text-sm text-muted-foreground">
                Participate in government surveys and make your voice heard
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/citizen/profile">My Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/citizen/certificates">My Certificates</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold text-foreground font-inter">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search surveys by topic, department..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="health">Health Ministry</SelectItem>
                    <SelectItem value="education">Education Ministry</SelectItem>
                    <SelectItem value="it">IT Ministry</SelectItem>
                    <SelectItem value="urban">Urban Affairs</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Duration</SelectItem>
                    <SelectItem value="short">Under 5 min</SelectItem>
                    <SelectItem value="medium">5-15 min</SelectItem>
                    <SelectItem value="long">15+ min</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Surveys */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground font-inter">Available Surveys</h2>
              <Badge variant="secondary">{availableSurveys.length} surveys</Badge>
            </div>

            <div className="space-y-6">
              {availableSurveys.map((survey) => (
                <Card key={survey.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg font-inter">{survey.title}</CardTitle>
                          <Badge variant="outline">{survey.difficulty}</Badge>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">{survey.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Survey Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{survey.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{survey.responses.toLocaleString()} responses</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Ends {survey.endDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{survey.incentive}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Response Progress</span>
                          <span className="font-medium">
                            {Math.round((survey.responses / survey.maxResponses) * 100)}%
                          </span>
                        </div>
                        <Progress value={(survey.responses / survey.maxResponses) * 100} className="h-2" />
                      </div>

                      {/* Languages and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-wrap gap-1">
                            {survey.languages.slice(0, 3).map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                            {survey.languages.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{survey.languages.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/citizen/surveys/${survey.id}/preview`}>Preview</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/citizen/surveys/${survey.id}/take`}>
                              <Play className="h-4 w-4 mr-1" />
                              Start Survey
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-inter">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/citizen/surveys/voice">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice-Enabled Surveys
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/citizen/help">
                    <Globe className="h-4 w-4 mr-2" />
                    Language Support
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/citizen/certificates">
                    <Award className="h-4 w-4 mr-2" />
                    Download Certificates
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-inter">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedSurveys.map((survey) => (
                    <div key={survey.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{survey.title}</p>
                        <p className="text-xs text-muted-foreground">Completed {survey.completedDate}</p>
                      </div>
                      {survey.certificate && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-inter">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Get assistance with surveys, technical issues, or accessibility features.
                </p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/citizen/help">Help Center</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/citizen/chat">Chat Assistant</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
