export const authConfig = {
  providers:[],
  pages: {
    signIn: "/login", // Sign in page URL
  },
  callbacks: {
    authorized({ auth, request }: { auth: any, request: any }) {
      const isLoggedIn = auth?.user; // Check if user is logged in
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard"); // Check if user is on the dashboard page
      if (isOnDashboard) {
        if (isLoggedIn) return true; // If user is on dashboard and logged in, allow access
        return false; // If user is on dashboard but not logged in, deny access
      }
      return true; // Allow access for all other cases
    },
  },
};