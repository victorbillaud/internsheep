import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com"
        },
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !(await compare(credentials.password, user.password!))) {
          return null;
        }

        return user;
      }
    })
  ],
  callbacks: {
    session: ({session, token}) => {
      return {
        ...session,
        user: {
          ...session.user,
          firstname: token.firstname,
          lastname: token.lastname,
          id: token.id,
          role: token.role
        }
      };
    },
    jwt: ({token, user}) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          firstname: u.firstname,
          lastname: u.lastname,
          id: u.id,
          role: u.role
        };
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
