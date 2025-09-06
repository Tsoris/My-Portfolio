// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim());

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, profile }) {
      // Mark admins by email (works after first OAuth profile fetch)
      if (profile?.email) token.isAdmin = adminEmails.includes(profile.email);
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).isAdmin = token.isAdmin;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
