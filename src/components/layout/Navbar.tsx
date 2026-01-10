"use client"

import { BellRing, Icon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { hexagons3 } from '@lucide/lab';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/user.store";
import { hydrateUserStore } from "@/utils/hydateUser";
import { useEffect } from "react";

export default function Navbar() {

    const user = useAuthStore((state) => state.user)
    useEffect(() => {
        if (!user) {
            hydrateUserStore()
        }
    }, [user])

    return (
        <>
            <div className="w-full h-14 border-b fixed top-0 flex justify-start items-center bg-background " >
                <div className="w-20 h-full flex justify-center items-center border-r">
                    <Button variant={"ghost"} className="cursor-pointer w-auto h-auto">
                        <Icon iconNode={hexagons3} className="size-6" />
                    </Button>
                </div>
                <div className="px-7 w-1/2">
                    <h1 className="text-lg font-medium">Authify</h1>
                </div>
                <div className="w-1/2 h-full flex justify-end items-center space-x-5 px-10">
                    <Button variant={"outline"} className="cursor-pointer">
                        <BellRing />
                    </Button>
                    <Link href={"/profile"}>
                        <Avatar>
                            <AvatarImage src={user?.pfp} />
                            <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            </div>
        </>
    )
}