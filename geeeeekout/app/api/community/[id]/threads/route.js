"use server";

import { getThreadsByCommunityId } from '@/components/model/threadModel';

export async function GET(req, { params }) {

    const { id } = await params;

    const data = await getThreadsByCommunityId(id);

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