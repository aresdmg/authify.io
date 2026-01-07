"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, userSchema } from "@/utils/types";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios"

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>({
        resolver: zodResolver(userSchema),
        mode: "onChange"
    })

    const handleRegisterUser = async (userData: User) => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`, { ...userData }, { withCredentials: true })
            if (res.status === 200) {
                router.push('/console')
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error?.message || "Server error")
            }
        } finally {
            setIsLoading(false)
            reset()
        }
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex justify-center items-center w-xl h-auto rounded-2xl border">
                    <form onSubmit={handleSubmit(handleRegisterUser)} className="w-full h-full flex justify-start items-center p-10 flex-col">
                        <div className="w-full flex justify-center items-center flex-col gap"  >
                            <h1 className="text-2xl font-semibold">Login to Authify.dev</h1>
                            <p className="text-sm text-zinc-600">setup your production in minutes</p>
                        </div>
                        <div className="w-full h-full flex justify-start items-center flex-col space-y-5" >
                            <div className="w-full flex flex-col space-y-2.5 ">
                                <Label> Email </Label>
                                <Input type="email" placeholder="e.g. johndoe@domain.com" className="h-10" {...register("email", { required: true })} />
                                {
                                    errors.email &&
                                    <p className="text-red-400 text-sm flex justify-start items-center gap-1" >
                                        <AlertCircle className="size-4" />
                                        {errors.email?.message}
                                    </p>
                                }
                            </div>
                            <div className="w-full flex flex-col space-y-2.5 ">
                                <Label> Password </Label>
                                <Input type="password" placeholder="Enter your secure password" className="h-10" {...register("password", { required: true })} />
                                {
                                    errors.password &&
                                    <p className="text-red-400 text-sm flex justify-start items-center gap-1" >
                                        <AlertCircle className="size-4" />
                                        {errors.password?.message}
                                    </p>
                                }
                            </div>
                            <Button type="submit" className="w-full h-10 cursor-pointer" disabled={isLoading} >
                                {isLoading ? (
                                    <span className="animate-spin" >
                                        <Loader2 className="size-5" />
                                    </span>
                                ) : "Submit"}
                            </Button>
                            <div className="w-full h-auto flex justify-between items-center">
                                <div className="flex justify-start items-center space-x-1.5" >
                                    <p className="text-sm" >Don't have an account ?</p>
                                    <Link href={"/auth/sign-up"} className="underline text-primary text-sm" > Sign up </Link>
                                </div>
                                <div>
                                    <Link href={'/forget-password'} className="text-primary" >forget password ?</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}