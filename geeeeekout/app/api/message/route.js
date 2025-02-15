"use server";

import { createMessage, getAllMessages} from '@/components/model/messageModel';

export async function GET(req) {
    
    const data = await getAllMessages();

    if (data.error) {
        return new Response(JSON.stringify(data), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(data.results), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST(req) {
    const body = await req.json();
    
    const { content, creator_id, thread_id } = body;

    const data = await createMessage(content, creator_id, thread_id);

    if (data.error) {
        return new Response(JSON.stringify(data), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(data.results), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}