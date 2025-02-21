import { ModeToggle } from "@/components/theme-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LandingPage from "@/components/landing";
import { GearIcon } from "@radix-ui/react-icons";
import Footer from "@/components/ui/footer";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import { buttonVariants } from "@/components/ui/button";
// import { PageRoutes } from "@/lib/pageroutes";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="min-h-screen ">
      <div className="absolute top-0 z-20 right-0 p-6"></div>
      <header className="absolute top-0 z-10 w-full">
        <div className="max-w-8xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="space-x-3 flex flex-row items-center">
            <div className="bg-primary rounded-full shadow-xl text-white  p-1">
              <GearIcon className=" m-0 h-6 p-0 rounded-full w-full" />
            </div>{" "}
            <h1 className="text-2xl font-bold">Trafix</h1>
          </div>
          <nav className="flex items-center space-x-3">
            {session?.user ? (
              <>
                <Avatar className="size-8 md:size-10 mr-4">
                  <AvatarImage
                    src={user?.img || "/noavatar.png"}
                    className="rounded-full"
                  />
                  <AvatarFallback className="text-3xl md:text-5xl rounded-full">
                    {user?.name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Signup</Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
