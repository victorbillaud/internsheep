import { userService } from "@/server/services/userService";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text", placeholder: "username"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials, req) {
        const {username, password} = credentials as {
          username: string;
          password: string;
        };

        return userService.authenticate(username, password); //(5)
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt" //(1)
  },
  callbacks: {
    async jwt({token, account, profile}) {
      if (account && account.type === "credentials") {
        //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
      }
      return token;
    },
    async session({session, token, user}) {
      session.user.id = token.userId; //(3)
      return session;
    }
  }
});
