"use server";

import { getUserByUsernamePassword} from '@/components/model/userModel';

export async function POST(req) {
    
        const body = await req.json();
    
        const { username, userPw } = body;

        console.log(username, userPw);
    
        const data = await getUserByUsernamePassword(username, userPw);

        if (data.error) {
            return new Response(JSON.stringify(data), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        if (data.results.length === 0) {
            return new Response(JSON.stringify({error: "Password does not match"}), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify(data.results), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
}