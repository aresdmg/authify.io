import { Icon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
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
                <div className="px-7 w-full">
                    <h1 className="text-lg font-medium">Authify</h1>
                </div>
                <div className="w-20 h-full flex justify-center items-center border-l">
                    <Link href={'/profile'} >
                        <Image src={"https://res.cloudinary.com/desamhhkj/image/upload/v1766655479/Tik_tok_profile_picture_erpml0.jpg"} alt="profile_picture" width={500} height={500} className="size-9 rounded-full" />
                    </Link>
                </div>
            </div>
        </>
    )
}