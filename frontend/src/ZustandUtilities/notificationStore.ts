import { create } from "zustand";

export interface Notification {
    id: string;
    title: string;
    description?: string;
    status: "success" | "danger" | "accent" | "warning";
    leaving: boolean;
}

interface NotificationStore {
    notifications: Notification[];
    addNotification: (notif: Omit<Notification, "id" | "leaving">) => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],

    addNotification: (notif) => {
        const id = crypto.randomUUID();
        set((state) => ({
            notifications: [...state.notifications, { ...notif, id, leaving: false }],
        }));

        setTimeout(() => {
            const { notifications } = get();
            const exists = notifications.find((n) => n.id === id && !n.leaving);
            if (!exists) return;

            set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === id ? { ...n, leaving: true } : n
                ),
            }));

            setTimeout(() => {
                get().removeNotification(id);
            }, 300);
        }, 4000);
    },

    removeNotification: (id) => {
        const { notifications } = get();
        const notif = notifications.find((n) => n.id === id);
        if (notif && !notif.leaving) {
            set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === id ? { ...n, leaving: true } : n
                ),
            }));
            setTimeout(() => {
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id),
                }));
            }, 300);
            return;
        }
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
    },
}));
