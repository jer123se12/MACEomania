'use server';

import {incrementPostitUpvotesById} from '@/components/model/postitModel';

export async function PUT(req) {

    const { id } = req.query;

    console.log("id", id);

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