import AuthForm from "@/components/auth-form";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Gradient from "@/components/auth/gradient";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center">
            <Card className="max-w-6xl overflow-hidden flex items-center justify-center p-0">
                <div className="flex w-full flex-row">
                    <section className="flex w-full flex-col justify-center lg:w-1/2">
                        <AuthForm variant="login" />

                        <span className="text-muted-foreground text-sm text-center block mt-4">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/auth/register"
                                className="text-white underline underline-offset-2"
                            >
                                Register
                            </Link>
                        </span>


                    </section>
                    <section className="hidden w-1/2 lg:flex">
                        <Gradient />
                    </section>
                </div>
            </Card>
            <div className="absolute left-4 bottom-4">
                <ModeToggle />
            </div>
        </main>
    );
}
