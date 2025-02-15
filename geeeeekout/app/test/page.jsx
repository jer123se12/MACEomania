"use client";

import { useEffect, useState } from 'react';

export default function Page() {

    const [javascript, setJavascript] = useState('');
    const [css, setCss] = useState('');
    const [html, setHtml] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const combined = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
            <script>${javascript}</script>
        </head>
        <body>
            ${html}
        </body>
        </html>`;

        const file = {
            data: combined,
        }

        const response = await fetch('/api/postit/1/files/html', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(file),
        });

        const data = await response.json();
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