import { useEffect, useState } from "react";
import type { Task } from "../types/Usetypes";
import { useApiRefreshStore } from "../ZustandUtilities/controlAPI";
import { AuthUser } from "../ZustandUtilities/authStore";

export const useGetTasks = () => {
    const [data, setData] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { value } = useApiRefreshStore();
    const {user} = AuthUser();
    const token = user?.token ?? '';

    useEffect(() => {
        const requestApi = async () => {
            if (!token) {
                setData([]);
                setError(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/api/tasks", {
                    method: "GET",
                    headers: {
                        'Content-Type' :'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("request has fall");
                const tasks = await response.json();
                setData(tasks);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                    setError("request has fall");
                } else {
                    console.log("something was wrong");
                    setError("something is not going well");
                }
            } finally {
                setLoading(false);
            }
        };

        requestApi();
    }, [value, token]);

    return { data, error, loading };
};

// Backward-compatible alias.
export const getApi = useGetTasks;