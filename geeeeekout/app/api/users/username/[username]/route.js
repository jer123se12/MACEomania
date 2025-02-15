"use server";

import { getUserByUsername } from '@/components/model/userModel';

export async function GET(req, { params }) {

    const { username } = await params
    
    const data = await getUserByUsername(username);

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