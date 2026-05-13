import { useState } from "react";
import { useApiRefreshStore } from "../ZustandUtilities/controlAPI";
import { AuthUser } from "../ZustandUtilities/authStore";


export const useDeleteTask = () => {
    const [loadingdel, setLoadingDel] = useState<boolean>(false);
    const [errorDelete, setErrorDelete] = useState<string | null>(null);
    const { updateValue } = useApiRefreshStore();
    const { user } = AuthUser();
    const token = user?.token ?? "";

    const deleteTaskById = async (id: string) => {
        try {
            setLoadingDel(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("deleted failed");
            updateValue(1);
        } catch (error) {
            setErrorDelete("algo salio mal");
        } finally {
            setLoadingDel(false);
        }
    };

    return {
        loadingdel,
        errorDelete,
        deleteTaskById,
        // Backward-compatible name.
        DeleteID: deleteTaskById,
    };
};

// Backward-compatible alias.
export const Deletetask = useDeleteTask;
