"use server";

import { createCommunity, getAllCommunities } from '@/components/model/communityModel';

export async function GET() {

    const data = await getAllCommunities();

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


    const { name, description, owner_id, image_url } = body;

    const data = await createCommunity(name, description, owner_id, image_url);

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