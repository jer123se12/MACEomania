"use client";

import { useEffect, useState } from 'react';
import ComboardWrapper from '@/components/comboardWrapper';

export default function Page() {

    const [postits, setPostits] = useState([]);

    useEffect(() => {
        const getPostits = async () => {
            const response = await fetch('/api/community/MaCE/postits');
            const data = await response.json()
            setPostits(data);
        }
        getPostits();
    }, []);
    

    return (
        <>
            <h1>IFRAME</h1>
            <ComboardWrapper boards={postits} hover={0}/>
        </>
    )
}