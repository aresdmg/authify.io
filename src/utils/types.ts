import * as z from "zod"

export const authSchema = z.object({
    fullName: z.string().min(1, "Full name is required").optional(),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be 6 characters"),
})

export type AuthType = z.infer<typeof authSchema>

export const orgSchema = z.object({
    orgName: z.string().min(1, "Organization name is required"),
    type: z.enum(["personal", "startup", "company", "not-applicable"]).default("personal").optional(),
    plan: z.enum(["free", "team"]).default("free").optional()
})

export type OrgType = z.infer<typeof orgSchema>

export const appSchema = z.object({
    appName: z.string().min(1, "Application name is required"),
    serverType: z.enum(["micro", "standard", "massive"]).default("micro").optional(),
})

export type AppSchemaType = z.infer<typeof appSchema>

export type User = {
    email: string
    fullName: string
    pfp: string
}

export type Organization = {
    id: string,
    orgName: string,
    ownerId: string,
    plan: ["free", "team"],
    type: ["personal", "startup", "company", "not-applicable"]
    createdAt: string,
    updatedAt: string
}

export type Application = {
    id: string,
    appName: string,
    branch: string[],
    serverType: string
}