'use server';

import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const BucketList = {
    PROFILE: process.env.PROFILE_BUCKET,
    COMMUNITY: process.env.COMMUNITY_BUCKET,
    FILES: process.env.FILES_BUCKET,
};

export async function UploadFile(form, bucket) {
    try {
        const file = form.get('file');

        if (!BucketList[bucket]) throw new Error('Invalid bucket name');

        // Check if file exists and is not empty
        if (!file) throw new Error('No file found in form data');
        if (file.size < 1) throw new Error('File is empty');

        const buffer = await file.arrayBuffer();
        const storage = new Storage({});
        await storage.bucket(BucketList[bucket]).file(file.name).save(Buffer.from(buffer));


        // Replace spaces with %
        const fileName = file.name.replace(/ /g, '%20');

        const URL = `https://storage.googleapis.com/${BucketList[bucket]}/${fileName}`;

        return { results: URL };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}



