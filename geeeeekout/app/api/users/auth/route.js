"use server";

import { getUserByUsername} from '@/components/model/userModel';

export async function POST(req) {
    
        const body = await req.json();
    
        const { username, userPw } = body;
    
        const data = await getUserByUsername(username);

        
        
        if (data.error) {
            return new Response(JSON.stringify(data), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const password = data.results[0].password;

        if (password != userPw) {
            return new Response(JSON.stringify({error: "Password does not match"}), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify({ results: "Success"}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
}