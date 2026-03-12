
export type Task = {
    _id: string;
    title: string;
    description: string;
};

export type TaskPayload = {
    title: string;
    description: string;
};

// Backward-compatible alias to avoid breaking existing imports.
export type TaskN = TaskPayload;