import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

const allowedGitHubLogin = (
  process.env.ADMIN_GITHUB_LOGIN ?? 'Tsoris'
).toLowerCase();

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? process.env.GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      return (
        typeof profile?.login === 'string' &&
        profile.login.toLowerCase() === allowedGitHubLogin
      );
    },
  },
  pages: {
    signIn: '/admin/sign-in',
  },
});
