'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { motion, useScroll, useTransform } from "motion/react"
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from 'next/link'


export default function home() {
    const [following, setFollowing] = useState([]);
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    })

    const chevState = useTransform(scrollYProgress, [0, 0.2, 0.3, 1], [1, 1, 0, 0])


    useEffect(() => {
        console.log(localStorage.getItem('user_id'));
        let user_id = localStorage.getItem('user_id');

        fetch(`/api/follow/user/${user_id}`).then((res) => res.json()).then((data) => {
            console.log(data);
            setFollowing(data);
        });
    }, []);


    return (
        <>
            <motion.div className="w-full absolute flex justify-center mt-[90vh] z-10" ref={ref} style={{ opacity: chevState }}>
                <ChevronDown size={50} />
            </motion.div>

            <div className="flex flex-col items-center justify-center h-screen">
                <div
                    id='following'
                    className="flex flex-col items-center justify-center h-screen gap-4"
                >
                    <h1 className="text-3xl font-bold">Following</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {following.map((follow) => (
                            <Link key={follow.follow_id} href={"/g4/" + follow.name}>
                            <Card className="overflow-clip w-60">
                                {/* <CardHeader>
                                    <CardTitle>{"g4/" + follow.name}</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader> */}
                                <CardContent className="p-0">
                                    <AspectRatio ratio={4 / 3}>
                                        <Image src={follow.image_url} alt="community" fill className="w-full h-40 object-cover" />
                                    </AspectRatio>

                                </CardContent>
                                <CardFooter className="flex-col !items-start !pt-6 h-auto justify-between text-xl">
                                    <p className="font-semibold leading-none tracking-tight">{"g4/" + follow.name}</p> <br />
                                    <p className="text-sm text-muted-foreground">{"g4/" + follow.name}</p>

                                </CardFooter>
                            </Card>
                            </Link>
                            
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}