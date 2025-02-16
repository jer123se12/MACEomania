"use server";

import pool from '@/lib/db';

export async function getAllUsers() {

    const QUERY = `
    SELECT user_id, username, image_url FROM user
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
    INSERT INTO user (username, password) VALUES (?, ?)
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
    SELECT user_id, username, image_url FROM user
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
    SELECT user_id, username, image_url FROM user
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

export async function getUserByUsernamePassword(username, password) {

    const QUERY = `
    SELECT user_id, username, image_url FROM user
    WHERE username = ? AND password = ?
    `;

    const VALUES = [username, password];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function updateUserById(id, username, password, image_url) {

    const QUERY = `
    UPDATE user SET username = ?, password = ?, image_url = ? 
    WHERE user_id = ?
    `;

    const VALUES = [username, password, image_url, id];

    try {
        const response = await pool.query(QUERY, VALUES);
        return {results: response};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getUserProfileImageById(id) {

    const QUERY = `
    SELECT image_url FROM user
    WHERE user_id = ?
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function updateUserProfileImageById(id, image_url) {

    const QUERY = `
    UPDATE user SET image_url = ? 
    WHERE user_id = ?
    `;

    const VALUES = [image_url, id];

    try {
        const response = await pool.query(QUERY, VALUES);
        return {results: response};
    }
    catch (error) {
        return {error: error.message};
    }
}