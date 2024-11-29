import NextAuth from "next-auth";
// Import the authentication configuration from a custom file
import { authConfig } from "./authconfig";// Assuming the authentication configuration is in a file named 'authConfig.ts'

// Export the default NextAuth handler, passing in the custom authentication configuration
export default NextAuth(authConfig).auth;

// Export a config object that specifies URL matching patterns for middleware
export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next).*)'
  ],
};