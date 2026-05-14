import { MESSAGES } from "@/config/const";
import { auth } from "@/lib/jwt";
import { AppError, CResponse, handleError } from "@/lib/utils";

export async function GET() {
    try {
        const isAuth = await auth();
        if (!isAuth)
            throw new AppError(
                MESSAGES.ERRORS.GENERAL.UNAUTHORIZED,
                "UNAUTHORIZED"
            );

        return CResponse({ data: isAuth.user });
    } catch (err) {
        return handleError(err);
    }
}
