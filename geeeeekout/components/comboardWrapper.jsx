import React from 'react'

import Comboard from '@/components/comboard';

export default async function ComboardWrapper({boards, hover}) {

    // get the html data
    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];

        console.log(board);

        const data = await fetch(board.html_url);
        console.log(data);
    }

    console.log(boards);


    return <Comboard boards={boards} hover={hover}/>
}