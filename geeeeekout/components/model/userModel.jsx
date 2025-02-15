"use server";

import pool from '@/lib/db';

export async function getAllUsers() {
    try {
        const [rows] = await pool.query('SELECT (user_id, username, image_url) FROM users');
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createUser(username, password) {
    try {
        const response = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getUserById(id) {
    try {
        const [rows] = await pool.query('SELECT (user_id, username, image_url) FROM users WHERE user_id = ?', [id]);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getUserByUsername(username) {
    try {
        const [rows] = await pool.query('SELECT (user_id, username, image_url) FROM users WHERE username = ?', [username]);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}