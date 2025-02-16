'use server';

import { getFollowByUserIdCommunityId, deleteFollowByUserIdCommunityId } from '@/components/model/followModel';

export async function GET(req, { params }) {
        
    const { id, community_id } = await params;

    console.log("id", id);
    console.log("community_id", community_id);

    const data = await getFollowByUserIdCommunityId(id, community_id);

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

export async function DELETE(req, { params }) {
    const { id, community_id } = await params;

    const data = await deleteFollowByUserIdCommunityId(id, community_id);

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