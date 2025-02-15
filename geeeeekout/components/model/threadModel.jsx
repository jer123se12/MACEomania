"use server";

import pool from "@/lib/db";

export async function getAllThreads() {
    try {
        const [rows] = await pool.query('SELECT * FROM threads');
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createThread(title, content, creator_id, community_id) {
    try {
        const response = await pool.query('INSERT INTO threads (title, content, creator_id, community_id) VALUES (?, ?, ?, ?)', [title, content, creator_id, community_id]);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getThreadById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM threads WHERE thread_id = ?', [id]);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}
