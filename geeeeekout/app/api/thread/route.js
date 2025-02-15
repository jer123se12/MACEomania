"use server";

import { createThread, getAllThreads } from '@/components/model/threadModel';

export async function GET() {
    
    const data = await getAllThreads();
    
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
    
        const { title, content, creator_id, community_id } = body;
    
        const data = await createThread(title, content, creator_id, community_id);
        
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