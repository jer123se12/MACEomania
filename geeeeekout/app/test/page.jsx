"use client";

import { useEffect, useState } from 'react';

export default function Page() {

    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        const fileData = e.target.file.files[0];
        const TIMESTAMP = new Date().getTime();
        const SALT = Math.random().toString(36).substring(2, 15);
        const fileName = `${TIMESTAMP}-${SALT}`;

        formData.append('file', fileData, fileName);

        const response = await fetch('/api/users/1/profile-image', {
            method: 'PUT',
            body: formData
        });

        const data = await response.json();
        
        if (data[0].changedRows > 0) {
            alert('Profile image updated!');
        }
    }

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch('/api/users/1/profile-image');
            const data = await response.json();
            
            const URL = data[0].image_url;
            console.log(URL);
            setImage(URL);
        }
        const fetchUser = async () => {
            const response = await fetch('/api/users/1');
            const data = await response.json();
            console.log(data);
            setUsername(data[0].username);
        }
        fetchImage();
        fetchUser();
    }, []);

    return (
        <>
            <h1>Update Profile Page</h1>
            <p>Username: {username}</p>
            {image && <img src={image} alt="profile image" />}
            
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" />
                <button type="submit">Update Profile Image</button>
            </form>
        </>
    )
}