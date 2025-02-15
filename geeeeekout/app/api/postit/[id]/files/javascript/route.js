"use server";

import { getPostitJSById, updatePostitJSById } from '@/components/model/postitModel';
import { UploadFile } from '@/lib/upload';

export async function GET(req, { params }) {

    const { id } = await params;

    const data = await getPostitJSById(id);

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

    const body = await req.json();


    const blob = new Blob([body.data], { type: 'application/javascript' });

    const fileName = `${id}.js`;

    const file = new File([blob], fileName, { type: 'application/javascript' });

    const form = new FormData();
    form.append('file', file);

    const data = await UploadFile(form, 'FILES');

    if (data.error) {
        return new Response(JSON.stringify(data), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const URL = data.results;

    const update = await updatePostitJSById(id, URL);

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