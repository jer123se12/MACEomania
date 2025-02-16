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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import SortBy from "@/components/SortBy";
import { useEffect, useState, useRef } from "react";
import ThreadRow from '@/components/ui/threadRow';
import Comboard from "@/components/comboard";
import SideBar from "@/components/sideBar";
import NavMenu from "@/components/nav-menu";
import { motion, useScroll, useTransform } from "motion/react"
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button"
  
import ComboardWrapper from '@/components/comboardWrapper';
import { is } from './../../../node_modules/sucrase/dist/esm/transformers/CJSImportTransformer';



export default function subcomm({ params }) {
    const [threads, setThreads] = useState([]);
    const [postits, setPostits] = useState([]);
    const [hover, setHover] = useState(-1);
    const [boards, setBoard] = useState([]);
    const [info, setInfo] = useState({});
    const [community, setCommunity] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [isFollowed, setIsFollowed] = useState(false);

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
            console.log("info",data);
            setInfo(data[0]);
            const user_id = localStorage.getItem('user_id');
            fetch('/api/follow/user/' + user_id + '/community/' + data[0].community_id).then((res) => res.json()).then((data) => {
                setIsFollowed(data.length > 0);
        });
        });
        
    }, [community]);

    function handleNewThread() {
        const user_id = localStorage.getItem('user_id');

        fetch('/api/thread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: description,
                creator_id: user_id,
                community_id: info.community_id
            }),
        }).then((res) => res.text()).then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            console.log(data)
            setThreads([{
                title: title,
                content: description,
                creator_id: user_id,
                community_id: info.community_id
            }, ...threads ]);
            setTitle("");
            setDescription("");
        });
    }

    const handleFollow = () => {
        
        const user_id = localStorage.getItem('user_id');

        if (isFollowed) {
            fetch('/api/follow/user/' + user_id + '/community/' + info.community_id, {
                method: 'DELETE',
            }).then((res) => res.text()).then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                console.log(data)
                setIsFollowed(false);
            });
        }
        else {
            fetch('/api/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    community_id: info.community_id
                }),
            }).then((res) => res.text()).then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                console.log(data)
                setIsFollowed(true);
            });
        }
    }

    return <>
        <motion.div className="w-full absolute flex justify-center mt-[90vh] z-10" ref={ref} style={{ opacity: chevState }}>
            <ChevronDown size={50} />
        </motion.div>
        <NavMenu community={community}></NavMenu>
        <div className="flex flex-col items-center gap-4 p-4">
            {/* Iframe Placeholder */}
            
            <ComboardWrapper boards={postits} hover={hover}></ComboardWrapper>
            <div className="absolute right-0 top-50 h-[768] overflow-hidden">
                <SideBar boards={postits} hoverCallback={setHover}></SideBar>
            </div>
            {/* Description */}
            <motion.div className={"w-full max-w-[1024]"} style={{ opacity: descState }}>
                <Card className="w-full max-w-[1024] h-40 flex items-center justify-between text-5xl">
                    <CardHeader>
                        <CardTitle>{`G4/${community}`}</CardTitle>
                        <CardDescription>{info.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="black text-white">
                                    +
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[1024px] sm:max-h-[80vh]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl">
                                        Create a new thread
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogFooter>
                                    <Input placeholder="Thread title" onChange={(e) => setTitle(e.target.value)}></Input>
                                    <Input placeholder="Thread description" onChange={(e) => setDescription(e.target.value)}></Input>
                                    <DialogClose asChild>
                                        <Button onClick={handleNewThread}>
                                            Create
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button className={isFollowed ? "bg-black text-white" : "bg-white text-black border-2 border-black"} onClick={handleFollow}>
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                    </CardContent>
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

