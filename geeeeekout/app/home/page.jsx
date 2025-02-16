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
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from 'next/link'


export default function home() {
    const [following, setFollowing] = useState([]);
    const [communities, setCommunities] = useState([]);
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
        fetch('/api/community').then((res) => res.json()).then((data) => {
            console.log(data);
            setCommunities(data.map((community) => {
                return {
                    id: community.community_id,
                    name: community.name,
                    description: community.description,
                    image_url: community.image_url
                }
            }));
        });
    }, []);
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        window.location.href = '/g4/' + item.name
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.description}</span>
            </>
        )
      }


    return (
        <>
            <motion.div className="w-full absolute flex justify-center mt-[90vh] z-10" ref={ref} style={{ opacity: chevState }}>
                <ChevronDown size={50} />
            </motion.div>

            <div className="flex flex-col items-center justify-center">
                
                <div
                    id='following'
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <div className="w-80 h-20 mt-10 z-10">
                        <ReactSearchAutocomplete
                            items={communities}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                        />
                    </div>
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