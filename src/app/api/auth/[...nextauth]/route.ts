import prisma from '@/lib/prisma';
import GitHubProvider from 'next-auth/providers/github';
import NextAuth from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
})

export { handler as GET, handler as POST }