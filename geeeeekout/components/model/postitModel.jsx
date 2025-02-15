"use server";

import pool from '@/lib/db';

export async function getAllPostits() {
    try {
        const [rows] = await pool.query('SELECT * FROM postit');
        return {results: rows};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function createPostit(creator_id, community_id, html_url, css_url, js_url, position_x, position_y, size_width, size_height) {
    try {
        const response = await pool.query('INSERT INTO postit (creator_id, community_id, html_url, css_url, js_url, position_x, position_y, size_width, size_height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [creator_id, community_id, html_url, css_url, js_url, position_x, position_y, size_width, size_height]);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function getPostitById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM postit WHERE postit_id = ?', [id]);
        return {results: rows};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function getPostitByCommunityId(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM postit WHERE community_id = ? ORDER BY date_created DESC', [id]);
        return {results: rows};
    }
    catch (error) {
        return {error: error.message};
    }
}