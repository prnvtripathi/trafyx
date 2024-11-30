import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "@/lib/models";
import bcrypt from "bcrypt";

// Function to handle user login
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

// Exported functions for sign in, sign out, and authentication
export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          if (err instanceof Error) {
            console.log("Authentication error:", err.message);
          } else {
            console.log("Authentication error:", err);
          }
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // const typedUser = user as User;
        token.name = user.name;
        // token.username = user.username;
        // token.img = user.img;
        token.id = user.id;
        // token.role = user.isAdmin;
      }
      console.log(token, "is the token");
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        // session.user.username = token.username;
        // session.user.img = token.img;
        // session.user.role = token.role;
        session.user.id = token.id as string;
      }
      console.log(session, "is the session");
      return session;
    },
  },
});
