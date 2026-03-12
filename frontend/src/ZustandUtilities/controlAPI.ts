import { create } from 'zustand';


interface ApiRefreshStore {
    value: number;
    updateValue: (increment: number) => void;
}


export const useApiRefreshStore = create<ApiRefreshStore>((set) => ({

    value: 0,


    updateValue: (increment: number) =>
        set((state) => ({ value: state.value + increment })),

}));

// Backward-compatible alias.
export const controlAPI = useApiRefreshStore;