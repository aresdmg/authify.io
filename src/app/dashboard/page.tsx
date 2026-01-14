"use client"

import { Button } from "@/components/ui/button";
import { Book, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react"
import AppModel from "@/components/layout/AppModel";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()
    const [showCreateAppModel, setShowCreateAppModel] = useState(false)
    return (
        <>
            {showCreateAppModel && (
                <>
                    <AnimatePresence>
                        <AppModel onClose={() => setShowCreateAppModel(e => !e)} />
                    </AnimatePresence>
                </>
            )}
            <div className="w-full min-h-[calc(100vh-14rem)]">
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
            </div>
        </>
    )
}