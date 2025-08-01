"use client"

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function AvatarComponent() {

    const { data: session } = useSession();
    const user = session?.user;


    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="hidden items-center space-x-3 lg:flex"
            variants={itemVariants}
        >
            {session?.user ? (
                <>
                    <Avatar className="size-8 md:size-10 mr-4">
                        <AvatarImage
                            src={user?.image || "/noavatar.png"}
                            className="rounded-full"
                        />
                        <AvatarFallback className="text-3xl md:text-5xl rounded-full">
                            {user?.name?.[0] || "?"}
                        </AvatarFallback>
                    </Avatar>
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
                    >
                        Sign In
                    </Link>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="/signup"
                            className="inline-flex items-center space-x-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm transition-all duration-200 hover:bg-foreground/90"
                        >
                            <span>Get Started</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </>
            )}
        </motion.div>
    )
}

export function AvatarMobile({ setIsMobileMenuOpen }: { setIsMobileMenuOpen: (open: boolean) => void }) {
    const { data: session } = useSession();
    const user = session?.user;

    const mobileItemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 },
    };

    return (
        <motion.div
            className="space-y-3 border-t border-border pt-6"
            variants={mobileItemVariants}
        >
            {user ? (
                <Link
                    href="/dashboard"
                    className="block w-full rounded-lg py-3 text-center font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="block w-full rounded-lg py-3 text-center font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="block w-full rounded-lg bg-foreground py-3 text-center font-medium text-background transition-all duration-200 hover:bg-foreground/90"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get Started
                    </Link>
                </>
            )}
        </motion.div>
    );
}