'use client'
import { useToast } from "@/hooks/use-toast"

import AceEditor from "react-ace";
import { useEffect, useState, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
export default function createIt({params}) {
    const {toast}=useToast()

    const [community, setCommunity] = useState("");
    const [html, setHtml] = useState("");
    const [css, setcss] = useState("");
    const [js, setjs] = useState("");
    const [src, setsrc] = useState("");
    const [x, setx] = useState(0);
    const [y, sety] = useState(0);
    const [width, setwidth] = useState(0);
    const [height, setheight] = useState(0);
    let submit = () => {
        console.log(src)

        fetch('/api/community/' + community).then((res) => res.json()).then((data) => {
            let community_id = data[0].community_id;

        fetch('/api/postit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    creator_id: 1,
                    community_id: community_id,
                    html_url: "",
                    css_url: "",
                    js_url: "",
                    position_x: x,
                    position_y: y,
                    size_width: width,
                    size_height: height

                }),
            }).then((res) => res.text()).then((data) => {
                fetch('/api/postit/'+data+'/files/html',{
                    method:"PUT",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        data:src
                    })
            }).then((res)=>res.text()).then((data)=>{
                console.log(data)
                toast({title:"PostIt Created",description:"PostIt Created"})
            });
        });})
    }
    function changex(e){
        if (e.target.value<1024 && e.target.value>0){
            setx(e.target.value)
        }
        else{
            toast({title:"invalid number",description:"x must be between 0 and 1024"})
        }
    }
    function changey(e){
        if (e.target.value<1024 && e.target.value>0){
            sety(e.target.value)
        }
        else{
            toast({title:"invalid number",description:"x must be between 0 and 1024"})
        }
    }
    function changewidth(e){
        if (e.target.value>0&&e.target.value*height<26000){
            setwidth(e.target.value)
        }
        else{
            toast({title:"invalid number",description:"total size must be be below 26000 pixels"})
        }
    }
    function changeheight(e){
        if (e.target.value>0&&e.target.value*width<26000){
            setheight(e.target.value)
        }
        else{
            toast({title:"invalid number",description:"total size must be be below 26000 pixels"})
        }
    }
    useEffect(() => {
        params.then((params) => {
            setCommunity(params.name);
        });
    },[])
    useEffect(() => {
        setsrc( `
        <html>
        <head>
        <style>
        ${css}
        </style>
        </head>
        <body>
        ${html}
        <script>
        ${js}
        </script>
        </body>
        </html>
        `)
    }, [html, css, js]);
    return <>
        <div className="w-full h-full flex justify-center items-center">
            <Card className="w-3/4 h-full flex flex-col gap-4">
                <CardHeader>
                    <CardTitle>Create a PostIt</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Html</p>
                    <AceEditor
                        mode="xml"
                        theme="github"
                        onChange={setHtml}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true
                          }}
                        width="600px"
                        height="400px"
                    />
                    <p>CSS</p>
                    <AceEditor
                        mode="css"
                        theme="github"
                        onChange={setcss}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true
                          }}
                        width="600px"
                        height="400px"
                    />
                    <p>Javascript</p>
                    <AceEditor
                        mode="javascript"
                        theme="github"
                        onChange={setjs}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true
                          }}
                        width="600px"
                        height="400px"
                    />
                    <p>position and size</p>
                    <div className="flex gap-4">
                    <Input type="number" placeholder="x" onChange={changex}/>
                    <Input type="number" placeholder="y"onChange={changey}/>
                    </div>
                    <div className="flex gap-4">
                    <Input type="number" placeholder="width"onChange={changewidth}/>
                    <Input type="number" placeholder="height"onChange={changeheight}/>
                    </div>
                    <p>Preview</p>
                    <iframe srcDoc={src} className={"border-black border-2"} width={width+"px"} height={height+"px"}></iframe>
                    <Button onClick={submit}>Submit</Button>
                </CardContent>
            </Card>
        </div>
    </>
}