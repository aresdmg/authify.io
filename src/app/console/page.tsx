"use client"

import { useAuthStore } from "@/store/user.store"
import { hydrateUserStore } from "@/utils/hydateUser"
import { useEffect } from "react"

export default function Page() {
    useEffect(() => {(
        hydrateUserStore()
    )}, [])

    const fullName = useAuthStore((state) => state.user?.fullName)
    return (
        <>
            {fullName ?? "SOME RANDOM FULL NAME"}
        </>
    )
}
