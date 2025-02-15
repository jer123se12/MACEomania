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

        const storage = new Storage();

        console.log(BucketList[bucket]);
        console.log(FILENAME);

        const stream = storage.bucket(BucketList[bucket]).file(FILENAME).createReadStream();

        let data = '';
        for await (const chunk of stream) {
            data += chunk;
        }

        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}