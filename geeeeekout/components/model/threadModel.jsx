"use server";

import pool from "@/lib/db";

export async function getAllThreads() {

    const QUERY = `
    SELECT t.thread_id, t.title, t.content, u.username, t.date_created FROM thread as t
    INNER JOIN user as u on t.creator_id = u.user_id;
    `;

    try {
        const [rows] = await pool.query(QUERY);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createThread(title, content, creator_id, community_id) {

    const QUERY = `
    INSERT INTO thread (title, content, creator_id, community_id) VALUES (?, ?, ?, ?)
    `;

    const VALUES = [title, content, creator_id, community_id];

    try {
        const response = await pool.query(QUERY, VALUES);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getThreadById(id) {

    const QUERY = `
    SELECT t.thread_id, t.title, t.content, u.username, t.date_created FROM thread as t
    INNER JOIN user as u on t.creator_id = u.user_id
    WHERE t.thread_id = ?
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getThreadsByCommunityId(community_id) {

    const QUERY = `
    SELECT t.thread_id, t.title, t.content, u.username, t.date_created FROM thread as t
    INNER JOIN user as u on t.creator_id = u.user_id
    WHERE t.community_id = ?
    ORDER BY t.date_created DESC
    `;

    const VALUES = [community_id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getThreadsByCommunityName(community_name) {

    const QUERY = `
    SELECT t.thread_id, t.title, t.content, u.username, t.date_created FROM thread as t
    INNER JOIN user as u on t.creator_id = u.user_id
    INNER JOIN community as c on t.community_id = c.community_id
    WHERE c.name = ?
    ORDER BY t.date_created DESC
    `;

    const VALUES = [community_name];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}