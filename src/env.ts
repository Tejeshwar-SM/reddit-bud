import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.url("DATABASE_URL must be a valid URL"),
        REDIS_URL: z.string().min(1, "REDIS_URL is required"),

        AUTH_USERNAME: z.string().min(1, "AUTH_USERNAME is required"),
        AUTH_PASSWORD: z.string().min(1, "AUTH_PASSWORD is required"),

        JWT_SECRET: z
            .string()
            .min(32, "JWT_SECRET must be at least 32 characters"),
    },
    client: {
        NEXT_PUBLIC_DEPLOYMENT_URL: z
            .url("NEXT_PUBLIC_DEPLOYMENT_URL must be a valid URL")
            .optional(),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        REDIS_URL: process.env.REDIS_URL,

        AUTH_USERNAME: process.env.AUTH_USERNAME,
        AUTH_PASSWORD: process.env.AUTH_PASSWORD,

        JWT_SECRET: process.env.JWT_SECRET,

        NEXT_PUBLIC_DEPLOYMENT_URL: process.env.NEXT_PUBLIC_DEPLOYMENT_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
