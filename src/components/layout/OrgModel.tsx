"use client"

import { AlertCircle, Loader2, X } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useAuthStore } from "@/store/user.store"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { Controller, useForm } from "react-hook-form"
import { orgSchema, OrgType } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { isAxiosError } from "axios"
import { useState } from "react"
import { toast } from "sonner"

interface OrgModelInterface {
    onClose: () => void
}

export default function OrgModel({ onClose }: OrgModelInterface) {
    const [isCheckLoading, setIsCheckLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const usersName = useAuthStore(state => state.user)?.fullName
    const { register, handleSubmit, reset, formState: { errors }, control, getValues, clearErrors, setError } = useForm<OrgType>({
        resolver: zodResolver(orgSchema),
        mode: "onChange",
        defaultValues: {
            orgName: "",
            type: "personal",
            plan: "free",
        }
    })

    const handlePostOrgData = async (data: OrgType) => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orgs/`, { ...data }, { withCredentials: true })
            if (res.status === 200) {
                toast.success(res.data?.message)
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Server error")
            }
        } finally {
            setIsLoading(false)
            onClose()
        }
    }

    const handleCheckOrgName = async () => {
        setIsCheckLoading(true)
        const orgName = getValues("orgName")
        if (!orgName || orgName.trim().length < 1) {
            setError("orgName", {
                type: "manual",
                message: "Organization name cannot be empty",
            })
            return
        }

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orgs/check?name=${orgName}`, { withCredentials: true })
            if (res.status === 200) {
                toast.success(res.data?.data?.info)
            }
            clearErrors("orgName")
        } catch (error: any) {
            const message = error?.response?.data?.message ||"Organization name already exists"
            setError("orgName", {
                type: "manual",
                message,
            })
        } finally {
            setIsCheckLoading(false)
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
                                <h1 className="text-lg font-medium">Create your Organization</h1>
                                <p className="text-xs text-zinc-600" >Start by creating your organization</p>
                            </div>
                            <Button variant={"ghost"} className="cursor-pointer" onClick={() => onClose()} >
                                <X />
                            </Button>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(handlePostOrgData)} className="w-full min-h-full flex justify-center items-center flex-col space-y-3" >
                                <div className="w-full flex flex-col space-y-2.5" >
                                    <Label>
                                        Organization name
                                    </Label>
                                    <div className="w-full flex space-x-2.5" >
                                        <div className="w-full flex flex-col" >
                                            <Input type="text" placeholder={"e.g. " + usersName + "'s Org"} {...register("orgName")} />
                                            {
                                                errors?.orgName && (
                                                    <p className="mt-1 text-sm text-red-500 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1" />
                                                        {errors.orgName.message}
                                                    </p>)
                                            }
                                        </div>
                                        <Button type="button" variant={"outline"} className="cursor-pointer w-20" onClick={() => handleCheckOrgName()} >
                                            {
                                                isCheckLoading ?
                                                    (<>
                                                        <span className="animate-spin" >
                                                            <Loader2 />
                                                        </span>
                                                    </>) : (<>
                                                        <p>
                                                            Check
                                                        </p>
                                                    </>)
                                            }
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col space-y-2.5" >
                                    <Label>
                                        Type
                                    </Label>
                                    <Controller control={control} name="type" render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} defaultValue="personal" >
                                            <SelectTrigger className="w-full h-10 ">
                                                <SelectValue placeholder="Type of organization" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="personal">Personal</SelectItem>
                                                    <SelectItem value="startup">Startup</SelectItem>
                                                    <SelectItem value="company">Company</SelectItem>
                                                    <SelectItem value="not-applicable">N/A</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )} />
                                </div>
                                <div className="w-full flex flex-col space-y-2.5" >
                                    <Label>
                                        Plan
                                    </Label>
                                    <Controller control={control} name="plan" render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} defaultValue="free" >
                                            <SelectTrigger className="w-full h-10 ">
                                                <SelectValue placeholder="Select pricing plan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="free">Free - $0/month</SelectItem>
                                                    <SelectItem value="team" disabled >
                                                        Team - $39/month
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
                                    <Button type="button" variant={"secondary"} className="w-40 cursor-pointer" onClick={() => onClose()} >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="w-40 cursor-pointer" >
                                        {
                                            isLoading ?
                                                (<>
                                                    <span className="animate-spin" >
                                                        <Loader2 />
                                                    </span>
                                                </>) : (<>
                                                    <p>
                                                        Create
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