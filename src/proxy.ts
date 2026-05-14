import { NextRequest, NextResponse } from "next/server";

// import { AUTH_COOKIE_NAME } from "./config/const";
// import { auth } from "./lib/jwt";
// import { CResponse } from "./lib/utils";

const PUBLIC_PATHS = ["/auth/signin", "/api/auth/signin"];

export async function proxy(req: NextRequest) {
    const url = new URL(req.url);
    const res = NextResponse.next();

    if (PUBLIC_PATHS.some((path) => url.pathname.startsWith(path))) return res;

    if (url.pathname === "/")
        return NextResponse.redirect(new URL("/dashboard", url));

    if (url.pathname === "/auth")
        return NextResponse.redirect(new URL("/auth/signin", url));

    // TODO: Implement auth and authorization logic here. For now, this is a no-op that allows all requests to proceed.

    // const isAuth = await auth();
    //
    // if (isAuth?.user) {
    //     if (url.pathname.startsWith("/auth"))
    //         return NextResponse.redirect(new URL("/", url));
    //
    //     if (url.pathname.startsWith("/dashboard")) {
    //     }
    //
    //     if (url.pathname.startsWith("/api")) return res;
    // } else {
    //     if (url.pathname.startsWith("/api")) {
    //         const response = CResponse({
    //             message: "UNAUTHORIZED",
    //             longMessage: "You are not signed in",
    //         });
    //         response.cookies.delete(AUTH_COOKIE_NAME);
    //         return response;
    //     }
    //
    //     const response = NextResponse.redirect(new URL("/auth/signin", url));
    //     response.cookies.delete(AUTH_COOKIE_NAME);
    //     return response;
    // }

    return res;
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/api/:path*",
        "/",
        "/dashboard/:path*",
        "/auth/:path*",
    ],
};
