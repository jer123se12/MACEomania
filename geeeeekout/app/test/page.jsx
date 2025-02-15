"use client";

import { useEffect, useState } from 'react';

export default function Page() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        fetch('/api/users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                userPw: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    );
}