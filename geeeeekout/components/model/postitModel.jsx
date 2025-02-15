"use server";

import pool from '@/lib/db';

export async function getAllPostits() {

    const QUERY = `
    SELECT (p.postit_id, u.username, p.community_id, p.html_url, p.css_url, p.js_url, p.position_x, p.position_y, p.size_width, p.size_height) FROM postit as p
    INNER JOIN user as u on p.creator_id = u.user_id;
    `;

    try {
        const [rows] = await pool.query(QUERY);
        return {results: rows};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function createPostit(creator_id, community_id, html_url, css_url, js_url, position_x, position_y, size_width, size_height) {

    const QUERY = `
    INSERT INTO postit (creator_id, community_id, html_url, css_url, js_url, position_x, position_y, size_width, size_height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const VALUES = [creator_id, community_id, html_url, css_url, js_url, position_x, position_y, size_width, size_height];

    try {
        const response = await pool.query(QUERY, VALUES);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function getPostitById(id) {

    const QUERY = `
    SELECT (p.postit_id, u.username, p.community_id, p.html_url, p.css_url, p.js_url, p.position_x, p.position_y, p.size_width, p.size_height) FROM postit as p
    INNER JOIN user as u on p.creator_id = u.user_id
    WHERE p.postit_id = ?;
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

export async function getPostitByCommunityId(id) {

    const QUERY = `
    SELECT (p.postit_id, u.username, p.community_id, p.html_url, p.css_url, p.js_url, p.position_x, p.position_y, p.size_width, p.size_height) FROM postit as p
    INNER JOIN user as u on p.creator_id = u.user_id
    WHERE p.community_id = ?
    ORDER BY p.date_created DESC;
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