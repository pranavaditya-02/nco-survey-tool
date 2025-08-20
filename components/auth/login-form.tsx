"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, User, BarChart3 } from "lucide-react"

export function LoginForm() {
  const [loginType, setLoginType] = useState<"citizen" | "admin" | "analyst">("citizen")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-inter">Secure Login</CardTitle>
          <CardDescription>Access the NCO Smart Survey Tool with your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={loginType} onValueChange={(value) => setLoginType(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="citizen" className="text-xs">
                <User className="h-4 w-4 mr-1" />
                Citizen
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-xs">
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="analyst" className="text-xs">
                <BarChart3 className="h-4 w-4 mr-1" />
                Analyst
              </TabsTrigger>
            </TabsList>

            <TabsContent value="citizen" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="citizen-id">Login Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose login method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Number</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="email">Email Address</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizen-credential">Credential</Label>
                <Input id="citizen-credential" placeholder="Enter your credential" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizen-otp">OTP</Label>
                <Input id="citizen-otp" placeholder="Enter OTP" />
              </div>
              <Button className="w-full">Login as Citizen</Button>
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">
                  New user? Registration happens automatically
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="admin-id">Government ID</Label>
                <Input id="admin-id" placeholder="Enter government employee ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" placeholder="Enter password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-department">Department</Label>
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
              <Button className="w-full">Login as Admin</Button>
            </TabsContent>

            <TabsContent value="analyst" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="analyst-id">Analyst ID</Label>
                <Input id="analyst-id" placeholder="Enter analyst ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="analyst-password">Password</Label>
                <Input id="analyst-password" type="password" placeholder="Enter password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="analyst-clearance">Security Clearance</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select clearance level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Access</SelectItem>
                    <SelectItem value="advanced">Advanced Analytics</SelectItem>
                    <SelectItem value="full">Full Data Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Login as Analyst</Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Secure authentication powered by Government of India</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
