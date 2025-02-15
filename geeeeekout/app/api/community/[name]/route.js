"use server";

import { getCommunityByName } from '@/components/model/communityModel';

export async function GET(req, { params }) {
    
    const { name } = await params;

    const data = await getCommunityByName(name);

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
