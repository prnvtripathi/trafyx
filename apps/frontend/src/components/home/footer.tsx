"use client"

import { Cog } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      category: "Product",
      links: [
        { name: "Features", link: "#" },
        { name: "Pricing", link: "#" },
        { name: "Integrations", link: "#" },
        { name: "Updates", link: "#" },
      ],
    },
    {
      category: "Company",
      links: [
        { name: "About", link: "#" },
        { name: "Careers", link: "#" },
        { name: "Blog", link: "#" },
        { name: "Contact", link: "#" },
      ],
    },
    {
      category: "Resources",
      links: [
        { name: "Docs", link: "#" },
        { name: "Community", link: "#" },
        { name: "Support", link: "#" },
        { name: "Security", link: "#" },
      ],
    },
  ];

  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden pb-8 pt-16">
      <style jsx global>{`
        .glass {
          backdrop-filter: blur(3px) saturate(180%);
          background: radial-gradient(circle, #fff9 0%, #0c4a6e4d 60%, #f9f2f4 100%);
          border: 1px solid #0ea5e91a;
          justify-content: center;
          align-items: center;
          transition: all .3s;
          display: flex;
        }
        .glass:where(.dark, .dark *) {
          display: flex
          backdrop-filter: blur(2px) !important;
          background: radial-gradient(circle, #0ea5e91a 0%, #1e00001a 60%, #0c4a6e4d 100%) !important;
          border: 1px solid #ffffffd !important;
          border-radius: 16px !important;
          justify-content: center !important;
          align-items: center !important;
        }
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-sky-600/20 blur-3xl"></div>
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-sky-600/20 blur-3xl"></div>
      </div>
      <div className="glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-700 text-2xl font-extrabold text-white shadow-md">
              <Cog className="h-6 w-6" />
            </span>
            <span className="bg-gradient-to-br from-sky-200 to-sky-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              Trafyx
            </span>
          </a>
          <p className="mb-6 max-w-xs text-center text-sm text-foreground md:text-left">
            Trafyx is a API testing tool that helps you streamline your API development process with ease.
            You can generate test cases, validate responses, and ensure your APIs are robust and reliable.
          </p>
        </div>
        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          {footerLinks.map((section) => (
            <div key={section.category}>
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">
                {section.category}
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.link} className="text-foreground/70">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="relative z-10 mt-10 text-center text-xs text-foreground">
        <span>&copy; {new Date().getFullYear()} Trafyx. All rights reserved.</span>
      </div>
    </footer>
  );
}
