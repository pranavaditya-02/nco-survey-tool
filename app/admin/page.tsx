import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, BarChart3, Users, Calendar, Settings, FileText } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const recentSurveys = [
    { id: 1, title: "Digital India Awareness Survey", status: "Active", responses: 15420, endDate: "2024-03-15" },
    { id: 2, title: "Rural Healthcare Access Study", status: "Draft", responses: 0, endDate: "2024-03-20" },
    { id: 3, title: "Education Quality Assessment", status: "Completed", responses: 8750, endDate: "2024-02-28" },
  ]

  const stats = [
    { label: "Active Surveys", value: "12", icon: FileText, color: "text-primary" },
    { label: "Total Responses", value: "45,230", icon: Users, color: "text-secondary" },
    { label: "Completion Rate", value: "87%", icon: BarChart3, color: "text-primary" },
    { label: "Avg. Response Time", value: "4.2 min", icon: Calendar, color: "text-secondary" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground font-inter">Survey Management</h1>
              <p className="text-sm text-muted-foreground">Create and manage government surveys</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button asChild>
                <Link href="/admin/surveys/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Survey
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground font-inter">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Surveys */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-inter">Recent Surveys</CardTitle>
                <CardDescription>Manage your active and draft surveys</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/admin/surveys">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSurveys.map((survey) => (
                <div key={survey.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground font-inter">{survey.title}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge
                        variant={
                          survey.status === "Active" ? "default" : survey.status === "Draft" ? "secondary" : "outline"
                        }
                      >
                        {survey.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{survey.responses} responses</span>
                      <span className="text-sm text-muted-foreground">Ends: {survey.endDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/surveys/${survey.id}/analytics`}>Analytics</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/surveys/${survey.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
