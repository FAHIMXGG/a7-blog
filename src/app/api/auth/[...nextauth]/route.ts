import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.BACKEND_URL!;

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Call backend login API
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const data = await res.json();
        const user = data?.data?.user;
        const token = data?.data?.accessToken;

        if (!user) return null;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isApproved: user.isApproved,
          accessToken: token,
        };
      },
    }),
  ],

  callbacks: {
    // Store extra fields in JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.phone = (user as any).phone;
        token.isApproved = (user as any).isApproved;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },

    // Expose JWT values in session
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as "user" | "admin",
        phone: token.phone as string | null,
        isApproved: token.isApproved as boolean,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
