"use server";

import pool from '@/lib/db';

export async function getAllCommunities() {

    const QUERY = `
    SELECT c.community_id, c.name, u.username, c.bulletin_postit_limit, c.image_url FROM community AS c
    INNER JOIN user AS u ON c.owner_id = u.user_id;
    `;

    try {
        const [rows] = await pool.query(QUERY);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createCommunity(name, owner_id, image_url) {

    const QUERY = `
    INSERT INTO community (name, owner_id, image_url) VALUES (?, ?, ?);
    `;

    const VALUES = [name, owner_id, image_url];

    try {
        const response = await pool.query(QUERY, VALUES);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getCommunityById(id) {

    const QUERY = `
    SELECT c.community_id, c.name, u.username, c.bulletin_postit_limit, c.image_url FROM community AS c
    INNER JOIN user AS u ON c.owner_id = u.user_id
    WHERE c.community_id = ?;
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}