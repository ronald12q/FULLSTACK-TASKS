import { useState } from "react";
import type { TaskN, TaskPayload } from "../types/Usetypes";
import { useApiRefreshStore } from "../ZustandUtilities/controlAPI";




interface PatchTaskParams {
    _id?: string;
    newValue: Partial<TaskPayload>;
}

interface UsePatchTaskReturn {
    datapatch: TaskN | null;
    errorpatch: string | null;
    loadingpatch: boolean;
    patchTask: (params: PatchTaskParams) => Promise<void>;
}

export const PatchTaskHook = () => {
    const [datapatch, setDataPatch] = useState<TaskN | null>(null);
    const [errorpatch, setErrorPatch] = useState<string | null>(null);
    const [loadingpatch, setLoadingPatch] = useState<boolean>(false);
    const { updateValue } = useApiRefreshStore();

    const patchTask = async ({ _id, newValue }: PatchTaskParams) => {
        try {
            setLoadingPatch(true);
            const res = await fetch(`http://localhost:3000/api/tasks/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newValue),
            });

            if (!res.ok) throw new Error();
            const updateData = await res.json();
            setDataPatch(updateData);
            updateValue(1);
            setTimeout(() => {
                setDataPatch(null);
            }, 2000);
        } catch (error) {
            setErrorPatch("algo salio mal con la llamada");
        } finally {
            setLoadingPatch(false);
        }
    };

    return {
        patchTask,
        datapatch,
        errorpatch,
        loadingpatch,
        // Backward-compatible name.
        PatchTask: patchTask,
    } as UsePatchTaskReturn & { PatchTask: (params: PatchTaskParams) => Promise<void> };
};

export const usePatchTask = PatchTaskHook;