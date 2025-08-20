import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, MoreHorizontal, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SurveysPage() {
  const surveys = [
    {
      id: 1,
      title: "Digital India Awareness Survey",
      status: "Active",
      responses: 15420,
      created: "2024-01-15",
      endDate: "2024-03-15",
      department: "IT Ministry",
      category: "Awareness",
    },
    {
      id: 2,
      title: "Rural Healthcare Access Study",
      status: "Draft",
      responses: 0,
      created: "2024-02-01",
      endDate: "2024-03-20",
      department: "Health Ministry",
      category: "Research",
    },
    {
      id: 3,
      title: "Education Quality Assessment",
      status: "Completed",
      responses: 8750,
      created: "2024-01-01",
      endDate: "2024-02-28",
      department: "Education Ministry",
      category: "Assessment",
    },
    {
      id: 4,
      title: "Urban Transportation Feedback",
      status: "Active",
      responses: 3240,
      created: "2024-02-10",
      endDate: "2024-04-10",
      department: "Urban Affairs",
      category: "Feedback",
    },
    {
      id: 5,
      title: "Agricultural Subsidy Awareness",
      status: "Scheduled",
      responses: 0,
      created: "2024-02-15",
      endDate: "2024-05-15",
      department: "Agriculture Ministry",
      category: "Awareness",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground font-inter">All Surveys</h1>
                <p className="text-sm text-muted-foreground">Manage and monitor your surveys</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/admin/surveys/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Survey
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search surveys..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="health">Health Ministry</SelectItem>
                    <SelectItem value="education">Education Ministry</SelectItem>
                    <SelectItem value="it">IT Ministry</SelectItem>
                    <SelectItem value="urban">Urban Affairs</SelectItem>
                    <SelectItem value="agriculture">Agriculture Ministry</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surveys List */}
        <div className="space-y-4">
          {surveys.map((survey) => (
            <Card key={survey.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-foreground font-inter">{survey.title}</h3>
                      <Badge
                        variant={
                          survey.status === "Active"
                            ? "default"
                            : survey.status === "Draft"
                              ? "secondary"
                              : survey.status === "Completed"
                                ? "outline"
                                : "secondary"
                        }
                      >
                        {survey.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Department:</span> {survey.department}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {survey.category}
                      </div>
                      <div>
                        <span className="font-medium">Responses:</span> {survey.responses.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">End Date:</span> {survey.endDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/surveys/${survey.id}/analytics`}>Analytics</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/surveys/${survey.id}/edit`}>Edit</Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-muted-foreground">Showing 1-5 of 12 surveys</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
