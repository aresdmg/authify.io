"use client"

import { useAuthStore } from "@/store/user.store"

export default function Page() {
    const fullName = useAuthStore((state) => state.user?.fullName)
    return <>{fullName ?? "SOME RANDOM FULL NAME"}</>
}
