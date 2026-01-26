"use client"

import { useParams } from "next/navigation"

export default function DynamicAuthpage() {

    const params = useParams()
    const tenant = params.tenant as string;

    return (
        <>
            <div>Tenant: {tenant}</div>
        </>
    )
}