import React, { useEffect } from 'react'
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
    DialogTrigger,
} from "@/components/ui/dialog"
import ThreadMessagesDialog from '@/components/thread-messages-dialog'
import { useState } from 'react'

function ThreadRow({ thread_name = null, thread_content = null, thread_id }) {
    const [messages, setMessages] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (messages === "") return;
        console.log('/api/thread/' + thread_id + '/messages')
        fetch('/api/thread/' + thread_id + '/messages').then((res) => res.json()).then((data) => {
            console.log(data)
            setMessages(data);
            setRefresh(false);
        });
    }, [thread_id, refresh]);

    return (
        <div className='cursor-pointer'>
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="w-full h-48 flex" >
                        <CardHeader>
                            <CardTitle>{thread_name}</CardTitle>
                            <CardDescription >{thread_content} </CardDescription>
                        </CardHeader>
                    </Card>

                </DialogTrigger>
                <ThreadMessagesDialog thread_name={thread_name} thread_content={thread_content} messages={messages} thread_id={thread_id} setRefresh={setRefresh}>

                </ThreadMessagesDialog>
            </Dialog>

        </div>

    )
}

export default ThreadRow