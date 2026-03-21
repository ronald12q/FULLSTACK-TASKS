import { useState, type ChangeEvent, type FormEvent } from "react"
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



    const loginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorFrontend(null);

        if(!loginData.email || !loginData.password) {
            setErrorFrontend('all places has to be fill');
            return;
        }

        if(!loginData.email.includes('@')){
            setErrorFrontend('email format is not correct ');
            return;
        }

        const isSuccess = await loginPost(loginData);
        if (!isSuccess) return;

        setLoginData({email: '',  password: ''})
        onSuccess();

    }

    const getLoginData = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [event.target.name]: event.target.value})

    }




    return (
        <div className="space-y-4">
            <h1 className="text-lg font-semibold text-zinc-100">Login</h1>
            <form onSubmit={loginSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={loginData.email}
                    onChange={getLoginData}
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                />
                <div className="space-y-2">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={getLoginData}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-zinc-400 transition hover:text-zinc-200"
                    >
                        {showPassword ? 'hide' : 'show'} password
                    </button>
                </div>

                <div className="space-y-2">
                    <button
                        type="submit"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={onSwitchRegister}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700"
                    >
                        Create account
                    </button>
                </div>

                {errorFrontend && <p className="text-sm text-rose-300">{errorFrontend}</p>}
                {errorLogin && <p className="text-sm text-rose-300">{errorLogin}</p>}
                {loadingLogin && <p className="text-sm text-zinc-300">loading...</p>}
            </form>
        </div>
    )
}