import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      
      // Auto-create user in database if doesn't exist
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
      })
      
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || 'Unknown',
            phoneNumber: '', // Default empty, can be updated later
            role: 'user' // Default role
          }
        })
      }
      
      return true
    },
    async jwt({ token, user }) {
      if (user?.email) {
        // Fetch user from database to get role
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        })
        if (dbUser) {
          token.role = dbUser.role
          token.userId = dbUser.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.userId as string
      }
      return session
    }
  }
})
