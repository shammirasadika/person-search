import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Lock, Code, CheckCircle } from 'lucide-react'

export default function AuthSetupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            OAuth Implementation & Configuration
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete guide to the authentication system powering Person Search
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Authentication Overview
            </CardTitle>
            <CardDescription>NextAuth.js v5 (Auth.js) with Google OAuth 2.0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Person Search uses <strong>NextAuth.js v5</strong> (also known as Auth.js) to provide secure, 
              enterprise-grade authentication. The application integrates with Google OAuth 2.0 to allow users 
              to sign in using their Google accounts.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">NextAuth v5</Badge>
              <Badge variant="secondary">Google OAuth 2.0</Badge>
              <Badge variant="outline">Session Management</Badge>
              <Badge variant="outline">Protected Routes</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Technical Implementation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Technical Implementation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Auth.js Configuration (auth.ts)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Core authentication setup with Google OAuth provider:
                </p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
})`}
                </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Middleware Protection (middleware.ts)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Route-level authentication enforcement:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`export default auth((req) => {
  const isLoggedIn = !!req.auth
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect("/auth/signin")
  }
  return NextResponse.next()
})`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Server Action Protection</h3>
              <p className="text-sm text-muted-foreground mb-2">
                All CRUD operations verify user authentication:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function addUser(data: UserFormData) {
  await requireAuth() // Verify authentication
  return await addUserCore(data)
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Google OAuth Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm">Step 1: Google Cloud Console</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-1">
                  <li>Create a new project in Google Cloud Console</li>
                  <li>Enable Google+ API</li>
                  <li>Configure OAuth consent screen</li>
                  <li>Create OAuth 2.0 Client ID credentials</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm">Step 2: Authorized URLs</h4>
                <div className="bg-muted p-3 rounded text-xs font-mono mt-1">
                  <p><strong>Authorized JavaScript origins:</strong></p>
                  <p>http://localhost:3000</p>
                  <p>https://your-domain.vercel.app</p>
                  <br />
                  <p><strong>Authorized redirect URIs:</strong></p>
                  <p>http://localhost:3000/api/auth/callback/google</p>
                  <p>https://your-domain.vercel.app/api/auth/callback/google</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm">Step 3: Environment Variables</h4>
                <div className="bg-muted p-3 rounded text-xs font-mono mt-1">
{`GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
AUTH_SECRET="generated-secret-key"`}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Generate AUTH_SECRET using: <code className="bg-muted px-1 rounded">npx auth secret</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Session Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              <strong>Session Provider:</strong> The application uses SessionProvider from next-auth/react 
              to manage user sessions across the application.
            </p>
            <p className="text-sm">
              <strong>Session Persistence:</strong> Sessions persist across page refreshes using secure 
              HTTP-only cookies.
            </p>
            <p className="text-sm">
              <strong>Client-Side Access:</strong> Components can access session data using the useSession() 
              hook for dynamic UI updates.
            </p>
            <p className="text-sm">
              <strong>Server-Side Access:</strong> Server components and actions use auth() to verify 
              authentication status.
            </p>
          </CardContent>
        </Card>

        {/* Authentication Flow */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Authentication Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>User visits protected route (e.g., homepage)</li>
              <li>Middleware checks authentication status</li>
              <li>If not authenticated, redirect to /auth/signin</li>
              <li>User clicks &quot;Sign in with Google&quot;</li>
              <li>Redirected to Google OAuth consent screen</li>
              <li>User grants permissions</li>
              <li>Google redirects back to /api/auth/callback/google</li>
              <li>NextAuth creates session and redirects to original page</li>
              <li>User can now access all protected features</li>
            </ol>
          </CardContent>
        </Card>

        {/* Protected Resources */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Protected Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">All the following require authentication:</p>
            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
              <li>Homepage (/) - User search interface</li>
              <li>User CRUD operations (Create, Read, Update, Delete)</li>
              <li>Server actions (searchUsers, addUser, updateUser, deleteUser, getUserById)</li>
              <li>MCP server endpoint (/api/mcp) - Advanced OAuth protection</li>
            </ul>
            <p className="text-sm mt-3">
              <strong>Public routes:</strong> /about, /auth-setup, /security, /github, /auth/signin
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/security">
              View Security Features →
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
