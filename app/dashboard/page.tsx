"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, MessageSquare, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    // In a real app, you would fetch user data from your API
    const storedUserType = localStorage.getItem("userType") as "student" | "teacher" | null
    setUserType(storedUserType)

    // Mock user data
    setUserName("Dummy"  )
  }, [])

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="md:hidden">
          <Button variant="outline" size="icon" className="mr-2">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === "student" ? "Available Internships" : "Posted Internships"}
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userType === "student" ? "24" : "5"}</div>
              <p className="text-xs text-muted-foreground">
                {userType === "student" ? "+4 since last week" : "+1 since last month"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === "student" ? "Applications" : "Received Applications"}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userType === "student" ? "7" : "18"}</div>
              <p className="text-xs text-muted-foreground">
                {userType === "student" ? "+2 since last week" : "+5 since last week"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 since yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{userType === "student" ? "Teachers" : "Students"}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userType === "student" ? "12" : "45"}</div>
              <p className="text-xs text-muted-foreground">
                {userType === "student" ? "+2 since last month" : "+8 since last month"}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>
                    Your {userType === "student" ? "internship application" : "internship posting"} overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userType === "student" ? (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="font-medium">Recent Applications</div>
                        <ul className="grid gap-2">
                          <li className="flex items-center justify-between">
                            <span>Web Development Internship at Tech Solutions</span>
                            <span className="text-sm text-green-500">Applied</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Data Science Intern at Analytics Co.</span>
                            <span className="text-sm text-yellow-500">Under Review</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Mobile App Developer at AppWorks</span>
                            <span className="text-sm text-blue-500">Interview Scheduled</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <Link href="/dashboard/internships">
                          <Button>Browse More Internships</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="font-medium">Your Internship Postings</div>
                        <ul className="grid gap-2">
                          <li className="flex items-center justify-between">
                            <span>Full Stack Developer Internship</span>
                            <span className="text-sm text-green-500">8 Applicants</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Machine Learning Research Assistant</span>
                            <span className="text-sm text-green-500">5 Applicants</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>UI/UX Design Intern</span>
                            <span className="text-sm text-green-500">3 Applicants</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <Link href="/dashboard/create-internship">
                          <Button>Create New Internship</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">New message received</p>
                            <p className="text-xs text-muted-foreground">
                              {userType === "student" ? "Dr. Williams" : "Alex Johnson"} sent you a message about the
                              internship
                            </p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">
                              {userType === "student" ? "Application submitted" : "New application received"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {userType === "student"
                                ? "You applied for Data Science Intern position"
                                : "New application for Machine Learning Research Assistant"}
                            </p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">
                              {userType === "student" ? "New internship posted" : "You posted a new internship"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {userType === "student"
                                ? "Web Development Internship at Tech Solutions"
                                : "UI/UX Design Intern position created"}
                            </p>
                            <p className="text-xs text-muted-foreground">3 days ago</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Your recent notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                          <div className="rounded-full bg-blue-500/10 p-2">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">New message</p>
                            <p className="text-xs text-muted-foreground">You have 3 unread messages</p>
                            <p className="text-xs text-muted-foreground">Just now</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="rounded-full bg-green-500/10 p-2">
                            <Briefcase className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">
                              {userType === "student" ? "Application update" : "New application"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {userType === "student"
                                ? "Your application status has been updated"
                                : "You received a new application"}
                            </p>
                            <p className="text-xs text-muted-foreground">5 hours ago</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="rounded-full bg-yellow-500/10 p-2">
                            <BookOpen className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">System notification</p>
                            <p className="text-xs text-muted-foreground">Profile completion reminder</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
