"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  Users,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  MapPin,
  Shield,
  Eye,
  RefreshCw,
  FileText,
  BarChart3,
} from "lucide-react"

export default function AnalyticsDashboard() {
  const [selectedSurvey, setSelectedSurvey] = useState("all")
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("responses")

  // Mock data for charts
  const responseData = [
    { date: "2024-02-01", responses: 1200, completed: 980 },
    { date: "2024-02-02", responses: 1450, completed: 1180 },
    { date: "2024-02-03", responses: 1680, completed: 1420 },
    { date: "2024-02-04", responses: 1320, completed: 1100 },
    { date: "2024-02-05", responses: 1890, completed: 1650 },
    { date: "2024-02-06", responses: 2100, completed: 1850 },
    { date: "2024-02-07", responses: 1750, completed: 1520 },
  ]

  const demographicData = [
    { name: "18-25", value: 2400, percentage: 28 },
    { name: "26-35", value: 3200, percentage: 37 },
    { name: "36-45", value: 1800, percentage: 21 },
    { name: "46-55", value: 800, percentage: 9 },
    { name: "55+", value: 400, percentage: 5 },
  ]

  const locationData = [
    { state: "Maharashtra", responses: 4200, completion: 87 },
    { state: "Karnataka", responses: 3800, completion: 82 },
    { state: "Tamil Nadu", responses: 3500, completion: 89 },
    { state: "Gujarat", responses: 3200, completion: 85 },
    { state: "West Bengal", responses: 2900, completion: 78 },
    { state: "Rajasthan", responses: 2600, completion: 80 },
  ]

  const deviceData = [
    { device: "Mobile", value: 6500, color: "#FF9933" },
    { device: "Desktop", value: 2800, color: "#138808" },
    { device: "Tablet", value: 1200, color: "#0066CC" },
  ]

  const fraudAlerts = [
    {
      id: 1,
      type: "Duplicate Response",
      survey: "Digital India Survey",
      count: 23,
      severity: "medium",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "Rapid Completion",
      survey: "Healthcare Feedback",
      count: 15,
      severity: "low",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      type: "Inconsistent Answers",
      survey: "Education Assessment",
      count: 8,
      severity: "high",
      timestamp: "6 hours ago",
    },
  ]

  const kpiData = [
    { label: "Total Responses", value: "45,230", change: "+12.5%", trend: "up", icon: Users },
    { label: "Completion Rate", value: "87.3%", change: "+2.1%", trend: "up", icon: TrendingUp },
    { label: "Avg. Response Time", value: "4.2 min", change: "-0.8 min", trend: "down", icon: BarChart3 },
    { label: "Fraud Detection", value: "0.3%", change: "-0.1%", trend: "down", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground font-inter">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time survey analytics and insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Survey" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Surveys</SelectItem>
                  <SelectItem value="digital-india">Digital India Survey</SelectItem>
                  <SelectItem value="healthcare">Healthcare Feedback</SelectItem>
                  <SelectItem value="education">Education Assessment</SelectItem>
                  <SelectItem value="transport">Transportation Study</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="responses">Responses</SelectItem>
                  <SelectItem value="completion">Completion Rate</SelectItem>
                  <SelectItem value="time">Response Time</SelectItem>
                  <SelectItem value="quality">Quality Score</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold text-foreground font-inter">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm ${kpi.trend === "up" ? "text-secondary" : "text-primary"}`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <kpi.icon className={`h-8 w-8 ${kpi.trend === "up" ? "text-secondary" : "text-primary"}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="geographic">Geographic</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Response Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Response Trends</CardTitle>
                  <CardDescription>Daily response and completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={responseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="responses"
                        stackId="1"
                        stroke="#FF9933"
                        fill="#FF9933"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="completed"
                        stackId="1"
                        stroke="#138808"
                        fill="#138808"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Device Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Device Usage</CardTitle>
                  <CardDescription>Survey responses by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Real-time Activity</CardTitle>
                <CardDescription>Live survey participation across all active surveys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { survey: "Digital India Survey", active: 234, rate: 87 },
                    { survey: "Healthcare Feedback", active: 156, rate: 92 },
                    { survey: "Education Assessment", active: 89, rate: 78 },
                    { survey: "Transportation Study", active: 67, rate: 85 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.survey}</h4>
                        <p className="text-sm text-muted-foreground">{item.active} active participants</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.rate}%</p>
                          <p className="text-xs text-muted-foreground">completion</p>
                        </div>
                        <Progress value={item.rate} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Age Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Age Distribution</CardTitle>
                  <CardDescription>Survey participation by age groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={demographicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#FF9933" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gender Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Gender Distribution</CardTitle>
                  <CardDescription>Survey responses by gender</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Male", value: 5200, color: "#FF9933" },
                          { name: "Female", value: 4800, color: "#138808" },
                          { name: "Other", value: 230, color: "#0066CC" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: "Male", value: 5200, color: "#FF9933" },
                          { name: "Female", value: 4800, color: "#138808" },
                          { name: "Other", value: 230, color: "#0066CC" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Language Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Language Preferences</CardTitle>
                <CardDescription>Survey completion by preferred language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { language: "English", responses: 6200, percentage: 58 },
                    { language: "Hindi", responses: 2800, percentage: 26 },
                    { language: "Bengali", responses: 800, percentage: 7 },
                    { language: "Tamil", responses: 600, percentage: 6 },
                    { language: "Others", responses: 330, percentage: 3 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-primary rounded-sm"></div>
                        <span className="font-medium">{item.language}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{item.responses.toLocaleString()}</span>
                        <div className="w-24">
                          <Progress value={item.percentage} />
                        </div>
                        <span className="text-sm font-medium w-12">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geographic" className="space-y-6">
            {/* State-wise Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">State-wise Response Distribution</CardTitle>
                <CardDescription>Survey participation and completion rates by state</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={locationData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="state" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="responses" fill="#FF9933" name="Responses" />
                    <Bar dataKey="completion" fill="#138808" name="Completion %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Urban vs Rural */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Urban vs Rural</CardTitle>
                  <CardDescription>Response distribution by area type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Urban", value: 7200, color: "#FF9933" },
                          { name: "Rural", value: 3030, color: "#138808" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: "Urban", value: 7200, color: "#FF9933" },
                          { name: "Rural", value: 3030, color: "#138808" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Top Performing Cities</CardTitle>
                  <CardDescription>Highest response rates by city</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { city: "Mumbai", responses: 1200, rate: 94 },
                      { city: "Bangalore", responses: 980, rate: 91 },
                      { city: "Chennai", responses: 850, rate: 89 },
                      { city: "Pune", responses: 720, rate: 87 },
                      { city: "Hyderabad", responses: 680, rate: 85 },
                    ].map((city, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{city.city}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground">{city.responses}</span>
                          <Badge variant="secondary">{city.rate}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fraud" className="space-y-6">
            {/* Fraud Detection Overview */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Suspicious Responses</p>
                      <p className="text-2xl font-bold text-destructive font-inter">46</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Fraud Rate</p>
                      <p className="text-2xl font-bold text-foreground font-inter">0.3%</p>
                    </div>
                    <Shield className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Auto-blocked</p>
                      <p className="text-2xl font-bold text-foreground font-inter">12</p>
                    </div>
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fraud Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Recent Fraud Alerts</CardTitle>
                <CardDescription>AI-powered fraud detection findings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            alert.severity === "high"
                              ? "text-destructive"
                              : alert.severity === "medium"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium text-foreground">{alert.type}</h4>
                          <p className="text-sm text-muted-foreground">{alert.survey}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {alert.count} cases
                        </Badge>
                        <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fraud Detection Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Detection Patterns</CardTitle>
                <CardDescription>Common fraud patterns identified by AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Pattern Analysis</h4>
                    {[
                      { pattern: "Rapid completion (< 30 sec)", count: 23, risk: "Medium" },
                      { pattern: "Duplicate IP addresses", count: 15, risk: "High" },
                      { pattern: "Inconsistent demographics", count: 8, risk: "High" },
                      { pattern: "Bot-like behavior", count: 5, risk: "Critical" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.pattern}</p>
                          <p className="text-xs text-muted-foreground">{item.count} instances</p>
                        </div>
                        <Badge
                          variant={
                            item.risk === "Critical" ? "destructive" : item.risk === "High" ? "destructive" : "default"
                          }
                        >
                          {item.risk}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">AI Confidence Scores</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { category: "Legitimate", score: 94 },
                          { category: "Suspicious", score: 6 },
                          { category: "Fraudulent", score: 0.3 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#FF9933" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Report Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Generate Custom Reports</CardTitle>
                <CardDescription>Create detailed analytics reports for stakeholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Report Templates</h4>
                    {[
                      { name: "Executive Summary", description: "High-level overview for leadership", format: "PDF" },
                      { name: "Detailed Analytics", description: "Comprehensive data analysis", format: "Excel" },
                      { name: "Demographic Report", description: "Population insights and trends", format: "PDF" },
                      { name: "Fraud Detection Report", description: "Security and quality analysis", format: "PDF" },
                    ].map((template, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <h5 className="font-medium text-foreground">{template.name}</h5>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{template.format}</Badge>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Scheduled Reports</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Weekly Summary", schedule: "Every Monday 9:00 AM", recipients: 3 },
                        { name: "Monthly Analytics", schedule: "1st of every month", recipients: 8 },
                        { name: "Fraud Alert Report", schedule: "Daily if alerts > 5", recipients: 2 },
                      ].map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{report.name}</p>
                            <p className="text-xs text-muted-foreground">{report.schedule}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{report.recipients} recipients</Badge>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule New Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Data Export</CardTitle>
                <CardDescription>Export raw data and processed analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-sm">Export as CSV</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span className="text-sm">Export as Excel</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="text-sm">Export as PDF</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
