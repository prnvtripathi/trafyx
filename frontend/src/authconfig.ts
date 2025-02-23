import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authConfig = {
  pages: {
    signIn: "/login", // Sign in page URL
  },
  callbacks: {
    authorized({ auth, request }: { auth: any; request: any }) {
      const isLoggedIn = auth?.user; // Check if user is logged in
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard"); // Check if user is on the dashboard page
      const isOnDocs = request.nextUrl.pathname.startsWith("/docs"); // Check if user is on the docs page

      if (isOnDashboard || isOnDocs) {
        if (isLoggedIn) return true; // If user is on dashboard or docs and logged in, allow access
        return false; // If user is on dashboard or docs but not logged in, deny access
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl)); // If user is not on dashboard or docs but logged in, redirect to dashboard
      }
      return true; // Allow access for all other cases
    },
  },
};