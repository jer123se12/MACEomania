import React from 'react'

export default function Comboard({boards, hover}) {

    // get the html data

    const renderedBoards= boards.map(function(b) {
        
        const hoverS=hover===b.postit_id?"solid 5px red.":"";
        return <iframe 
            key={b.postit_id}
            srcDoc={b.html}
            width={b.size_width}
            height={b.size_height}
            style={{ left: b.position_x - (hover==b.postit_id ? 4 : 0) + "px", top: b.position_y -(hover==b.postit_id ? 4 : 0)+ "px", border: hoverS ,zIndex:b.upvotes}}
            className={`absolute ${hover===b.postit_id?"border-4 border-blue-500":""} z-${b.upvotes}`}
            ></iframe>;
    });
    return <>
        <div className={"w-[1024px] grow-0 shrink-0 h-[768px] bg-gray-100 bg-stone-100 overflow-hidden"}>
            {renderedBoards}
        </div>
    </>
}
