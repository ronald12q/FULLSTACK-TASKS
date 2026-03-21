import {create} from 'zustand';
import { persist } from 'zustand/middleware';


interface userInterface {
    name: string,
    email: string,
    token: string
}


interface authStoreInterface  {
     user : userInterface | null ,
    getUser : (data: userInterface) => void,
    logOut: () => void }
    

export const AuthUser = create<authStoreInterface>()(
 
    persist(
        (set) => ({

            user: null,
            getUser: (data: userInterface) => set(({user: data})),
            logOut: () => set(({user: null}))


        }),
        {name: 'post-auth',
        partialize: (state) => ({user: state.user})
        }
    
    )
    
);