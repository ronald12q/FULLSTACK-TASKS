import { useState } from "react"
import { AuthUser } from "../ZustandUtilities/authStore"


interface LoginProps {
    email: string,
    password: string
}

export const LoginUser = () => {

    const [loadingLogin, SetLoadingLogin ] = useState<boolean>(false);
    const [errorLogin, SetErrorLogin] = useState<string | null>(null);
    const {getUser} = AuthUser();

    const loginPost = async({email, password}:LoginProps): Promise<string | null> => {
        try {
            SetErrorLogin(null);

            SetLoadingLogin(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            const dataLogin = await res.json();
            if(!res.ok) {
                const msg = dataLogin.message || 'something went wrong';
                SetErrorLogin(msg);
                return msg;
            }
            getUser({
                name: dataLogin.user.username,
                email: dataLogin.user.email,
                token: dataLogin.token,
            });
            return null;

        } catch (error) {
            const msg = 'something was wrong during the request';
            SetErrorLogin(msg);
            return msg;

        }finally{
            SetLoadingLogin(false);

        }

    }

    return {loadingLogin, errorLogin, loginPost};


}