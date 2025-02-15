'use server';

import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const BucketList = {
    PROFILE: process.env.PROFILE_BUCKET,
    COMMUNITY: process.env.COMMUNITY_BUCKET,
    FILES: process.env.FILES_BUCKET,
};

export async function DownloadFile(url, bucket) {
    try {
        const FILENAME = url.split('/').pop();

        if (!BucketList[bucket]) throw new Error('Invalid bucket name');

        const storage = new Storage({});

        const bucket = storage.bucket(BucketList[bucket]);
        const file = bucket.file(FILENAME);

        const [data] = await file.download();

        const buffer = Buffer.from(data);

        return buffer;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}