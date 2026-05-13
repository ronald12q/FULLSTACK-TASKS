import { useState } from "react";
import { AuthUser } from "../ZustandUtilities/authStore";


interface CreateTaskProps {
    title: string;
    description: string;
}

interface UseCreateTaskReturn {
    data: CreateTaskProps | null;
    error: string | null;
    loading: boolean;
    createTask: ({ title, description }: CreateTaskProps) => Promise<void>;
    resetCreateTaskState: () => void;
}

export const useCreateTask = () => {
    const [datap, setData] = useState<CreateTaskProps | null>(null);
    const [errorp, setError] = useState<string | null>(null);
    const [loadingp, setLoading] = useState<boolean>(false);
    const {user} = AuthUser();
    const token = user?.token ?? '';

    const createTask = async ({ title, description }: CreateTaskProps) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, description }),
            });

            if (!res.ok) throw new Error("nose pudo conectar con el backend");
            const response = await res.json();
            setData(response);
            setTimeout(() => {
                setData(null);
            }, 2000);
        } catch (error) {
            setError("error al enviar datos");
        } finally {
            setLoading(false);
        }

    };

    const resetCreateTaskState = () => {
        setError(null);
        setData(null);
        setLoading(false);
    };

    return {
        data: datap ?? null,
        error: errorp ?? null,
        loading: loadingp,
        createTask,
        resetCreateTaskState,
    } as UseCreateTaskReturn;
};

// Backward-compatible alias.
export const usePost = useCreateTask;

// Backward-compatible property mapping.
export const usePostAdapter = () => {
    const { data, error, loading, createTask, resetCreateTaskState } = useCreateTask();
    return {
        datap: data,
        errorp: error,
        loadingp: loading,
        PostData: createTask,
        resetState: resetCreateTaskState,
    };
};










