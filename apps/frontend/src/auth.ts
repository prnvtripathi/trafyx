import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import "next-auth/jwt";
import { connectToDB } from "./lib/utils";
import bcrypt from "bcrypt";
import { User } from "@/lib/models";

// Extend the built-in session types
interface ExtendedUser extends NextAuthUser {
  username: string;
  image: string;
  password: string;
  userid: number;
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      username: string;
      image: string;
      userid: number;
    } & DefaultSession["user"];
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    image?: string;
    userid?: number;
  }
}

// Ensure that `authorize` returns `ExtendedUser | null`
export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  return {
    adapter: MongoDBAdapter(client),
    trustHost: true,
    providers: [
      GitHub,
      Google,
      CredentialsProvider({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) return null;

          try {
            const user = await login(credentials as LoginCredentials);
            if (user) {
              return user as ExtendedUser; // Ensure we return ExtendedUser
            }
            return null;
          } catch (error) {
            if (error instanceof Error) {
              // console.log("Authentication error:", error.message);
            } else {
              // console.log("Unexpected error:", error);
            }
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.username = (user as ExtendedUser).username;
          token.image = (user as ExtendedUser).image;
          token.userid = (user as ExtendedUser).userid;
        }
        // console.log("JWT token:", token);
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.username = token.username || "";
          session.user.image = token.image || "";
          session.user.userid = token.userid || 0;
        }
        // console.log("Session:", session);
        return session;
      },
    },
  };
});

// Define LoginCredentials for typing
interface LoginCredentials {
  email: string;
  password: string;
}

// Modify `login` to return `ExtendedUser | null`
const login = async (credentials: any) => {
  try {
    connectToDB();

    // Check if the user exists
    const user = await User.findOne({
      username: credentials.username,
    });

    if (!user) {
      throw new Error("INVALID_USERNAME");
    }

    // Check the password
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("INVALID_PASSWORD");
    }

    return user;
  } catch (err) {
    console.log(err);
    throw err; // Propagate the error
  }
};
