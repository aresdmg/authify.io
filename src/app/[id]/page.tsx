"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Application } from "@/utils/types";
import axios, { isAxiosError } from "axios";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApplicationConsole() {
    const params = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false)
    const [application, setApplication] = useState<Application | null>(null)

    const getApplicationData = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/application/${params.id}`, { withCredentials: true })
            console.log(res.data?.data);
            setApplication(res?.data?.data);
        } catch (error) {
            if (isAxiosError(error)) {
                const errMsg = error?.response?.data?.message || "Server error"
                toast.error(errMsg)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getApplicationData()
    }, [])

    return (
        <>
            <div className="w-full h-14 flex justify-between items-center px-5">
                <SidebarTrigger className="mr-5 cursor-pointer border"/>
                {
                    isLoading ?
                        <Skeleton className="min-w-2xl h-5 rounded-xl" />
                        :
                        (
                            <div className="flex justify-start items-center" >
                                <Link href={'/dashboard'} className="font-medium hover:underline" >
                                    {application?.appName}
                                </Link>
                                <ChevronRight className="size-5 mx-2" />
                                <p className="font-light pr-3 text-zinc-300" >
                                    {application?.branch[0]}
                                </p>
                                <Button className="cursor-pointer bg-tranasparent" size={"icon-sm"} variant={"outline"} >
                                    <Plus className="size-4" />
                                </Button>
                            </div>
                        )
                }
            </div>
        </>
    );
}
