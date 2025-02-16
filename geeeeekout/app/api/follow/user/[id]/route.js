'use server';

import { getFollowsByUserId } from '@/components/model/followModel';

export async function GET(req, { params }) {
        
    const { id } = await params;

    const data = await getFollowsByUserId(id);

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