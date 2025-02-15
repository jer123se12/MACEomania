"use client";

import { useEffect, useState } from 'react';

export default function Page() {

    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            owner_id: 1,
            name: name
        }

        const response = await fetch('/api/community', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        console.log(data);
    }

    
    return (
        <div>
            <h1>Create Community</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    );
}