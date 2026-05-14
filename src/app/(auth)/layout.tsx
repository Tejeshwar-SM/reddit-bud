import { siteConfig } from "@/config/site";
import { RedditLogoIcon } from "@phosphor-icons/react/dist/ssr";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-1 items-center justify-center bg-background p-6">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                        <RedditLogoIcon className="size-5" weight="fill" />
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight">
                        {siteConfig.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {siteConfig.description}
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
}
