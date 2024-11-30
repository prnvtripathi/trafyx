import { ModeToggle } from "@/components/theme-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LandingPage from "@/components/landing";
// import { buttonVariants } from "@/components/ui/button";
// import { PageRoutes } from "@/lib/pageroutes";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="absolute top-0 z-20 left-0 p-6">
        <ModeToggle />
      </div>
      <header className="absolute top-0 z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Apilux</h1>
          <nav>
            <Link href="/login">
              <Button variant="secondary" className="mr-4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button>Signup</Button>
            </Link>
            {/* <Link
          href={`/docs${PageRoutes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Get Started
        </Link> */}
          </nav>
        </div>
      </header>

      <main className="">
        <LandingPage />
      </main>
    </div>
  );
}
