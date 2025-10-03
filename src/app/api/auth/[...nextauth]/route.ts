
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const BACKEND_URL = process.env.BACKEND_URL!

function extractAccessTokenFromSetCookie(setCookieHeader?: string | null) {
  if (!setCookieHeader) return undefined
  const all = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader]
  for (const h of all) {
    const m = /(?:^|,\s*)accessToken=([^;]+)/i.exec(h)
    if (m?.[1]) return decodeURIComponent(m[1])
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        })
        if (!res.ok) return null

        const data = await res.json()
        const user = data?.data?.user
        if (!user) return null

        // Get token from Set-Cookie or JSON
        const token =
          extractAccessTokenFromSetCookie(res.headers.get("set-cookie")) ||
          data?.data?.accessToken ||
          data?.accessToken ||
          data?.token

        // ❌ Do NOT call cookies().set() here — it's read-only in this context
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isApproved: user.isApproved,
          accessToken: token,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id
        token.role = (user as any).role
        token.phone = (user as any).phone
        token.isApproved = (user as any).isApproved
        token.accessToken = (user as any).accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as any,
        phone: token.phone as any,
        isApproved: token.isApproved as any,
      }
      ;(session as any).accessToken = token.accessToken
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
