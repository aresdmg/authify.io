"use client";

import { useParams } from "next/navigation";

export default function ApplicationConsole() {
    const params = useParams<{ id: string }>();

    return (
        <>
            {typeof params.id === "string" ? params.id : "some uuid"}
        </>
    );
}
