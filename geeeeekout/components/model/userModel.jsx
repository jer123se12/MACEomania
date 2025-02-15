"use server";

import pool from '@/lib/db';

export async function getAllUsers() {

    const QUERY = `
    SELECT (user_id, username, image_url) FROM users
    `;

    try {
        const [rows] = await pool.query(QUERY);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createUser(username, password) {

    const QUERY = `
    INSERT INTO users (username, password) VALUES (?, ?)
    `;

    const VALUES = [username, password];

    try {
        const response = await pool.query(QUERY, VALUES);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getUserById(id) {

    const QUERY = `
    SELECT (user_id, username, image_url) FROM users 
    WHERE user_id = ?
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getUserByUsername(username) {

    const QUERY = `
    SELECT (user_id, username, image_url) FROM users 
    WHERE username = ?
    `;

    const VALUES = [username];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}