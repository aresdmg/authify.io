"use client"

import Navbar from "@/components/layout/Navbar";
import { hydrateUserStore } from "@/utils/hydateUser";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        hydrateUserStore()
    }, [])

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}