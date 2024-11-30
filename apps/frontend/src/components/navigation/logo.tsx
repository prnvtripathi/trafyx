import Link from "next/link";
import Image from "next/image";
import { Settings } from "@/lib/meta";
import { GearIcon } from "@radix-ui/react-icons";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="space-x-2 flex-col items-center">
        <GearIcon className="h-8 w-8 bg-primary text-white p-1 rounded-full inline mx-2 md:mx-0" />
      </div>
      <h1 className="text-xl font-bold">{Settings.title}</h1>
    </Link>
  );
}
