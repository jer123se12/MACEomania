"use client";

import { useEffect, useState } from 'react';

export default function Page() {

    const [javascript, setJavascript] = useState('');
    const [css, setCss] = useState('');
    const [html, setHtml] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            data: javascript
        }

        const response = await fetch('/api/postit/1/files/javascript', {
            method: 'PUT',
            body: JSON.stringify(body)
        });

        console.log(response);

        const body2 = {
            data: css
        }

        const response2 = await fetch('/api/postit/1/files/css', {
            method: 'PUT',
            body: JSON.stringify(body2)
        });

        console.log(response2);

        const body3 = {
            data: html
        }

        const response3 = await fetch('/api/postit/1/files/html', {
            method: 'PUT',
            body: JSON.stringify(body3)
        });

        console.log(response3);
    }

    return (
        <>
            <h1>Type JS</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={javascript}
                    onChange={(e) => setJavascript(e.target.value)}
                />
                <textarea
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                />
                <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}