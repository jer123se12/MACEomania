"use server";

import pool from '@/lib/db';

export async function getAllFollows() {

    const QUERY = `
    SELECT f.follow_id, u.username, c.name, c.image_url FROM follow AS f
    INNER JOIN user AS u ON f.user_id = u.user_id
    INNER JOIN community AS c ON f.community_id = c.community_id
    `;

    try {
        const [rows] = await pool.query(QUERY);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createFollow(user_id, community_id) {

    const QUERY = `
    INSERT INTO follow (user_id, community_id) VALUES (?, ?)
    `;

    const VALUES = [user_id, community_id];

    try {
        const response = await pool.query(QUERY, VALUES);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getFollowById(id) {

    const QUERY = `
    SELECT f.follow_id, u.username, c.name, c.image_url FROM follow AS f
    INNER JOIN user AS u ON f.user_id = u.user_id
    INNER JOIN community AS c ON f.community_id = c.community_id
    WHERE f.follow_id = ?
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getFollowsByUserId(user_id) {

    const QUERY = `
    SELECT f.follow_id, u.username, c.name, c.description, c.image_url, fc.follower_count FROM follow AS f
    INNER JOIN user AS u ON f.user_id = u.user_id
    INNER JOIN community AS c ON f.community_id = c.community_id
    LEFT JOIN (
		SELECT community_id, COUNT(*) as follower_count
        FROM follow
        GROUP BY community_id
	) AS fc on c.community_id = fc.community_id
    WHERE f.user_id = 1
    `;

    const VALUES = [user_id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getFollowsByCommunityId(community_id) {

    const QUERY = `
    SELECT f.follow_id, u.username, c.name, c.image_url FROM follow AS f
    INNER JOIN user AS u ON f.user_id = u.user_id
    INNER JOIN community AS c ON f.community_id = c.community_id
    WHERE f.community_id = ?
    `;

    const VALUES = [community_id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}