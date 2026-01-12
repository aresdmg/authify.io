"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react"
import OrgModel from "@/components/layout/OrgModel";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { Organization } from "@/utils/types";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [orgs, setOrgs] = useState<Organization[]>([])
    const [showCreateOrgModel, setShowCreateOrgModel] = useState(false)

    const getUsersOrganizations = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/orgs`, { withCredentials: true })
            setOrgs(res?.data?.data)
        } catch (error) {
            if (isAxiosError(error)) {
                const errMsg = error?.response?.data?.message
                toast.error(errMsg || "Server error")
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUsersOrganizations()
    }, [OrgModel, setShowCreateOrgModel, showCreateOrgModel])

    return (
        <>
            {showCreateOrgModel && (
                <>
                    <AnimatePresence >
                        <OrgModel onClose={() => setShowCreateOrgModel(e => !e)} />
                    </AnimatePresence>
                </>
            )}
            <div className="w-full min-h-[calc(100vh-14rem)]">
                <div className="w-full min-h-[calc(100vh-14rem)] flex justify-center items-center flex-col gap-3 ">
                    <div className="flex justify-center items-center flex-col" >
                        <h1 className="text-2xl font-medium" >Start building by creating an organization</h1>
                        <p className="text-sm font-mono text-zinc-500 ">Looks like you are new here, Go read the <Link className="hover:underline transition-all text-blue-600/50" href={'/docs'}>docs</Link>.</p>
                    </div>
                    <div className="flex justify-center items-center space-x-3" >
                        <Button variant={"secondary"} size={"sm"} className="w-40 cursor-pointer" onClick={() => setShowCreateOrgModel(e => !e)} >
                            <span>Create Organization</span>
                        </Button>
                        <Button className="cursor-pointer w-40" size={"sm"}>
                            <span>Start building</span>
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}