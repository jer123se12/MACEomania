'use server';

import {incrementPostitUpvotesById} from '@/model/postitModel';

export async function incrementPostitUpvotes(req, { param }) {

    const { id } = await param;

    const response = await incrementPostitUpvotesById(id);

    if (response.error) {
        return new Response(JSON.stringify(response), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    return new Response(JSON.stringify(response.results), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}