import { Button } from "@/components/ui/button";
import { ChevronRight, GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="w-full min-h-[calc(100vh-14rem)] flex justify-center items-center flex-col gap-3">
                <div className="flex justify-center items-center flex-col" >
                    <h1 className="text-xl" >You dont have an application start building by creating one</h1>
                    <p className="font-mono text-zinc-500 ">Looks like you are new here, Go read the <Link className="hover:underline transition-all text-blue-600/50" href={'/docs'}>docs</Link>.</p>
                </div>
                <div className="flex justify-center items-center space-x-3" >
                    <Button variant={"secondary"} className="cursor-pointer" size={"sm"} >
                        <GithubIcon />
                        <span>Github</span>
                    </Button>
                    <Button className="cursor-pointer" size={"sm"} >
                        <span>Start building</span>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </>
    )
}