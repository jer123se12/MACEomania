"use server";

import { getThreadsByCommunityName } from '@/components/model/threadModel';

export async function GET(req, { params }) {

    const { name } = await params;

    const data = await getThreadsByCommunityName(name);

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