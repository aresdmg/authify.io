"use client"

import { motion } from "motion/react"
import { Button } from "../ui/button"
import { AlertCircle, Loader2, X } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import axios, { isAxiosError } from "axios"
import { toast } from "sonner"

interface AppModelInterface {
    onClose: () => void
}

export default function AppModel({ onClose }: AppModelInterface) {
    const [isLoading, setIsLoading] = useState(false)
    const [appName, setAppName] = useState('')
    const [touched, setTouched] = useState(false)

    const handlePostApplicationData = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/application/`, { appName }, { withCredentials: true })
            if (res.status === 200) {
                toast.success(res.data?.message ?? "Application registered")
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const errMsg = error?.response?.data?.message ?? "Server error"
                toast.error(errMsg)
            }
        } finally {
            setAppName("")
            onClose()
        }
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
                            <form className="w-full min-h-full flex justify-center items-center flex-col space-y-3" >
                                <div className="w-full flex flex-col space-y-2.5 pb-2.5">
                                    <Label>
                                        Application name
                                    </Label>
                                    <Input type="text" placeholder="Enter application name" value={appName} onChange={(e) => {
                                        setTouched(true)
                                        setAppName(e.target.value)
                                    }} />
                                    {touched && appName.length === 0 && (
                                        <div className="flex text-red-400 justify-start items-center space-x-1.5">
                                            <AlertCircle className="size-4" />
                                            <p className="text-sm" >Application name is required</p>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full flex justify-end items-center space-x-3.5" >
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        handlePostApplicationData();
                                    }}
                                        type="submit"
                                        className="w-40 cursor-pointer"
                                        disabled={appName.length < 1}
                                    >
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