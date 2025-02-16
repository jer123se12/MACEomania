"use client"
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

export function ThreadMessagesDialog({ thread_name = null, thread_content = null, messages = [] }) {
    // const [messages, setMessages] = useState(Array(20).fill("message"))

    useEffect(() => { console.log(messages) }, [messages])

    return (
        <DialogContent className="sm:max-w-[1024px] sm:max-h-[80vh]">
            <DialogHeader>
                <DialogTitle>{thread_name}</DialogTitle>
                <DialogDescription>
                    {thread_content}
                </DialogDescription>
            </DialogHeader>
            {/* Dialog body */}
            <ScrollArea className="max-h-[60vh] w-auto rounded-md border">
                {messages.map((message) => (
                    <HoverCard key={message.message_id}>
                        <HoverCardTrigger asChild>
                            <Card className="w-full max-w-[1024] h-40 flex items-center justify-left text-m mt-4">
                                <CardHeader>
                                    {/* owner */}
                                    <CardTitle>{message.username}</CardTitle>
                                    {/* messageid content creator_username date created */}
                                    <CardDescription>{message.content}</CardDescription>
                                </CardHeader>
                                <CardContent>

                                </CardContent>
                            </Card>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto h-auto flex items-center justify-left text-m">
                            <div>
                                <p>Created at:</p>
                                <p>TIMESTAMP</p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>

                ))}
            </ScrollArea>
            {/* </div> */}
            <DialogFooter>
                <Input></Input>
                <Button type="submit">Send</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default ThreadMessagesDialog