"use server";

import pool from '@/lib/db';

export async function getAllMessages() {
    try {
        const [rows] = await pool.query('SELECT * FROM message');
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createMessage(content, creator_id, thread_id) {
    try {
        const response = await pool.query('INSERT INTO message (content, creator_id, thread_id) VALUES (?, ?, ?)', [content, creator_id, thread_id]);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getMessageById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM message WHERE message_id = ?', [id]);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getMessagesByThreadId(thread_id) {
    try {
        const [rows] = await pool.query('SELECT * FROM message WHERE thread_id = ? ORDER BY date_created DESC', [thread_id]);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}