export const MESSAGES = {
    ERRORS: {
        AUTH: {
            INVALID_CREDENTIALS: "Invalid credentials",
        },
        GENERAL: {
            GENERIC: "An error occurred, please try again",
            UNAUTHORIZED: "You are not authorized to perform this action",
            FORBIDDEN: "You do not have permission to access this resource",
            NOT_FOUND: "The requested resource was not found",
            CONFLICT: "The resource already exists",
            BAD_REQUEST: "The request is invalid",
            INTERNAL_SERVER_ERROR: "An internal server error occurred",
            INVALID_IDS: (ids: string[]) =>
                `Invalid IDs: ${ids.map((id) => `'${id}'`).join(", ")}`,
        },
    },
} as const;

export const AUTH_COOKIE_NAME = "reddit_bud__auth_token";
