"use client"

import { useState } from "react";
import { useDeleteProfile } from "@/hooks/use-profile";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function DeleteAccount({ userId, email }: { userId: string, email: string }) {
    const { trigger, isLoading, error } = useDeleteProfile(userId);
    const [open, setOpen] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleDialogDelete = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirmEmail.trim().toLowerCase() !== email.toLowerCase()) {
            setEmailError("Email does not match.");
            return;
        }
        setEmailError("");
        trigger();
        setOpen(false);
    };

    const buttonDisabled = isLoading || confirmEmail.trim().toLowerCase() !== email.toLowerCase();

    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                    This will permanently delete your account and all associated data.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                {error && (
                    <p className="text-red-500 text-sm mb-2">
                        {error.message || "An error occurred while deleting your account."}
                    </p>
                )}
                {/* Replace form with dialog trigger */}
                <Button
                    variant="destructive"
                    className="w-full max-w-xs"
                    onClick={() => setOpen(true)}
                >
                    Delete Account
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Account Deletion</DialogTitle>
                            <DialogDescription>
                                Please enter your email address to confirm deletion. This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleDialogDelete} className="flex flex-col gap-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={confirmEmail}
                                onChange={e => setConfirmEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm">{emailError}</p>
                            )}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    disabled={buttonDisabled}
                                >
                                    {isLoading ? "Deleting..." : "Confirm Delete"}
                                </Button>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}