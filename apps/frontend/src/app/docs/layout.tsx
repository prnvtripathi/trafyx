import Search from "@/components/navigation/search";
import { Sidebar } from "@/components/navigation/sidebar";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Documents({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      <nav className="flex items-center justify-between shadow-md p-4 sticky top-0 backdrop-blur-sm w-full z-50">
        <Link href="/" className="flex flex-row space-x-3">
          {" "}
          <div className="bg-primary rounded-full shadow-xl text-white  p-1">
            <GearIcon className=" m-0 h-6 p-0 rounded-full w-full" />
          </div>
          <h1 className="font-bold text-2xl">Apilux</h1>
        </Link>
        <Search />
      </nav>
      <div className="flex items-start gap-14 px-3">
        <Sidebar />
        <div className="flex-1 md:flex-[6]">{children}</div>{" "}
      </div>
      <Footer />
    </>
  );
}
