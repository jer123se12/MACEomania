import React from 'react'

import html2canvas from 'html2canvas';
import { UploadFile } from '@/lib/upload';

export default function Comboard({boards, hover}) {

    // get the html datax   
    const renderedBoards= boards.map(function(b) {
        
        const hoverS=hover===b.postit_id?"solid 5px red.":"";
        // setCounter(counter+1);
        return <iframe 
            key={b.postit_id}
            srcDoc={b.html}
            width={b.size_width}
            height={b.size_height}
            style={{ left: b.position_x - (hover==b.postit_id ? 4 : 0) + "px", top: b.position_y -(hover==b.postit_id ? 4 : 0)+ "px", border: hoverS ,zIndex:b.upvotes}}
            className={`absolute ${hover===b.postit_id?"border-4 border-blue-500":""} z-${b.upvotes}`}
            ></iframe>;
    });

    // check if renderboards is mapped finished
    if (renderedBoards.length === boards.length) {
        let screenshot = localStorage.getItem("screenshot");
        if (screenshot) {
            html2canvas(document.getElementById("capture")).then(function(canvas) {
                
                canvas.toBlob(function(blob) {
                    const file = new File([blob], "comboard.png", {type: "image/png"});
                    UploadFile(file);
                });
            });
            localStorage.removeItem("screenshot");
        }
    }

    return <>
        <div className={"w-[1024px] grow-0 shrink-0 h-[768px] bg-gray-100 bg-stone-100 overflow-hidden relative"} id="capture">
            {renderedBoards}
        </div>
    </>
}
