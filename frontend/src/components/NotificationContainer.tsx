import { Alert, AlertContent, AlertDescription, AlertIndicator, AlertTitle, CloseButton } from "@heroui/react";
import { useNotificationStore } from "../ZustandUtilities/notificationStore";

export const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotificationStore();

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className={`${
                        notif.leaving
                            ? "animate-out fade-out slide-out-to-right duration-300"
                            : "animate-in fade-in slide-in-from-right duration-300"
                    }`}
                >
                    <Alert status={notif.status}>
                        <AlertIndicator />
                        <AlertContent>
                            <AlertTitle>{notif.title}</AlertTitle>
                            {notif.description && (
                                <AlertDescription>{notif.description}</AlertDescription>
                            )}
                        </AlertContent>
                        <CloseButton onPress={() => removeNotification(notif.id)} />
                    </Alert>
                </div>
            ))}
        </div>
    );
};
