import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome to Person Search</CardTitle>
          <CardDescription className="text-center">
            Sign in with your Google account to access the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/" })
            }}
          >
            <Button type="submit" className="w-full" size="lg">
              <Chrome className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              By signing in, you agree to access Person Search application.
            </p>
            <p className="mt-2">
              Protected by Google OAuth 2.0 authentication.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
