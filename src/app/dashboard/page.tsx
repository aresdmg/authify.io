"use client"

import { Button } from "@/components/ui/button";
import { Book, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react"
import AppModel from "@/components/layout/AppModel";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Application } from "@/utils/types";
import Link from "next/link";

export default function Home() {
    const router = useRouter()
    const [showCreateAppModel, setShowCreateAppModel] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [applications, setApplications] = useState<Application[]>([])

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const getUsersApplication = async () => {
        setIsLoading(true)
        try {
            const [res] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/application`, { withCredentials: true }),
                delay(650)
            ])
            setApplications(res.data?.data)
        } catch (error) {
            if (isAxiosError(error)) {
                const errMsg = error.response?.data?.message || "Server error"
                toast.error(errMsg)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUsersApplication()
    }, [])

    if (isLoading) {
        return (
            <div className="w-full min-h-[calc(100vh-14rem)]">
                <div className="min-w-7xl py-12 flex justify-between items-center px-80 ">
                    <h1 className="text-xl font-medium" >Your applications</h1>
                    <Button className="cursor-pointer" size={"sm"} onClick={() => toast(<div>Wait for a second</div>)} >
                        <span>
                            Add application
                        </span>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <div className="min-w-7xl grid grid-cols-3 gap-4 px-80">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-52 w-full"
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            {showCreateAppModel && (
                <>
                    <AnimatePresence>
                        <AppModel onClose={() => {
                            setShowCreateAppModel(e => !e);
                            getUsersApplication()
                        }} />
                    </AnimatePresence>
                </>
            )}
            <div className="w-full min-h-[calc(100vh-10rem)]">
                {
                    applications.length <= 0 && (
                        <div className="w-full min-h-[calc(100vh-14rem)] flex justify-center items-center flex-col gap-4">
                            <div className="flex justify-center items-center flex-col" >
                                <h1 className="text-2xl font-medium" >Start building by creating a Project</h1>
                                <p className="text-sm font-mono text-zinc-500 ">Get your application up and running in seconds.</p>
                            </div>
                            <div className="flex justify-center items-center space-x-3" >
                                <Button variant={"secondary"} className="w-40 cursor-pointer" onClick={() => router.push('/docs')} >
                                    <Book />
                                    <span>Documentation</span>
                                </Button>
                                <Button className="cursor-pointer w-40" onClick={() => setShowCreateAppModel(e => !e)} >
                                    <span>Start building</span>
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    )
                }
                {
                    applications.length > 0 && (<div className="min-w-7xl py-12 flex justify-between items-center px-80">
                        <h1 className="text-xl font-medium" >Your applications</h1>
                        <Button className="cursor-pointer" size={"sm"} onClick={() => setShowCreateAppModel(e => !e)} >
                            <span>
                                Add application
                            </span>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>)
                }
                {applications.length > 0 && (
                    <div className="w-full grid grid-cols-3 gap-4 px-80">
                        {applications.map((app) => (
                            <Link href={`/dashboard/${app.id}`} key={app.id} className="h-52 border rounded-xl bg-zinc-900/50 flex justify-start items-start px-7 py-5 hover:border-zinc-700 hover:transition-all hover:bg-zinc-900">
                                <div className="w-full h-auto flex justify-between" >
                                    <div className="flex justify-center items-center space-x-4" >
                                        <h1 className="font-medium text-xl" >{app.appName}</h1>
                                        <div className="flex justify-center items-center bg-zinc-800 px-1 py-0.5 rounded">
                                            <p className="text-xs text-zinc-500 " >
                                                {String(app.serverType).toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="w-10 h-10 flex justify-center items-center" >
                                        <ChevronRight className="size-5" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}