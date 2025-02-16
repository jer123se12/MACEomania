import React from 'react'

import Comboard from '@/components/comboard';

import { useEffect, useState } from 'react';

import { DownloadFile } from '@/lib/download';

export default function ComboardWrapper({boards, hover, insertedBoard=null}) {

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
        if (insertedBoard) {
            setRenderedBoards([insertedBoard])
        }
    }, []);   

    useEffect(() => {
        insertHTMLDataToBoards().then((newBoards) => {
        if (insertedBoard) {
            setRenderedBoards([...newBoards, insertedBoard]);
        }else{
            setRenderedBoards(newBoards);
        }
        });
    }, [boards,insertedBoard]);

    return <>
        <Comboard boards={renderedBoards} hover={hover}/>
    </>
}