"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
    CircleNotchIcon,
    MoonIcon,
    RedditLogoIcon,
    SignOutIcon,
    SunIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function isActivePath(pathname: string, url: string) {
    if (url === "#") return false;
    return pathname === url || pathname.startsWith(`${url}/`);
}

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 rounded-xl"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            {mounted ? (
                isDark ? (
                    <SunIcon className="size-4" />
                ) : (
                    <MoonIcon className="size-4" />
                )
            ) : (
                <MoonIcon className="size-4 opacity-0" />
            )}
            <span>
                {mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme"}
            </span>
        </Button>
    );
}

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    async function handleSignOut() {
        setIsSigningOut(true);

        try {
            await fetch("/api/auth/signout", { method: "POST" });
            router.push("/auth/signin");
            router.refresh();
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                size="lg"
                                tooltip={siteConfig.name}
                            >
                                <Link href="/dashboard">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                                        <RedditLogoIcon
                                            className="size-4"
                                            weight="fill"
                                        />
                                    </div>
                                    <span className="truncate font-semibold">
                                        {siteConfig.name}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarSeparator />

                <SidebarContent>
                    <SidebarMenu className="p-2">
                        {siteConfig.sidebar.map((section) => {
                            const Icon = Icons[section.icon] ?? Icons.House;

                            return (
                                <SidebarMenuItem key={section.title}>
                                    {section.url === "#" ? (
                                        <SidebarMenuButton
                                            type="button"
                                            tooltip={section.title}
                                            className="cursor-default"
                                        >
                                            <Icon className="size-4" />
                                            <span>{section.title}</span>
                                        </SidebarMenuButton>
                                    ) : (
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActivePath(
                                                pathname,
                                                section.url
                                            )}
                                            tooltip={section.title}
                                        >
                                            <Link href={section.url}>
                                                <Icon className="size-4" />
                                                <span>{section.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}

                                    {section.items.length > 0 && (
                                        <SidebarMenuSub>
                                            {section.items.map((item) => (
                                                <SidebarMenuSubItem
                                                    key={item.url}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={isActivePath(
                                                            pathname,
                                                            item.url
                                                        )}
                                                        className={cn(
                                                            item.isDisabled &&
                                                                "pointer-events-none opacity-50"
                                                        )}
                                                    >
                                                        <Link
                                                            href={item.url}
                                                            aria-disabled={
                                                                item.isDisabled
                                                            }
                                                            tabIndex={
                                                                item.isDisabled
                                                                    ? -1
                                                                    : undefined
                                                            }
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    item.isDisabled
                                                                ) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            <span>
                                                                {item.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    )}
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>

                <SidebarSeparator />

                <SidebarFooter>
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 rounded-xl"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                    >
                        {isSigningOut ? (
                            <CircleNotchIcon className="size-4 animate-spin" />
                        ) : (
                            <SignOutIcon className="size-4" />
                        )}
                        Sign out
                    </Button>
                </SidebarFooter>

                <SidebarRail />
            </Sidebar>

            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm font-medium">
                        {siteConfig.name}
                    </span>
                </header>

                <div className="flex-1 overflow-auto p-6 md:p-8">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
