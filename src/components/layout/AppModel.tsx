"use client"

import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Loader2, X } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import { appSchema, AppType, Organization } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"

interface AppModelInterface {
    onClose: () => void
}

export default function AppModel({ onClose }: AppModelInterface) {
    const [isLoading, setIsLoading] = useState(false)
    const [orgs, setOrgs] = useState<Organization[]>([])
    const { register, handleSubmit, control, formState: { errors } } = useForm<AppType>({
        resolver: zodResolver(appSchema),
        mode: "onChange"
    })

    const handlePostOrgData = (data: any) => {
        console.log(data);
    }

    return (
        <>
            <div className="fixed top-0 w-full h-screen bg-zinc-900/30 z-20 flex justify-center items-center " >
                <motion.div
                    initial={{ scale: 0.9, opacity: "50%" }}
                    animate={{ scale: 1, opacity: "100%" }}
                    exit={{ scale: 0.9, opacity: "0%" }}
                    transition={{ duration: 0.15 }} >
                    <div className="min-w-xl h-auto rounded-xl border bg-zinc-900 p-10 flex flex-col space-y-5">
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h1 className="text-lg font-medium">Create new Application</h1>
                                <p className="text-xs text-zinc-600" >Create your application and start building</p>
                            </div>
                            <Button variant={"ghost"} className="cursor-pointer" onClick={() => onClose()} >
                                <X />
                            </Button>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(handlePostOrgData)} className="w-full min-h-full flex justify-center items-center flex-col space-y-3" >
                                <div className="w-full flex flex-col space-y-2.5 pb-2.5">
                                    <Label>
                                        Application name
                                    </Label>
                                    <Input type="text" placeholder="Enter application name" />
                                </div>
                                <div className="w-full flex justify-end items-center space-x-3.5" >
                                    <Button type="submit" className="w-40 cursor-pointer" >
                                        {
                                            isLoading ?
                                                (<>
                                                    <span className="animate-spin" >
                                                        <Loader2 />
                                                    </span>
                                                </>) : (<>
                                                    <p>
                                                        Add application
                                                    </p>
                                                </>)
                                        }
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}