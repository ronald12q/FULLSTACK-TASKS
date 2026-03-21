import { useState } from "react"
import { LoginUser } from "../Hooks/useLoginUser"


interface login {
    email: string,
    password: string

}

interface loginProps {
    onSuccess: () => void,
    onSwitchRegister: () => void

} 

export const LoginForm = ({onSuccess, onSwitchRegister}: loginProps) => {

    const {loadingLogin, errorLogin, loginPost} = LoginUser();

    const [loginData, setLoginData] = useState<login> ({
        email: '',
        password: ''
    });
    const [errorFrontend, setErrorFrontend] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);



    const loginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!loginData.email || !loginData.password) {
            setErrorFrontend('all places has to be fill');
            return;
        }

        if(!loginData.email.includes('@')){
            setErrorFrontend('email format is not correct ')
        }

        await loginPost(loginData);
        setLoginData({email: '',  password: ''})
        onSuccess();

    }

    const getLoginData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [event.target.name]: event.target.value})

    }




    return (
        <div>
            <h1>login</h1>
            <form action="submit">
                <input type="text" placeholder="email" name="email" value={loginData.email} onChange={getLoginData} />
                <input type={showPassword ? 'text' : 'password'} placeholder="password" name="password" value={loginData.password} onChange={getLoginData} />
                <div>
                    <input type={showPassword ? 'text' : 'password'} placeholder="password" name="password" value={loginData.password} onChange={getLoginData} />
                    <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show'}</button>
                </div>
                <div>
                    <button onSubmit={() => loginSubmit}>Login</button>
                    <button onClick={onSwitchRegister}>Register</button>
                    {errorFrontend && <p>{errorFrontend}</p>}
                    {errorLogin && <p>{errorLogin}</p>}
                    {loadingLogin && <p>loading...</p>}
                </div>
            </form>
        </div>
    )
}