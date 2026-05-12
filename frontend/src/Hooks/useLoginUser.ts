import { useState } from "react"
import { AuthUser } from "../ZustandUtilities/authStore"
import { API_URL } from "../apiUrl"

interface LoginProps {
    email: string,
    password: string
}

export const LoginUser = () => {

    const [loadingLogin, SetLoadingLogin ] = useState<boolean>(false);
    const [errorLogin, SetErrorLogin] = useState<string | null>(null);
    const {getUser} = AuthUser();

    const loginPost = async({email, password}:LoginProps): Promise<boolean> => {
        try {
            SetErrorLogin(null);

            SetLoadingLogin(true);
            const res = await fetch(`${API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            if(!res.ok) throw new Error('somtheing went wrong with the request');
            const dataLogin = await res.json();
            getUser({
                name: dataLogin.user.username,
                email: dataLogin.user.email,
                token: dataLogin.token,
            });
            return true;
            

            
        } catch (error) {
            SetErrorLogin('something was wrong during the request');
            return false;
            
        }finally{
            SetLoadingLogin(false);

        }

    }

    return {loadingLogin, errorLogin, loginPost};


}