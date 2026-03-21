import React, { useState } from "react";
import { CreateUser } from "../Hooks/UseCreateUser"




interface RegisterProps {
    onSuccess: () => void,
    onSwitchLogin: () => void

}

interface RegisterData  {
    username: string,
    email: string,
    password: string
}


export const RegisterForm = ({ onSuccess, onSwitchLogin}:RegisterProps) => {

    const {loading, error, postUser} = CreateUser();
    const [registerData, setRegisterData] = useState<RegisterData>({
        username: '',
        email:'',
        password: ''
    })
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if(!registerData.username || !registerData.email || !registerData.password){
            setRegisterError('all the inputs needs to be filled')
            return
        }

        if(!registerData.email.includes('@') || registerData.password.length < 6){
            setRegisterError('review the inputs something is not going well');

        }

        await postUser(registerData);
        setRegisterData({username: '', email: '', password: ''});
        onSuccess();
    }

    const getRegisterData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData({...registerData, [event.target.name]: event.target.value})

    }

    


    return(
        <div>
            <h1>Register</h1>
            <form action="submit">
                <div>
                <input type="text" placeholder="username" name="username" value={registerData.username} onChange={getRegisterData} />
                <input type="email" placeholder="email" name="email" value={registerData.email} onChange={getRegisterData} />
                <div>
                    <input type={showPassword ? 'text' : 'password'} placeholder="password" name="password" value={registerData.password} onChange={getRegisterData} />
                    <button onClick={() => setShowPassword(!showPassword)} >{showPassword === true ? 'hide' : 'show'}</button>
                </div>
                <div>
                    <button onSubmit={onSubmit} >Register</button>
                    <button onClick={onSwitchLogin}>Login</button>
                    {registerData.password.length < 6 && <p>the minimiun length is 6 </p>}
                    {registerError && <p>{registerError}</p>}
                </div>
            </div>
            </form>
        </div>
    )
    
}