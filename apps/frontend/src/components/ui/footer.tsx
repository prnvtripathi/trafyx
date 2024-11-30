import { ChevronUp, LayoutDashboardIcon } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import { GearIcon } from "@radix-ui/react-icons";
import { PageRoutes } from "@/lib/pageroutes";

export default async function Footer() {
  const session = await auth();
  console.log(session?.expires, "is the recieved session");

  const footerLinks = [
    { href: "#", label: "About" },
    { href: "/sitemap.xml", label: "Sitemap" },
    { href: "https://github.com/prnvtripathi/apilux ", label: "GitHub" },
    { href: `/docs${PageRoutes[0].href}`, label: "Docs" },
  ];

  return (
    <div>
      <footer className="relative border-t border-primary">
      <div className="absolute bottom-0 w-full rotate-180">
          <svg className="w-full" viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 116L60 96.3C120 77 240 37 360 21.7C480 6 600 16 720 31.3C840 47 960 67 1080 72.7C1200 78 1320 68 1380 62.3L1440 57V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V116Z" 
              className="fill-gray-100 dark:fill-black/50"
           
            />
          </svg>
        </div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-10">
          <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
            <Link
              className="inline-block rounded-full bg-primary p-2 text-white shadow transition hover:bg-primary/90 sm:p-3 lg:p-4 "
              href="#MainContent"
            >
              <span className="sr-only">Back to top</span>
{/* 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg> */}
              <ChevronUp/>
            </Link>
          </div>
          <div className="lg:flex lg:items-end lg:justify-between">
            <div className="space-x-2 flex-col items-center">
              <GearIcon className="h-8 w-8 bg-primary text-white p-1 rounded-full inline mx-2 md:mx-0" />
              <span className="text-2xl font-bold ">Apilux</span>

              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left dark:text-gray-400">
                Test, monitor, and validate your APIs with zero configuration.
              </p>
            </div>

            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right dark:text-gray-400">
            Copyright &copy; 2024.
            {session ? (
            <p className="mt-12 text-center text-sm text-gray-500 lg:text-right dark:text-gray-400">
              Session valid until:{" "}
              {session.expires &&
                new Date(session.expires).toLocaleString("en-US")}
            </p>
          ) : (
            <></>
          )}
          </p>{" "}
        
        </div>
      </footer>
    </div>
  );
}
