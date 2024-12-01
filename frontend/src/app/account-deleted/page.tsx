// "use client"
import { BackgroundStyle } from "@/components/effects/background-style";

import Footer from "@/components/ui/footer";
import AccountDeletedCard from "./account-deleted-card";
import { FloatingShapes } from "@/components/ui/floating-shapes";

export const metadata = {
  title: "Account Deleted | Apilux",
};

export default function AccountDeletedPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col w-f items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <BackgroundStyle />
        <div className="w-full max-w-md relative z-10">
          <AccountDeletedCard />
        </div>
        <FloatingShapes />
      </div>
      <Footer />
    </>
  );
}
