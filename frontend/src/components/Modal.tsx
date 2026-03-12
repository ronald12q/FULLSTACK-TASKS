
import { type ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition hover:scale-105 hover:bg-white/10 hover:text-white"
                    aria-label="Cerrar modal"
                >
                    x
                </button>

                <div className="relative p-6 pt-12 text-zinc-100 sm:p-8 sm:pt-14">{children}</div>
            </div>
        </div>
    );
};