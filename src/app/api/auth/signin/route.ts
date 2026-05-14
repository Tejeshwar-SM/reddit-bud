import { AUTH_COOKIE_NAME, MESSAGES } from "@/config/const";
import { env } from "@/env";
import { signToken } from "@/lib/jwt";
import { AppError, CResponse, handleError } from "@/lib/utils";
import { signInSchema } from "@/lib/validations";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = signInSchema.parse(body);

        if (username !== env.AUTH_USERNAME || password !== env.AUTH_PASSWORD)
            throw new AppError(
                MESSAGES.ERRORS.AUTH.INVALID_CREDENTIALS,
                "UNAUTHORIZED"
            );

        const token = await signToken({ username });
        const cookieStore = await cookies();

        cookieStore.set(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return CResponse({ data: { username } });
    } catch (err) {
        return handleError(err);
    }
}
