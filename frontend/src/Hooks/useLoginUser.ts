import { useState } from "react"
import { AuthUser } from "../ZustandUtilities/authStore"

interface LoginProps {
    email: String,
    password: String
}

export const LoginUser = () => {

    const [loadingLogin, SetLoadingLogin ] = useState<boolean>(false);
    const [errorLogin, SetErrorLogin] = useState<string | null>(null);
    const {getUser} = AuthUser();

    const loginPost = async({email, password}:LoginProps) => {
        try {

            SetLoadingLogin(true);
            const res = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            if(!res.ok) throw new Error('somtheing went wrong with the request');
            const dataLogin = await res.json();
            getUser(dataLogin);
            

            
        } catch (error) {
            SetErrorLogin('something was wrong during the request')
            
        }finally{
            SetLoadingLogin(false);

        }

    }

    return {loadingLogin, errorLogin, loginPost};


}