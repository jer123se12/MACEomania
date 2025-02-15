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
        
        const TIMESTAMP = new Date().getTime();
        const SALT = Math.random().toString(36).substring(2, 15);
        const fileName = `${TIMESTAMP}-${SALT}`;

        await storage.bucket(BucketList[bucket]).file(fileName).save(Buffer.from(buffer));

        const URL = `https://storage.googleapis.com/${BucketList[bucket]}/${fileName}`;

        return { results: URL };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}



