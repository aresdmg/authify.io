import * as z from "zod"

export const authSchema = z.object({
    fullName: z.string().min(1, "Full name is required").optional(),
    email: z.email(),
    password: z.string().min(6, "Password must be 6 characters"),
})

export type AuthType = z.infer<typeof authSchema>

export type User = {
    id: string
    email: string
    fullName: string
    pfp: string
    isNew: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}
