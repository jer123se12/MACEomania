import React from 'react'

export default function Comboard({boards, hover}) {

    // get the html data

    const renderedBoards= boards.map(function(b) {
        
        const sourceD=b.html_url+"<style>"+b.css_url+"</style>"+"<script>"+b.js_url+"</script>";
        const hoverS=hover===b.id?"solid 5px red.":"";
        return <iframe 
            key={b.id}
            srcDoc={sourceD}
            width={b.width}
            height={b.height}
            style={{ left: b.pos.x - (hover==b.id ? 4 : 0) + "px", top: b.pos.y -(hover==b.id ? 4 : 0)+ "px", border: hoverS ,zIndex:b.upvotes}}
            className={`absolute ${hover===b.id?"border-4 border-blue-500":""} z-${b.upvotes}`}
            ></iframe>;
    });
    return <>
        <div className={"w-[1024px] grow-0 shrink-0 h-[768px] bg-gray-100 bg-stone-100 overflow-hidden"}>
            {renderedBoards}
        </div>
    </>
}
