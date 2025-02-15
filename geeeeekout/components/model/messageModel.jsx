"use server";

import pool from '@/lib/db';

export async function getAllMessages() {

    const QUERY = `
    SELECT m.message_id, m.content, u.username, m.thread_id, m.date_created FROM message AS m
    INNER JOIN user AS u ON m.creator_id = u.user_id;
    `;

    try {
        const [rows] = await pool.query(QUERY);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createMessage(content, creator_id, thread_id) {

    const QUERY = `
    INSERT INTO message (content, creator_id, thread_id) VALUES (?, ?, ?)
    `;

    const VALUES = [content, creator_id, thread_id];

    try {
        const response = await pool.query(QUERY, VALUES);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getMessageById(id) {

    const QUERY = `
    SELECT m.message_id, m.content, u.username, m.thread_id, m.date_created FROM message AS m
    INNER JOIN user AS u ON m.creator_id = u.user_id
    WHERE m.message_id = ?;
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getMessagesByThreadId(thread_id) {

    const QUERY = `
    SELECT m.message_id, m.content, u.username, m.thread_id, m.date_created FROM message AS m
    INNER JOIN user AS u ON m.creator_id = u.user_id
    WHERE m.thread_id = ?
    ORDER BY m.date_created DESC;
    `;

    const VALUES = [thread_id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}