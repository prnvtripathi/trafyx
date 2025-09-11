import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex-wrap">
      <div className="space-y-4 flex flex-col sm:items-center sm:justify-between">
        <div className="from-primary/10 select-none via-foreground/65 to-foreground/10 bg-gradient-to-tl bg-clip-text text-center text-4xl tracking-[15px]  md:tracking-[35px] text-balance text-transparent sm:text-5xl md:text-6xl lg:text-8xl uppercase">
          Trafyx
        </div>
        <p className="mt-4 text-center mx-auto text-sm text-gray-500 lg:mt-0 lg:text-right">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}