"use server";

import pool from '@/lib/db';

export async function getAllCommunities() {
    try {
        const [rows] = await pool.query('SELECT * FROM community');
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createCommunity(name, owner_id) {
    try {
        const response = await pool.query('INSERT INTO community (name, owner_id) VALUES (?, ?)', [name, owner_id]);  
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getCommunityById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM community WHERE community_id = ?', [id]);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}