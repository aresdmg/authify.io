import * as z from "zod"

export const userSchema = z.object({
    fullName: z.string().min(1, "Full name is required").optional(),
    email: z.email(),
    password: z.string().min(6, "Password must be 6 characters"),
})

export type User = z.infer<typeof userSchema>