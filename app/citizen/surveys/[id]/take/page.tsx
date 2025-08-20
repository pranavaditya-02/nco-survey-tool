"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Mic, MicOff, Globe, Volume2, Pause, HelpCircle, Save } from "lucide-react"
import Link from "next/link"

export default function TakeSurvey({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isRecording, setIsRecording] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isPlaying, setIsPlaying] = useState(false)

  // Mock survey data
  const survey = {
    id: params.id,
    title: "Digital India Awareness Survey",
    description: "Help us understand digital literacy and technology adoption across India",
    totalQuestions: 8,
    estimatedTime: "8-12 minutes",
    languages: [
      { code: "en", name: "English" },
      { code: "hi", name: "हिंदी" },
      { code: "bn", name: "বাংলা" },
      { code: "ta", name: "தமிழ்" },
    ],
  }

  const questions = [
    {
      id: "q1",
      type: "mcq",
      title: "How often do you use digital government services?",
      description: "This includes services like Aadhaar updates, tax filing, or applying for certificates online.",
      required: true,
      options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
    },
    {
      id: "q2",
      type: "text",
      title: "What challenges do you face when using digital government services?",
      description: "Please describe any difficulties or barriers you encounter.",
      required: false,
    },
    {
      id: "q3",
      type: "likert",
      title: "How satisfied are you with the current digital government services?",
      description: "Rate your overall satisfaction level.",
      required: true,
      scale: {
        min: 1,
        max: 5,
        labels: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"],
      },
    },
    {
      id: "q4",
      type: "mcq-multiple",
      title: "Which digital devices do you use to access government services?",
      description: "Select all that apply.",
      required: true,
      options: [
        "Smartphone",
        "Laptop/Desktop Computer",
        "Tablet",
        "Internet Cafe/Common Service Center",
        "None of the above",
      ],
    },
  ]

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / survey.totalQuestions) * 100

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
    // Text-to-speech logic would go here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/citizen">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Exit Survey
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground font-inter">{survey.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {survey.totalQuestions}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[120px]">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {survey.languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Voice Controls */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAudio}
                className={isPlaying ? "bg-primary text-primary-foreground" : ""}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Button variant="outline" size="sm">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl font-inter mb-2">{currentQ.title}</CardTitle>
                {currentQ.description && (
                  <CardDescription className="text-base leading-relaxed">{currentQ.description}</CardDescription>
                )}
                <div className="flex items-center space-x-2 mt-3">
                  {currentQ.required && (
                    <Badge variant="secondary" className="text-xs">
                      Required
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs capitalize">
                    {currentQ.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Question Content */}
            <div className="space-y-4">
              {currentQ.type === "mcq" && (
                <RadioGroup
                  value={answers[currentQ.id] || ""}
                  onValueChange={(value) => handleAnswer(currentQ.id, value)}
                >
                  {currentQ.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/30"
                    >
                      <RadioGroupItem value={option} id={`${currentQ.id}-${index}`} />
                      <Label htmlFor={`${currentQ.id}-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQ.type === "mcq-multiple" && (
                <div className="space-y-3">
                  {currentQ.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/30"
                    >
                      <Checkbox
                        id={`${currentQ.id}-${index}`}
                        checked={answers[currentQ.id]?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const current = answers[currentQ.id] || []
                          if (checked) {
                            handleAnswer(currentQ.id, [...current, option])
                          } else {
                            handleAnswer(
                              currentQ.id,
                              current.filter((item: string) => item !== option),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={`${currentQ.id}-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {currentQ.type === "text" && (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answers[currentQ.id] || ""}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleRecording}
                      className={isRecording ? "bg-destructive text-destructive-foreground" : ""}
                    >
                      {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                      {isRecording ? "Stop Recording" : "Voice Input"}
                    </Button>
                    {isRecording && (
                      <Badge variant="destructive" className="animate-pulse">
                        Recording...
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {currentQ.type === "likert" && (
                <div className="space-y-4">
                  <RadioGroup
                    value={answers[currentQ.id] || ""}
                    onValueChange={(value) => handleAnswer(currentQ.id, value)}
                  >
                    <div className="grid grid-cols-5 gap-2">
                      {currentQ.scale?.labels.map((label, index) => (
                        <div key={index} className="text-center">
                          <div className="flex flex-col items-center space-y-2 p-3 border border-border rounded-lg hover:bg-muted/30">
                            <RadioGroupItem value={String(index + 1)} id={`${currentQ.id}-${index}`} />
                            <Label htmlFor={`${currentQ.id}-${index}`} className="text-xs text-center cursor-pointer">
                              {index + 1}
                            </Label>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{label}</p>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>

                {currentQuestion === questions.length - 1 ? (
                  <Button asChild>
                    <Link href={`/citizen/surveys/${params.id}/complete`}>
                      Complete Survey
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button onClick={nextQuestion}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
