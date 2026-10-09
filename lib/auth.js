import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      try {
        const isObjectId = /^[a-f\d]{24}$/i.test(token.sub || "");
        if (!isObjectId && !token.email) return token;
        const user = await prisma.user.findUnique({
          where: isObjectId ? { id: token.sub } : { email: token.email },
          select: { id: true, username: true },
        });
        if (user) {
          token.sub = user.id;
          token.username = user.username ?? "";
        }
      } catch (error) {
        console.error("jwt callback:", error?.message || error);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.username = token.username ?? "";
      }
      return session;
    },
  },
};
