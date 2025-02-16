'use server';

import {getAllFollows, createFollow} from '@/components/model/followModel';

export async function GET() {

    const data = await getAllFollows();

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
    
    const { user_id, community_id } = body;

    const data = await createFollow(user_id, community_id);

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
