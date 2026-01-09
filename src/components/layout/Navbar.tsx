import { Icon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { hexagons3 } from '@lucide/lab';

export default function Navbar() {
    return (
        <>
            <div className="w-full h-14 border-b sticky flex justify-start items-center bg-background " >
                <div className="w-20 h-full flex justify-center items-center border-r">
                    <Button variant={"ghost"} className="cursor-pointer w-auto h-auto">
                        <Icon iconNode={hexagons3} className="size-6" />
                    </Button>
                </div>
                <div className="px-7 w-1/2">
                    <h1 className="text-lg font-medium">Authify</h1>
                </div>
                <div className="w-1/2 h-full flex justify-end items-center space-x-7 px-10">
                    <Link className="text-zinc-500 hover:text-white hover:underline hover:transition-all" href={"/docs"}>Documentations</Link>
                    <Link className="text-zinc-500 hover:text-white hover:underline hover:transition-all" href={"/sdk"}>SDK</Link>
                    <Link className="text-white hover:underline hover:transition-all" href={"/profile"}>Profile</Link>
                </div>
            </div>
        </>
    )
}