'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from 'react';

export default function home() {
    const [following, setFollowing] = useState([]);

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
        <div className="flex flex-col items-center justify-center h-screen">
            <div 
                id='following'
                className="flex flex-col items-center justify-center h-screen"
            >
                <h1 className="text-3xl font-bold">Following</h1>
                <div className="flex flex-col items-center justify-center">
                    {following.map((follow) => {
                        return (
                            <Card key={follow.follow_id}
                        )
                    })}
            </div>
        </div>
    </> 
    )
}