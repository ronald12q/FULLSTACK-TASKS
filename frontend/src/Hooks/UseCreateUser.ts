import { useState } from "react"
import { AuthUser } from "../ZustandUtilities/authStore"





interface UserCreateProps {
    username: string,
    email: string, 
    password: string
}

export const CreateUser = () => {


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {getUser} = AuthUser();

    const postUser = async ({username, email, password}:UserCreateProps): Promise<string | null> => {
        
        try {
            setError(null);
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        });

        const response = await res.json();
        if(!res.ok) {
            const msg = response.message || 'something went wrong';
            setError(msg);
            return msg;
        }

        getUser({
            name: response.user.username,
            email: response.user.email,
            token: response.token,
        });
        return null;

        } catch (error) {
            const msg = 'something get wrong with the request';
            setError(msg);
            return msg;

        }finally{
            setLoading(false);
        }


    }

    return {loading, error, postUser};          


}