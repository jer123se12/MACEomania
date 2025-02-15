'use server';

import { getCommunityImageById, updateCommunityImageById } from '@/components/model/communityModel';
import { UploadFile } from '@/lib/upload';

export async function GET(req, { params }) {

    const { id } = await params;

    const data = await getCommunityImageById(id);

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

export async function PUT(req, { params }) {

    const { id } = await params;

    // image file from request body
    const form = await req.formData();
    const data = await UploadFile(form, 'COMMUNITY');

    if (data.error) {
        return new Response(JSON.stringify(data), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const URL = data.results;

    const update = await updateCommunityImageById(id, URL);

    if (update.error) {
        return new Response(JSON.stringify(update), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(update.results), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}