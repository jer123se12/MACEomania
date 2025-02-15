'use server';

import { getUserProfileImageById, updateUserProfileImageById } from '@/components/model/userModel';
import { UploadFile } from '@/lib/upload';

export async function GET(req, { params }) {

    const { id } = await params;

    const data = await getUserProfileImageById(id);

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
    const data = await UploadFile(form, 'PROFILE');

    if (data.error) {
        return new Response(JSON.stringify(data), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const URL = data.results;

    const update = await updateUserProfileImageById(id, URL);

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