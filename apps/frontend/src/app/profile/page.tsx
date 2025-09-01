import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import DeleteAccount from "@/components/profile/delete-account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Stats from "@/components/dashboard/user-stats";
import Heading from "@/components/heading";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user as {
        image?: string | null;
        name?: string | null;
        id?: string;
        email?: string | null;
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="p-4">
            <div className="mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-y-2 items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/dashboard" className="">
                            <Button variant="default" size="sm">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Button>
                        </Link>
                        <form
                            action={async () => {
                                "use server";
                                await auth.api.signOut({
                                    headers: await headers(),
                                });
                                redirect("/auth/login");
                            }}>
                            <Button type="submit" variant="destructive" size="sm">
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Profile Card */}
                <Card className="shadow-lg">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col md:flex-row items-center space-x-4">
                            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                                <AvatarImage
                                    src={user?.image || "/default-avatar.png"}
                                    alt="Profile Picture"
                                />
                                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    {getInitials(user?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    {user?.name || "Anonymous User"}
                                </CardTitle>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
                                    <Mail className="w-4 h-4 mr-2" />
                                    {user?.email || "No email provided"}
                                </div>
                                {user?.id && (
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <User className="w-3 h-3 mr-2" />
                                        ID: {user.id}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* User Information Card */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Account Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                                    {user?.name || "Not provided"}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                                    {user?.email || "Not provided"}
                                </div>
                            </div>
                        </div>

                        {user?.id && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    User ID
                                </label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border font-mono text-sm">
                                    {user.id}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Stats Section */}
                {user?.id && (
                    <Card className="bg-accent/40 dark:bg-accent/40 shadow-lg">
                        <Stats userId={user.id} showCharts={false} />
                    </Card>
                )}

                <Heading title="Danger Zone" />

                {/* Delete Profile */}
                {user?.id && user?.email && <DeleteAccount userId={user.id} email={user.email} />}

            </div>
        </div>
    );
}