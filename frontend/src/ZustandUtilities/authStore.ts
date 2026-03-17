import {create} from 'zustand';
import type { userPost } from '../types/Usertpes';
import { persist } from 'zustand/middleware';

interface authStoreInterface  {
     user : userPost | null ,
    getUser : (data: userPost) => void }

export const AuthUser = create<authStoreInterface>()(
 
    persist(
        (set) => ({

            user: null,
            getUser: (data: userPost) => set(({user: data}))


        }),
        {name: 'post-auth',
        partialize: (state) => ({user: state.user})
        }
    
    )
    
);