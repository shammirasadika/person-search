import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, GitBranch, Code2, GitFork, ExternalLink } from 'lucide-react'

export default function GitHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <Github className="h-8 w-8" />
            GitHub Repository
          </h1>
          <p className="text-lg text-muted-foreground">
            Source code, OAuth integration, and project documentation
          </p>
        </div>

        {/* Repository Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Repository Information
            </CardTitle>
            <CardDescription>Person Search with OAuth Integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button asChild size="lg">
                <Link 
                  href="https://github.com/shammirasadika/person-search" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Github className="h-5 w-5" />
                  View Repository
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="default" className="gap-1">
                <GitBranch className="h-3 w-3" />
                next15
              </Badge>
              <Badge variant="secondary">Next.js 15</Badge>
              <Badge variant="secondary">NextAuth v5</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="outline">PostgreSQL</Badge>
              <Badge variant="outline">Prisma ORM</Badge>
            </div>
          </CardContent>
        </Card>

        {/* OAuth Implementation Highlights */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>OAuth Integration Highlights</CardTitle>
            <CardDescription>Key implementations in the repository</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">🔐 Authentication System</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Complete OAuth 2.0 implementation with Google provider
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code className="bg-muted px-1 rounded">auth.ts</code> - NextAuth configuration</li>
                  <li>• <code className="bg-muted px-1 rounded">app/api/auth/[...nextauth]/route.ts</code> - Auth handlers</li>
                  <li>• <code className="bg-muted px-1 rounded">app/auth/signin/page.tsx</code> - Sign-in page</li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">🛡️ Protected Routes</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Middleware and server-side protection
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code className="bg-muted px-1 rounded">middleware.ts</code> - Edge-level route protection</li>
                  <li>• <code className="bg-muted px-1 rounded">app/actions/actions.ts</code> - Protected server actions</li>
                  <li>• <code className="bg-muted px-1 rounded">app/page.tsx</code> - Authentication checks</li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">🎨 UI Components</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Authentication-aware user interface
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code className="bg-muted px-1 rounded">app/components/navbar.tsx</code> - User avatar & logout</li>
                  <li>• <code className="bg-muted px-1 rounded">app/components/auth-provider.tsx</code> - Session provider</li>
                  <li>• <code className="bg-muted px-1 rounded">app/layout.tsx</code> - App-wide session management</li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-1">📚 Documentation Pages</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Comprehensive OAuth documentation
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code className="bg-muted px-1 rounded">app/auth-setup/page.tsx</code> - OAuth setup guide</li>
                  <li>• <code className="bg-muted px-1 rounded">app/security/page.tsx</code> - Security features</li>
                  <li>• <code className="bg-muted px-1 rounded">app/github/page.tsx</code> - Repository information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Structure */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded font-mono text-xs overflow-x-auto">
              <pre>{`person-search/
├── app/
│   ├── actions/
│   │   └── actions.ts           # Protected server actions
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts     # NextAuth handlers
│   │   └── [transport]/
│   │       └── route.ts         # OAuth-protected MCP server
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx         # Google OAuth sign-in
│   ├── components/
│   │   ├── auth-provider.tsx    # Session provider
│   │   └── navbar.tsx           # User avatar & logout
│   ├── auth-setup/page.tsx      # OAuth documentation
│   ├── security/page.tsx        # Security documentation
│   ├── github/page.tsx          # Repository info
│   ├── layout.tsx               # Auth provider wrapper
│   └── page.tsx                 # Protected homepage
├── auth.ts                      # NextAuth configuration
├── middleware.ts                # Route protection
├── .env.local                   # OAuth credentials
└── prisma/
    └── schema.prisma            # Database schema`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Frontend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Next.js 15 (App Router)</li>
                  <li>• React 19</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• shadcn/ui Components</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Backend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• NextAuth v5 (Auth.js)</li>
                  <li>• PostgreSQL (Neon)</li>
                  <li>• Prisma ORM</li>
                  <li>• Server Actions</li>
                  <li>• MCP Server</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Authentication</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• OAuth 2.0 Protocol</li>
                  <li>• Google OAuth Provider</li>
                  <li>• Session Management</li>
                  <li>• Edge Middleware</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Deployment</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vercel Platform</li>
                  <li>• Edge Network</li>
                  <li>• Environment Variables</li>
                  <li>• Continuous Deployment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>Clone and run the project locally</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">1. Clone Repository</h4>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  git clone https://github.com/shammirasadika/person-search.git<br />
                  cd person-search
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-1">2. Install Dependencies</h4>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  npm install
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-1">3. Configure Environment</h4>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  cp .env.example .env.local<br />
                  # Add your Google OAuth credentials<br />
                  # Add your database URL<br />
                  # Generate AUTH_SECRET: npx auth secret
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-1">4. Setup Database</h4>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  npx prisma generate<br />
                  npx prisma db push
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-1">5. Run Development Server</h4>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  npm run dev
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contributing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitFork className="h-5 w-5" />
              Contributing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              This project demonstrates OAuth integration for educational purposes. 
              Feel free to fork the repository and adapt it for your own projects.
            </p>
            <p className="text-sm text-muted-foreground">
              For questions or issues, please visit the GitHub repository and open an issue.
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button asChild>
            <Link 
              href="https://github.com/shammirasadika/person-search" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
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
