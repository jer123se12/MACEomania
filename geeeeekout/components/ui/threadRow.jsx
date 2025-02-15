import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function ThreadRow({ key, thread_name = null, thread_content = null }) {
    return (
        <>
            <Card key={key} className="w-full h-48 flex">
                <CardHeader>
                    <CardTitle>thread_name</CardTitle>
                    <CardDescription >thread_content </CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </>

    )
}

export default ThreadRow