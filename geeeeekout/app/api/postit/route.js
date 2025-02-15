"use server";

import { createPostit, getAllPostits } from '@/components/model/postitModel';

export async function GET() {

    const data = await getAllPostits();

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

    const { creator_id, community_id, html_url, position_x, position_y, size_width, size_height } = body;

    const data = await createPostit(creator_id, community_id, html_url, position_x, position_y, size_width, size_height);

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