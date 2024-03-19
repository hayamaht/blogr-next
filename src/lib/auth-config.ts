import GitHubProvider from 'next-auth/providers/github';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

export const config = {
  pages: {
    signIn: '/login'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (token) {  
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const prismaUser = await prisma.user.findFirst({
        where: { email: token.email }
      });

      if (!prismaUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        image: prismaUser.image,
      }
    }
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}