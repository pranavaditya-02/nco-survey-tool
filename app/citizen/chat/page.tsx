"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Bot, User, Mic, MicOff } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your survey assistant. I can help you with questions about surveys, technical issues, or accessibility features. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const quickActions = [
    "How do I change the language?",
    "I need help with voice input",
    "How do I download my certificate?",
    "What surveys are available?",
    "Technical support needed",
  ]

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("language")) {
      return "To change the language, look for the globe icon (🌐) in the top right corner of any survey page. Click it and select your preferred language from the dropdown menu. We support English, Hindi, Bengali, Tamil, and many other Indian languages."
    }

    if (input.includes("voice") || input.includes("mic")) {
      return "For voice input, click the microphone icon next to text fields. Make sure your browser allows microphone access. You can also use the speaker icon to hear questions read aloud. If you're having trouble, try refreshing the page or checking your microphone permissions."
    }

    if (input.includes("certificate")) {
      return "After completing a survey, you'll see a completion page with a 'Download Certificate' button. Your certificate will be generated as a PDF with a unique ID. You can also find all your certificates in the 'My Certificates' section of your profile."
    }

    if (input.includes("survey") || input.includes("available")) {
      return "You can find all available surveys on your dashboard. Use the search and filter options to find surveys by department, duration, or topic. Active surveys show their response progress and end dates."
    }

    if (input.includes("technical") || input.includes("problem") || input.includes("error")) {
      return "For technical issues, try these steps: 1) Refresh the page, 2) Clear your browser cache, 3) Try a different browser, 4) Check your internet connection. If the problem persists, you can contact our technical support team through the Help Center."
    }

    return "I understand you need help. Could you please be more specific about what you're looking for? You can ask about surveys, certificates, language settings, voice features, or technical issues. I'm here to help!"
  }

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/citizen">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground font-inter">Survey Assistant</h1>
              <p className="text-sm text-muted-foreground">Get help with surveys and technical support</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="font-inter">Chat Assistant</CardTitle>
              <Badge variant="secondary" className="text-xs">
                Online
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col space-y-4">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        {message.type === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action)}
                    className="text-xs"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRecording}
                className={isRecording ? "bg-destructive text-destructive-foreground" : ""}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
