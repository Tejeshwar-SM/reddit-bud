import z from "zod";

export const signInSchema = z.object({
    username: z
        .string("Username is required")
        .min(1, "Username must be at least 1 character"),
    password: z
        .string("Password is required")
        .min(1, "Password must be at least 1 character"),
});
