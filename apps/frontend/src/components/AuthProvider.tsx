"use client";

import { SessionProvider as AuthProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
