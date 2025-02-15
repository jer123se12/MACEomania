"use server";

import pool from '@/lib/db';
import async from './../../app/components/api/getUsers';

export async function getAllCommunities() {

    const QUERY = `
    SELECT c.community_id, c.name, c.description, u.username, c.bulletin_postit_limit, c.image_url FROM community AS c
    INNER JOIN user AS u ON c.owner_id = u.user_id;
    `;

    try {
        const [rows] = await pool.query(QUERY);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function createCommunity(name, description, owner_id, image_url) {

    const QUERY = `
    INSERT INTO community (name, description, owner_id, image_url) VALUES (?, ?, ?, ?)
    `;

    const VALUES = [name, description, owner_id, image_url];

    try {
        const response = await pool.query(QUERY, VALUES);
        const inserted_id = response[0].insertId;
        return {results: inserted_id};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getCommunityById(id) {

    const QUERY = `
    SELECT c.community_id, c.name, c.description, u.username, c.bulletin_postit_limit, c.image_url FROM community AS c
    INNER JOIN user AS u ON c.owner_id = u.user_id
    WHERE c.community_id = ?;
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getCommunityImageById(id) {

    const QUERY = `
    SELECT image_url FROM community
    WHERE community_id = ?
    `;

    const VALUES = [id];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows[0].image_url};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function updateCommunityImageById(id, image_url) {

    const QUERY = `
    UPDATE community
    SET image_url = ?
    WHERE community_id = ?
    `;

    const VALUES = [image_url, id];

    try {
        const response = await pool.query(QUERY, VALUES);
        return {results: response[0].changedRows};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function getCommunityByName(name) {

    const QUERY = `
    SELECT c.community_id, c.name, c.description, u.username, c.bulletin_postit_limit, c.image_url FROM community AS c
    INNER JOIN user AS u ON c.owner_id = u.user_id
    WHERE c.name = ?;
    `;

    const VALUES = [name];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows};
    } catch (error) {
        return {error: error.message};
    }
}

export async function getCommunityImageByName(name) {

    const QUERY = `
    SELECT image_url FROM community
    WHERE name = ?
    `;

    const VALUES = [name];

    try {
        const [rows] = await pool.query(QUERY, VALUES);
        return {results: rows[0].image_url};
    }
    catch (error) {
        return {error: error.message};
    }
}

export async function updateCommunityImageByName(name, image_url) {
    
    const QUERY = `
    UPDATE community
    SET image_url = ?
    WHERE name = ?
    `;

    const VALUES = [image_url, name];

    try {
        const response = await pool.query(QUERY, VALUES);
        return {results: response[0].changedRows};
    }
    catch (error) {
        return {error: error.message};
    }
}


