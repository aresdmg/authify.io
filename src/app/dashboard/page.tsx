"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight, GithubIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react"
import OrgModel from "@/components/layout/OrgModel";

export default function Home() {
    const [showCreateAppModel, setShowCreateAppModel] = useState(false)

    return (
        <>
            {showCreateAppModel && (
                <>
                    <AnimatePresence>
                        <OrgModel onClose={() => setShowCreateAppModel(e => !e)} />
                    </AnimatePresence>
                </>
            )}
            <div className="w-full min-h-[calc(100vh-14rem)] flex justify-center items-center flex-col gap-3">
                <div className="flex justify-center items-center flex-col" >
                    <h1 className="text-2xl font-medium" >Start building by creating an organization</h1>
                    <p className="text-sm font-mono text-zinc-500 ">Looks like you are new here, Go read the <Link className="hover:underline transition-all text-blue-600/50" href={'/docs'}>docs</Link>.</p>
                </div>
                <div className="flex justify-center items-center space-x-3" >
                    <Button variant={"secondary"} className="cursor-pointer" size={"sm"} >
                        <GithubIcon />
                        <span>Github</span>
                    </Button>
                    <Button className="cursor-pointer" size={"sm"} onClick={() => setShowCreateAppModel(e => !e)} >
                        <span>Start building</span>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </>
    )
}