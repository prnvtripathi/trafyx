import AuthForm from "@/components/auth-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <>
            <main className="flex min-h-screen bg-black">
                <section className="flex w-full flex-col justify-center lg:w-1/2">
                    <AuthForm variant="register" />

                    <span className="text-neutral-400 text-center block mt-4">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-white underline underline-offset-2"
                        >
                            Login
                        </Link>
                    </span>

                    <div className="absolute left-4 bottom-4">
                        <ModeToggle />
                    </div>
                </section>
                <section className="hidden w-1/2 bg-neutral-900 lg:block">
                    <div className="flex h-full items-center justify-center">
                        <Image
                            src="/images/login.jpg"
                            width={800}
                            height={800}
                            alt="Login"
                            className="h-screen object-cover grayscale brightness-50"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}
