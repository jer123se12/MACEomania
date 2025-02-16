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
import { useEffect, useState, useRef } from "react";
import ThreadRow from '@/components/ui/threadRow';
import Comboard from "@/components/comboard";
import SideBar from "@/components/sideBar";
import NavMenu from "@/components/nav-menu";
import { motion, useScroll, useTransform } from "motion/react"
import { ChevronDown } from 'lucide-react';
import ComboardWrapper from '@/components/comboardWrapper';



export default function subcomm({ params }) {
    const [threads, setThreads] = useState([]);
    const [postits, setPostits] = useState([]);
    const [hover, setHover] = useState(-1);
    const [boards, setBoard] = useState([]);
    const [info, setInfo] = useState({});
    const [community, setCommunity] = useState("");

    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    })

    const chevState = useTransform(scrollYProgress, [0, 0.2, 0.3, 1], [1, 1, 0, 0])
    const descState = useTransform(scrollYProgress, [0, 0.1, 0.2, 1], [0, 0, 1, 1])

    useEffect(() => {
        params.then((params) => {
            setCommunity(params.name);
        });
    }, []);

    useEffect(() => {
        if (community === "") return;
        console.log('/api/community/' + community + '/threads')
        fetch('/api/community/' + community + '/threads').then((res) => res.json()).then((data) => {
            console.log(data);
            setThreads(data);
        });
        fetch('/api/community/' + community + '/postits').then((res) => res.json()).then((data) => {
            console.log(data);
            setPostits(data);
        });
        fetch('/api/community/' + community).then((res) => res.json()).then((data) => {
            console.log(data);
            setInfo(data[0]);
        });
    }, [community]);

    return <>
        <motion.div className="w-full absolute flex justify-center mt-[90vh] z-10" ref={ref} style={{ opacity: chevState }}>
            <ChevronDown size={50} />
        </motion.div>
        <NavMenu></NavMenu>
        <div className="flex flex-col items-center gap-4 p-4">
            {/* Iframe Placeholder */}

            <ComboardWrapper boards={postits} hover={hover}></ComboardWrapper>
            <div className="absolute right-0 top-0 h-full overflow-hidden">
                <SideBar boards={boards} hoverCallback={setHover}></SideBar>
            </div>
            {/* Description */}
            <motion.div className={"w-full max-w-[1024]"} style={{ opacity: descState }}>
                <Card className="w-full max-w-[1024] h-40 flex items-center justify-left text-5xl">
                    <CardHeader>
                        <CardTitle>{community}</CardTitle>
                        <CardDescription>{info.description}</CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
            </motion.div>


            {/* Tags and Search */}
            <div className="w-full max-w-[1024] flex gap-2">
                <Card className="h-12 flex items-center justify-center px-6 gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                    <SortBy />
                </Card>
                <Input className="w-full h-12 flex items-center justify-center px-6" placeholder="Search..."></Input>
            </div>

            {/* Div Section */}

            <div className="w-full max-w-[1024] flex flex-col gap-8">
                {threads.map((value) => {
                    // return <Card className="w-full h-48 bg-red-500 flex items-center justify-center text-white" key={index}>
                    //     {index}
                    // </Card>
                    return <ThreadRow key={value.thread_id} thread_name={value.title} thread_content={value.content} thread_id={value.thread_id}></ThreadRow>
                })}
            </div>

        </div>
    </>
}

