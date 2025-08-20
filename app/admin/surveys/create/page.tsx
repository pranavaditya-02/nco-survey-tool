"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, ArrowLeft, Save, Eye, Brain } from "lucide-react"
import Link from "next/link"

type QuestionType = "mcq" | "text" | "likert" | "ranking" | "boolean" | "date"

interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options?: string[]
  skipLogic?: {
    condition: string
    targetQuestion: string
  }
}

export default function CreateSurvey() {
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [activeTab, setActiveTab] = useState("basic")

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      type,
      title: "",
      required: false,
      options: type === "mcq" || type === "ranking" ? [""] : undefined,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      updateQuestion(questionId, {
        options: [...question.options, ""],
      })
    }
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options && question.options.length > 1) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const questionTypes = [
    { value: "mcq", label: "Multiple Choice", description: "Single or multiple selection" },
    { value: "text", label: "Text Response", description: "Short or long text input" },
    { value: "likert", label: "Likert Scale", description: "Rating scale (1-5, 1-7, etc.)" },
    { value: "ranking", label: "Ranking", description: "Order items by preference" },
    { value: "boolean", label: "Yes/No", description: "Simple boolean choice" },
    { value: "date", label: "Date", description: "Date picker input" },
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
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground font-inter">Create New Survey</h1>
                <p className="text-sm text-muted-foreground">Design your government survey with AI-powered features</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button>Publish Survey</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="logic">Skip Logic</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Survey Information</CardTitle>
                <CardDescription>Basic details about your survey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Survey Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter survey title"
                    value={surveyTitle}
                    onChange={(e) => setSurveyTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose and scope of this survey"
                    value={surveyDescription}
                    onChange={(e) => setSurveyDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="census">Census Operations</SelectItem>
                        <SelectItem value="health">Health Ministry</SelectItem>
                        <SelectItem value="education">Education Ministry</SelectItem>
                        <SelectItem value="rural">Rural Development</SelectItem>
                        <SelectItem value="urban">Urban Affairs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demographic">Demographic Study</SelectItem>
                        <SelectItem value="satisfaction">Satisfaction Survey</SelectItem>
                        <SelectItem value="awareness">Awareness Assessment</SelectItem>
                        <SelectItem value="feedback">Service Feedback</SelectItem>
                        <SelectItem value="research">Research Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-inter">Survey Questions</CardTitle>
                    <CardDescription>Add and configure questions for your survey</CardDescription>
                  </div>
                  <Badge variant="secondary">{questions.length} questions</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {questions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No questions added yet</p>
                    <p className="text-sm text-muted-foreground mb-6">Start by adding your first question below</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <Card key={question.id} className="border-l-4 border-l-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">Question {index + 1}</Badge>
                            <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Question Type</Label>
                              <Select
                                value={question.type}
                                onValueChange={(value: QuestionType) => updateQuestion(question.id, { type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {questionTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={question.required}
                                onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
                              />
                              <Label>Required</Label>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Question Title</Label>
                            <Input
                              placeholder="Enter your question"
                              value={question.title}
                              onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Description (Optional)</Label>
                            <Textarea
                              placeholder="Additional context or instructions"
                              value={question.description || ""}
                              onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                              rows={2}
                            />
                          </div>

                          {(question.type === "mcq" || question.type === "ranking") && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label>Options</Label>
                                <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Option
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {question.options?.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-2">
                                    <Input
                                      placeholder={`Option ${optionIndex + 1}`}
                                      value={option}
                                      onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                    />
                                    {question.options && question.options.length > 1 && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeOption(question.id, optionIndex)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {question.type === "likert" && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Scale Type</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select scale" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1-5">1-5 Scale</SelectItem>
                                    <SelectItem value="1-7">1-7 Scale</SelectItem>
                                    <SelectItem value="1-10">1-10 Scale</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Labels</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select labels" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="satisfaction">Satisfaction (Very Poor - Excellent)</SelectItem>
                                    <SelectItem value="agreement">
                                      Agreement (Strongly Disagree - Strongly Agree)
                                    </SelectItem>
                                    <SelectItem value="frequency">Frequency (Never - Always)</SelectItem>
                                    <SelectItem value="importance">
                                      Importance (Not Important - Very Important)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {questionTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant="outline"
                        className="h-auto p-3 flex flex-col items-center text-center bg-transparent"
                        onClick={() => addQuestion(type.value as QuestionType)}
                      >
                        <Plus className="h-4 w-4 mb-1" />
                        <span className="text-xs font-medium">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logic" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle className="font-inter">AI-Powered Skip Logic</CardTitle>
                </div>
                <CardDescription>Configure adaptive questioning and conditional logic</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2 font-inter">Adaptive Questioning</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI will automatically adjust questions based on previous responses to improve relevance and reduce
                    survey fatigue.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Enable AI-powered adaptive questioning</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground font-inter">Manual Skip Logic Rules</h4>
                  {questions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Add questions first to configure skip logic</p>
                  ) : (
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <Card key={question.id} className="border-l-2 border-l-secondary">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-foreground">
                                Q{index + 1}: {question.title || "Untitled Question"}
                              </h5>
                              <Badge variant="outline">{question.type}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="If answer is..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equals">Equals</SelectItem>
                                  <SelectItem value="not-equals">Not equals</SelectItem>
                                  <SelectItem value="contains">Contains</SelectItem>
                                  <SelectItem value="greater">Greater than</SelectItem>
                                  <SelectItem value="less">Less than</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input placeholder="Value" />
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Then go to..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="next">Next question</SelectItem>
                                  <SelectItem value="skip">Skip to question</SelectItem>
                                  <SelectItem value="end">End survey</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Survey Settings</CardTitle>
                  <CardDescription>Configure survey behavior and access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-responses">Maximum Responses</Label>
                    <Input id="max-responses" type="number" placeholder="Leave empty for unlimited" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Allow multiple responses per user</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Require authentication</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Accessibility & Language</CardTitle>
                  <CardDescription>Configure multilingual and accessibility options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="bn">Bengali</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="mr">Marathi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="gu">Gujarati</SelectItem>
                        <SelectItem value="kn">Kannada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Enable AI translation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Voice-to-text support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>High contrast mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Screen reader optimization</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
