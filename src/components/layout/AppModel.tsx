"use client"

import { motion } from "motion/react"
import { Button } from "../ui/button"
import { AlertCircle, Loader2, X } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import axios, { isAxiosError } from "axios"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { appSchema, AppSchemaType } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"

interface AppModelInterface {
    onClose: () => void
}

export default function AppModel({ onClose }: AppModelInterface) {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<AppSchemaType>({
        resolver: zodResolver(appSchema),
        mode: "onChange",
        defaultValues: {
            serverType: "micro"
        }
    })

    const handlePostApplicationData = async (data: AppSchemaType) => {
        console.log(data);
        setIsLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/application/`, { ...data }, { withCredentials: true })
            if (res.status === 200) {
                toast.success(res.data?.message ?? "Application registered")
            }
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                const errMsg = error?.response?.data?.message ?? "Server error"
                toast.error(errMsg)
            }
        } finally {
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
                            <form onSubmit={handleSubmit(handlePostApplicationData)} className="w-full min-h-full flex justify-center items-center flex-col space-y-3" >
                                <div className="w-full flex flex-col space-y-2.5 pb-2.5">
                                    <Label>
                                        Application name
                                    </Label>
                                    <Input type="text" placeholder="Enter application name" {...register("appName")} />
                                    {errors.appName && (
                                        <div className="flex text-red-400 justify-start items-center space-x-1.5">
                                            <AlertCircle className="size-4" />
                                            <p className="text-sm" >{errors?.appName?.message}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full flex flex-col space-y-2.5 pb-2.5">
                                    <Label>
                                        Server type
                                    </Label>
                                    <Controller name="serverType" control={control} render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select server type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem className="uppercase" value="micro">MICRO - $0/month</SelectItem>
                                                    <SelectItem className="uppercase" value="standard">STANDARD - $29/month</SelectItem>
                                                    <SelectItem className="uppercase" value="massive" disabled >
                                                        MASSIVE - $59/month
                                                        <Badge variant="secondary" className="text-xs text-blue-100 bg-blue-800" >
                                                            Beta
                                                        </Badge>
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )} />
                                </div>
                                <div className="w-full flex justify-end items-center space-x-3.5" >
                                    <Button type="submit" className="w-40 cursor-pointer">
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