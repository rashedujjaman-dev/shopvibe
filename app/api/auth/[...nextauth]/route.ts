import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile", 
        },
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user, profile }) {
    if (user) {
      token.picture = user.image || (profile && "picture" in profile ? (profile.picture as string) : undefined);
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      session.user.image = (token.picture as string) || session.user.image;
    }
    return session;
  },
},
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };