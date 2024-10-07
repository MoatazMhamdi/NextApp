// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signIn',  // Ou le chemin correct de ta page de connexion
    signOut: '/auth/signout', // Page de déconnexion
  },
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
  },
});
