import NextAuth, { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { authConfig } from "@/auth.config";
import { sql } from 'drizzle-orm'
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle/db";

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/formSchema";
import { getUserByEmail } from "./data/user";
import { getUserById } from "./data/user";
import { twoFactorConfirmations, users } from "./drizzle/schema";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";


import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/google";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "ADMIN" | "USER";
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db
      .update(users)
      .set({ emailVerified: sql`CURRENT_TIMESTAMP` })
      .where(sql`id = ${user.id}`)
    }
  },
  callbacks: {
    async signIn({ user, account}){
      if (!user?.id) return false;
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db
          .delete(twoFactorConfirmations)
          .where(eq(twoFactorConfirmations.id, twoFactorConfirmation.id));
      }

      return true;
    },
    async session({ token, session }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // Might have to refine the typescript error other than making it not null
      token.role = existingUser.role!;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  providers: [
    
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentails) {
        const parsedCredentials = LoginSchema.safeParse(credentails);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
});
