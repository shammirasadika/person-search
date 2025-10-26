import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from 'lucide-react'

function ProjectOverview() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Person Search is a full-stack demonstration project showcasing modern web development with enterprise-grade 
          OAuth 2.0 authentication. It provides a secure, user-friendly interface for managing and searching user information 
          with complete CRUD operations.
        </p>
        <p className="mb-4">
          This project utilizes Next.js 15 with the App Router, React 19, TypeScript, NextAuth v5 (Auth.js), 
          PostgreSQL with Prisma ORM, and shadcn/ui components to create a secure, responsive, and accessible user experience.
        </p>
        <p>
          Key features include OAuth 2.0 authentication with Google, protected routes and server actions, 
          asynchronous search functionality, full CRUD operations, MCP server integration, and a dark mode toggle.
        </p>
      </CardContent>
    </Card>
  )
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <Link href="https://www.linkedin.com/in/callumbir/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="https://github.com/gocallum" target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href="https://x.com/callumbir">
          <Twitter className="mr-2 h-4 w-4" /> Contact Me
        </Link>
      </Button>
    </div>
  )
}

function DeveloperInfo() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>About the Developer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Hi, I&apos;m <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Callum Bir</code>, the developer behind Person Search. I&apos;m passionate about creating 
          efficient, user-friendly web applications using the latest technologies.
        </p>
        <p className="mb-4">
          This project serves as a demonstration of my skills in Next.js, React, and modern frontend development.
          I&apos;m always looking to learn and improve, so feel free to reach out with any questions or feedback!
        </p>
        <SocialLinks />
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About Person Search</h1>
        <ProjectOverview />
        
        {/* Authentication Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Authentication Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Person Search implements enterprise-grade security using <strong>NextAuth v5 (Auth.js)</strong> with 
              <strong> Google OAuth 2.0</strong> provider. The authentication system protects all user data operations 
              and ensures only authenticated users can access sensitive features.
            </p>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-sm mb-1">🔐 OAuth 2.0 Flow</h3>
                <p className="text-sm text-muted-foreground">
                  Users sign in with their Google account through a secure OAuth 2.0 flow. No passwords are stored 
                  in the application, reducing security risks and improving user experience.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">🛡️ Route Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Next.js middleware enforces authentication at the edge, intercepting all requests before they reach 
                  protected routes. Unauthenticated users are automatically redirected to the sign-in page.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">⚡ Server Action Security</h3>
                <p className="text-sm text-muted-foreground">
                  All CRUD operations (Create, Read, Update, Delete) verify user authentication before execution. 
                  Server actions use the <code className="bg-muted px-1 rounded text-xs">requireAuth()</code> helper 
                  to ensure only authenticated users can modify data.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">🔒 Session Management</h3>
                <p className="text-sm text-muted-foreground">
                  Secure HTTP-only cookies store session tokens, preventing client-side JavaScript access. 
                  Sessions persist across page refreshes and automatically expire after inactivity.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">🤖 MCP Server Protection (Advanced)</h3>
                <p className="text-sm text-muted-foreground">
                  The Model Context Protocol (MCP) server endpoint is OAuth-protected, ensuring AI agent 
                  communications require authenticated sessions for enterprise-grade security.
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/auth-setup">
                  View OAuth Setup →
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/security">
                  Security Features →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <DeveloperInfo />
        <Button asChild variant="link" className="mt-4">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </main>
    </div>
  )
}

