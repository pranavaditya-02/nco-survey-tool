"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { ArrowLeft, Download, Share2, TrendingUp, Users, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function SurveyAnalytics({ params }: { params: { id: string } }) {
  const [selectedQuestion, setSelectedQuestion] = useState("all")

  // Mock survey data
  const survey = {
    id: params.id,
    title: "Digital India Awareness Survey",
    status: "Active",
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    totalResponses: 15420,
    targetResponses: 50000,
    completionRate: 87.3,
    avgResponseTime: "4.2 minutes",
    qualityScore: 8.7,
  }

  // Question-wise analysis
  const questionAnalysis = [
    {
      id: "q1",
      question: "How often do you use digital government services?",
      type: "mcq",
      responses: 15420,
      data: [
        { option: "Daily", count: 3084, percentage: 20 },
        { option: "Weekly", count: 4626, percentage: 30 },
        { option: "Monthly", count: 4626, percentage: 30 },
        { option: "Rarely", count: 2313, percentage: 15 },
        { option: "Never", count: 771, percentage: 5 },
      ],
    },
    {
      id: "q2",
      question: "Rate your satisfaction with digital services",
      type: "likert",
      responses: 15420,
      data: [
        { rating: "1", count: 308, percentage: 2 },
        { rating: "2", count: 771, percentage: 5 },
        { rating: "3", count: 3084, percentage: 20 },
        { rating: "4", count: 6168, percentage: 40 },
        { rating: "5", count: 5089, percentage: 33 },
      ],
    },
  ]

  const responseTimeline = [
    { date: "Week 1", responses: 2100, cumulative: 2100 },
    { date: "Week 2", responses: 2800, cumulative: 4900 },
    { date: "Week 3", responses: 3200, cumulative: 8100 },
    { date: "Week 4", responses: 2900, cumulative: 11000 },
    { date: "Week 5", responses: 2600, cumulative: 13600 },
    { date: "Week 6", responses: 1820, cumulative: 15420 },
  ]

  const sentimentData = [
    { aspect: "Ease of Use", score: 8.2 },
    { aspect: "Speed", score: 7.8 },
    { aspect: "Reliability", score: 8.5 },
    { aspect: "Accessibility", score: 7.2 },
    { aspect: "Support", score: 6.9 },
    { aspect: "Overall", score: 8.1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/analytics">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analytics
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground font-inter">{survey.title}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge variant="default">{survey.status}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {survey.totalResponses.toLocaleString()} responses
                  </span>
                  <span className="text-sm text-muted-foreground">{survey.completionRate}% completion rate</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Survey Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                  <p className="text-2xl font-bold text-foreground font-inter">
                    {survey.totalResponses.toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <Progress value={(survey.totalResponses / survey.targetResponses) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((survey.totalResponses / survey.targetResponses) * 100)}% of target
                    </p>
                  </div>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold text-foreground font-inter">{survey.completionRate}%</p>
                  <p className="text-xs text-secondary mt-1">+2.1% vs last week</p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-foreground font-inter">{survey.avgResponseTime}</p>
                  <p className="text-xs text-primary mt-1">-0.8 min vs target</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quality Score</p>
                  <p className="text-2xl font-bold text-foreground font-inter">{survey.qualityScore}/10</p>
                  <p className="text-xs text-secondary mt-1">Excellent quality</p>
                </div>
                <Star className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="responses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="responses">Response Analysis</TabsTrigger>
            <TabsTrigger value="questions">Question Breakdown</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>

          <TabsContent value="responses" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Response Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Response Timeline</CardTitle>
                  <CardDescription>Weekly response collection progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={responseTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="responses"
                        stroke="#FF9933"
                        strokeWidth={2}
                        name="Weekly Responses"
                      />
                      <Line type="monotone" dataKey="cumulative" stroke="#138808" strokeWidth={2} name="Cumulative" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Completion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Completion Funnel</CardTitle>
                  <CardDescription>Survey completion stages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "Started Survey", count: 17650, percentage: 100 },
                      { stage: "Completed Section 1", count: 16420, percentage: 93 },
                      { stage: "Completed Section 2", count: 15890, percentage: 90 },
                      { stage: "Completed Section 3", count: 15420, percentage: 87 },
                      { stage: "Submitted Survey", count: 15420, percentage: 87 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.stage}</span>
                          <span>
                            {item.count.toLocaleString()} ({item.percentage}%)
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            {questionAnalysis.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg font-inter">{question.question}</CardTitle>
                  <CardDescription>
                    {question.responses.toLocaleString()} responses • {question.type.toUpperCase()} question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={question.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={question.type === "likert" ? "rating" : "option"} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#FF9933" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {question.data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {question.type === "likert" ? `Rating ${item.rating}` : item.option}
                          </span>
                          <div className="flex items-center space-x-3">
                            <div className="w-20">
                              <Progress value={item.percentage} />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                            <span className="text-sm text-muted-foreground w-16">({item.count.toLocaleString()})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Sentiment Radar */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Sentiment Analysis</CardTitle>
                  <CardDescription>AI-powered sentiment scoring across different aspects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={sentimentData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="aspect" />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} />
                      <Radar name="Score" dataKey="score" stroke="#FF9933" fill="#FF9933" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sentiment Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Detailed Sentiment Scores</CardTitle>
                  <CardDescription>Breakdown by survey aspects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sentimentData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{item.aspect}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24">
                            <Progress value={item.score * 10} />
                          </div>
                          <span className="text-sm font-medium w-8">{item.score}</span>
                          <Badge variant={item.score >= 8 ? "default" : item.score >= 6 ? "secondary" : "destructive"}>
                            {item.score >= 8 ? "Excellent" : item.score >= 6 ? "Good" : "Needs Improvement"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Text Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Common Themes</CardTitle>
                <CardDescription>Most frequently mentioned topics in open-ended responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Positive Feedback</h4>
                    <div className="space-y-2">
                      {[
                        { theme: "Easy to use", mentions: 1240 },
                        { theme: "Fast processing", mentions: 980 },
                        { theme: "Helpful support", mentions: 720 },
                        { theme: "Good accessibility", mentions: 560 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                          <span className="text-sm">{item.theme}</span>
                          <Badge variant="secondary">{item.mentions} mentions</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Areas for Improvement</h4>
                    <div className="space-y-2">
                      {[
                        { theme: "Slow loading", mentions: 420 },
                        { theme: "Complex navigation", mentions: 380 },
                        { theme: "Limited language options", mentions: 290 },
                        { theme: "Technical errors", mentions: 180 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-destructive/10 rounded">
                          <span className="text-sm">{item.theme}</span>
                          <Badge variant="outline">{item.mentions} mentions</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Survey Timeline</CardTitle>
                <CardDescription>Detailed timeline of survey activities and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      date: "2024-02-01",
                      event: "Survey launched",
                      type: "milestone",
                      details: "Survey went live to public",
                    },
                    {
                      date: "2024-02-03",
                      event: "1,000 responses",
                      type: "milestone",
                      details: "First milestone reached",
                    },
                    {
                      date: "2024-02-07",
                      event: "Peak response day",
                      type: "highlight",
                      details: "2,100 responses in single day",
                    },
                    {
                      date: "2024-02-15",
                      event: "10,000 responses",
                      type: "milestone",
                      details: "Major milestone achieved",
                    },
                    {
                      date: "2024-02-20",
                      event: "Quality review",
                      type: "action",
                      details: "Data quality assessment completed",
                    },
                    {
                      date: "2024-02-28",
                      event: "15,000 responses",
                      type: "milestone",
                      details: "Current response count",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          item.type === "milestone"
                            ? "bg-primary"
                            : item.type === "highlight"
                              ? "bg-secondary"
                              : "bg-muted-foreground"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{item.event}</h4>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
