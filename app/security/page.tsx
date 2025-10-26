import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle2, Key, Server } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Security Features & Protected Routes
          </h1>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade security implementation for Person Search
          </p>
        </div>

        {/* Security Status */}
        <Alert className="mb-6 border-green-500">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>Security Status: Active</AlertTitle>
          <AlertDescription>
            All routes and API endpoints are protected by OAuth 2.0 authentication. 
            Unauthorized access attempts are automatically redirected to sign-in.
          </AlertDescription>
        </Alert>

        {/* Authentication Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Authentication Security
            </CardTitle>
            <CardDescription>OAuth 2.0 with Google Provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">🔐 OAuth 2.0 Protocol</h3>
              <p className="text-sm text-muted-foreground">
                Industry-standard authorization framework that enables secure delegated access. 
                Users authenticate through Google, eliminating password storage risks.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">🛡️ Session Security</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><strong>HTTP-only cookies:</strong> Session tokens not accessible via JavaScript</li>
                <li><strong>Secure flag:</strong> Cookies only transmitted over HTTPS in production</li>
                <li><strong>SameSite attribute:</strong> Protection against CSRF attacks</li>
                <li><strong>Automatic expiration:</strong> Sessions expire after inactivity</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">🔑 Secret Management</h3>
              <p className="text-sm text-muted-foreground">
                <strong>AUTH_SECRET:</strong> Cryptographically secure random string used to encrypt 
                session tokens. Generated using NextAuth CLI and stored as environment variable.
              </p>
              <div className="bg-muted p-3 rounded text-xs font-mono mt-2">
                AUTH_SECRET: 256-bit cryptographically random string
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protected Routes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Protected Routes
            </CardTitle>
            <CardDescription>Routes requiring authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">🏠 Application Routes</h3>
                <div className="bg-muted p-4 rounded space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <code className="text-primary">/</code>
                    <span className="text-xs text-muted-foreground">Homepage with user search</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">
                    ✓ Middleware protection<br />
                    ✓ Server-side authentication check<br />
                    ✓ Automatic redirect to /auth/signin if unauthenticated
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">⚙️ Server Actions (CRUD Operations)</h3>
                <div className="bg-muted p-4 rounded space-y-2 text-sm">
                  <code className="text-primary">searchUsers(query: string)</code>
                  <code className="text-primary block">addUser(data: UserFormData)</code>
                  <code className="text-primary block">updateUser(id: string, data: Partial&lt;UserFormData&gt;)</code>
                  <code className="text-primary block">deleteUser(id: string)</code>
                  <code className="text-primary block">getUserById(id: string)</code>
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    All server actions verify authentication before execution:<br />
                    <code className="bg-background px-1">await requireAuth()</code> throws error if not authenticated
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🤖 MCP Server Endpoint (Advanced)</h3>
                <div className="bg-muted p-4 rounded space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <code className="text-primary">/api/[transport]</code>
                    <span className="text-xs text-muted-foreground">Model Context Protocol server</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ✓ OAuth-protected MCP operations<br />
                    ✓ Session verification for AI agent communications<br />
                    ✓ Enterprise-grade security for automated workflows
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Public Routes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Public Routes
            </CardTitle>
            <CardDescription>Routes accessible without authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <code>/about</code>
                <span className="text-xs text-muted-foreground">About page</span>
              </div>
              <div className="flex items-center justify-between">
                <code>/auth-setup</code>
                <span className="text-xs text-muted-foreground">OAuth documentation</span>
              </div>
              <div className="flex items-center justify-between">
                <code>/security</code>
                <span className="text-xs text-muted-foreground">Security documentation</span>
              </div>
              <div className="flex items-center justify-between">
                <code>/github</code>
                <span className="text-xs text-muted-foreground">GitHub repository info</span>
              </div>
              <div className="flex items-center justify-between">
                <code>/auth/signin</code>
                <span className="text-xs text-muted-foreground">Sign-in page</span>
              </div>
              <div className="flex items-center justify-between">
                <code>/api/auth/*</code>
                <span className="text-xs text-muted-foreground">NextAuth API routes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middleware Implementation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Middleware Protection
            </CardTitle>
            <CardDescription>Edge-level route protection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              The application uses Next.js middleware to enforce authentication at the edge, 
              before any page or API route is accessed.
            </p>
            
            <div className="bg-muted p-4 rounded">
              <h4 className="font-semibold text-sm mb-2">Protection Logic:</h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Middleware intercepts all requests</li>
                <li>Checks if route is public (auth pages, documentation)</li>
                <li>Verifies user authentication status via session</li>
                <li>If authenticated: Allow access</li>
                <li>If not authenticated: Redirect to /auth/signin with callback URL</li>
              </ol>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Performance Note</AlertTitle>
              <AlertDescription className="text-xs">
                Middleware runs on Vercel Edge Network for minimal latency. 
                Authentication checks complete in &lt;50ms globally.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Security Best Practices */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Security Best Practices Implemented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">✅ Authentication</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• OAuth 2.0 with Google</li>
                  <li>• No password storage</li>
                  <li>• Secure session management</li>
                  <li>• Automatic token refresh</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">✅ Authorization</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Server-side checks on all actions</li>
                  <li>• Middleware route protection</li>
                  <li>• Session verification</li>
                  <li>• Protected API endpoints</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">✅ Data Protection</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• HTTPS-only in production</li>
                  <li>• Encrypted database connections</li>
                  <li>• Environment variable isolation</li>
                  <li>• No sensitive data in client</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">✅ Attack Prevention</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• CSRF protection (SameSite cookies)</li>
                  <li>• XSS prevention (HTTP-only cookies)</li>
                  <li>• SQL injection (Prisma ORM)</li>
                  <li>• Rate limiting on auth endpoints</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vulnerability Assessment */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Security Testing & Vulnerability Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm font-semibold">Recommended Testing:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Attempt to access protected routes without authentication</li>
              <li>Try to call server actions directly without valid session</li>
              <li>Test session persistence across page refreshes</li>
              <li>Verify logout clears all session data</li>
              <li>Check that callback URLs prevent open redirects</li>
              <li>Validate HTTPS enforcement in production</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/auth-setup">
              View OAuth Setup →
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
