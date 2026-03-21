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
        setRegisterError(null);

        if(!registerData.username || !registerData.email || !registerData.password){
            setRegisterError('all the inputs needs to be filled')
            return
        }

        if(!registerData.email.includes('@') || registerData.password.length < 6){
            setRegisterError('review the inputs something is not going well');
            return;

        }

        const isSuccess = await postUser(registerData);
        if (!isSuccess) return;

        setRegisterData({username: '', email: '', password: ''});
        onSuccess();
    }

    const getRegisterData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData({...registerData, [event.target.name]: event.target.value})

    }

    


    return(
        <div className="space-y-4">
            <h1 className="text-lg font-semibold text-zinc-100">Register</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={registerData.username}
                    onChange={getRegisterData}
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={registerData.email}
                    onChange={getRegisterData}
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                />
                <div className="space-y-2">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        value={registerData.password}
                        onChange={getRegisterData}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-zinc-400 transition hover:text-zinc-200"
                    >
                        {showPassword === true ? 'hide' : 'show'} password
                    </button>
                </div>

                <div className="space-y-2">
                    <button
                        type="submit"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white"
                    >
                        Register
                    </button>
                    <button
                        type="button"
                        onClick={onSwitchLogin}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700"
                    >
                        I already have an account
                    </button>
                </div>

                {registerData.password.length > 0 && registerData.password.length < 6 && (
                    <p className="text-sm text-amber-300">the minimum length is 6</p>
                )}
                {registerError && <p className="text-sm text-rose-300">{registerError}</p>}
                {error && <p className="text-sm text-rose-300">{error}</p>}
                {loading && <p className="text-sm text-zinc-300">creating account...</p>}
            </form>
        </div>
    )
    
}