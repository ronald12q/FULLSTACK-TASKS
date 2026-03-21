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

    const postUser = async ({username, email, password}:UserCreateProps): Promise<boolean> => {
        
        try {
            setError(null);
            setLoading(true);

            const res = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        });

        if(!res.ok) throw new Error('something get wrong meanwhile tried to connect');

        const response = await res.json();
        getUser({
            name: response.user.username,
            email: response.user.email,
            token: response.token,
        });
        return true;


            
        } catch (error) {
            setError('something get wrong with the request');
            return false;
            
        }finally{
            setLoading(false);
        }


    }

    return {loading, error, postUser};          


}