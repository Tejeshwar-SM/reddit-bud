"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleClientError } from "@/lib/utils";
import { signInSchema } from "@/lib/validations";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const parsed = signInSchema.safeParse({ username, password });
        if (!parsed.success) {
            handleClientError(parsed.error);
            return;
        }

        setIsPending(true);
        const toastId = toast.loading("Signing in…");

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });

            const data = (await res.json()) as {
                success: boolean;
                longMessage?: string;
            };

            if (!res.ok || !data.success) {
                toast.error(data.longMessage ?? "Failed to sign in", {
                    id: toastId,
                });
                return;
            }

            toast.success("Signed in", { id: toastId });
            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            handleClientError(err, toastId);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>
                    Enter your credentials to continue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    autoComplete="on"
                >
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            autoFocus
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isPending}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending && (
                            <CircleNotchIcon className="size-4 animate-spin" />
                        )}
                        Sign in
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
