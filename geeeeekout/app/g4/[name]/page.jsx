"use client"
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SortBy from "@/components/SortBy";
import { useState } from "react";

export default function subcomm() {
    const [threads, setThreads] = useState(Array.from({ length: 10 }, (_, i) => i + 1));

    return <>
        <div className="flex flex-col items-center gap-4 p-4">
            {/* Iframe Placeholder */}
            <Card className="w-[1024] h-[768] bg-black flex items-center justify-center text-white">
                iframe
            </Card>

            {/* Description */}
            <Card className="w-full max-w-[1024] h-40 flex items-center justify-left text-5xl">
                <CardHeader>
                    <CardTitle>Description:</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
            </Card>


            {/* Tags and Search */}
            <div className="w-full max-w-[1024] flex gap-2">
                <Card className="h-12 flex items-center justify-center px-6 gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                    <SortBy />
                </Card>
                <Input className="w-full h-12 flex items-center justify-center px-6" placeholder="Search..."></Input>
            </div>

            {/* Div Section */}

            <div className="w-full max-w-[1024] flex flex-col gap-2">


            {threads.map((value, index) => {
                return <Card className="w-full h-48 bg-red-500 flex items-center justify-center text-white" key={index}>
                    {index}
                </Card>
            })}
            </div>

        </div>
    </>
}

