import React from 'react'

import Comboard from '@/components/comboard';

import { useEffect, useState } from 'react';

import { DownloadFile } from '@/lib/download';

export default function ComboardWrapper({boards, hover}) {

    // get the html data
    async function getHTML(url) {
        const data = await DownloadFile(url, 'FILES');
        return data
    }

    async function insertHTMLDataToBoards() {
        const newBoards = await Promise.all(boards.map(async function(b) {
            const html = await getHTML(b.html_url);

            return {
                ...b,
                html,
            }
        }));

        return newBoards;
    }

    const [renderedBoards, setRenderedBoards] = useState([]);

    useEffect(() => {
        insertHTMLDataToBoards().then((newBoards) => {
            setRenderedBoards(newBoards);
        });
    }, [boards]);

    return <>
        <Comboard boards={renderedBoards} hover={hover}/>
    </>
}