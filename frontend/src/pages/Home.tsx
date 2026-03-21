import React, { useState } from "react";
import { Modal } from "../components/Modal";
import { useGetTasks } from "../Hooks/UseGetTask";
import { useCreateTask } from "../Hooks/UseCreateTask";
import { type Task, type TaskPayload } from "../types/Usetypes";
import { useApiRefreshStore } from "../ZustandUtilities/controlAPI";
import { useDeleteTask } from "../Hooks/useDeleteTask";
import { usePatchTask } from "../Hooks/UsePatchTasks";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

type mode = "login"| "register"

export const Home = () => {
    const { updateValue } = useApiRefreshStore();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const { data, error, loading } = useGetTasks();
    
    const [authOpen, setAuthOpen] = useState<boolean>(false);
    const [authMode, setAuthMode] = useState<mode>('login');

    const openLogin = () =>{
        setAuthOpen(true);
        setAuthMode('login');
    }

    const openRegister = () => {
        setAuthOpen(true);
        setAuthMode('register');
    }


    <Modal isOpen={authOpen} onClose={() => setAuthOpen(false) }>
        <div>
            <button onClick={() => openLogin} >login</button>
            <button onClick={() => openRegister} >register</button>
        </div>
    </Modal>

    {authMode === 'login' ? (
        <LoginForm onSuccess={() => setAuthOpen(false)} onSwitchRegister={()=> setAuthMode('register')}/>
    ) :  <RegisterForm onSuccess={() => setAuthOpen(false)} onSwitchLogin={() => setAuthMode('login')} />  }

    const {
        data: createdTask,
        error: createError,
        loading: createLoading,
        createTask,
    } = useCreateTask();

    const {
        deleteTaskById,
        errorDelete,
        loadingdel,
    } = useDeleteTask();

    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

    const {
        patchTask,
        datapatch,
        errorpatch,
        loadingpatch,
    } = usePatchTask();

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [createForm, setCreateForm] = useState<TaskPayload>({
        title: "",
        description: "",
    });

    const [editForm, setEditForm] = useState<TaskPayload>({
        title: "",
        description: "",
    });

    const onCreateFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreateForm({ ...createForm, [event.target.name]: event.target.value });
    };

    const handleCreateSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createTask(createForm);
        updateValue(1);
        setCreateForm({ title: "", description: "" });
    };

    const openEditModal = (task: Task) => {
        setEditForm({
            title: task.title,
            description: task.description,
        });

        setSelectedTask(task);
        setEditModalOpen(true);
    };

    const onEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };

    const saveTaskEdition = () => {
        const dataToEdit: Partial<TaskPayload> = {};

        if (editForm.title !== selectedTask?.title) {
            dataToEdit.title = editForm.title;
        }

        if (editForm.description !== selectedTask?.description) {
            dataToEdit.description = editForm.description;
        }

        if (Object.keys(dataToEdit).length === 0) return;

        setEditForm({ title: "", description: "" });
        patchTask({ _id: selectedTask?._id, newValue: dataToEdit });
    };

    const cancelTaskEdition = () => {
        setSelectedTask(null);
        setEditForm({ title: "", description: "" });
        setEditModalOpen(false);
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(80,80,120,0.25),transparent_30%),linear-gradient(140deg,#070709_0%,#12121a_55%,#09090f_100%)] px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
            <section className="mx-auto w-full max-w-5xl">
                <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-900/40 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-md sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
                            Todo Full Stack
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Task Control Center
                        </h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            Gestiona tus tareas en una vista oscura minimalista.
                        </p>
                    </div>

                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="rounded-2xl border border-zinc-700 bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:bg-white"
                    >
                        Add Task
                    </button>
                </header>

                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                    {loading && <p>cargando tareas...</p>}
                    {error && <p className="text-rose-300">{error}</p>}
                    {errorDelete && <p className="text-rose-300">{errorDelete}</p>}
                    {loadingdel && <p>eliminando tarea...</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {data.map((task) => (
                        <article
                            key={task._id}
                            className="group rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/80 to-zinc-900/30 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-white/25"
                        >
                            <h2 className="mb-2 text-lg font-semibold text-zinc-100">
                                {task.title}
                            </h2>
                            <p className="mb-5 line-clamp-4 text-sm leading-relaxed text-zinc-400">
                                {task.description}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => deleteTaskById(task._id)}
                                    className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-1.5 text-xs font-medium text-rose-200 transition hover:bg-rose-400/20"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => openEditModal(task)}
                                    className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition hover:bg-emerald-400/20"
                                >
                                    Edit
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
                <h3 className="mb-1 text-xl font-semibold text-white">Nueva tarea</h3>
                <p className="mb-6 text-sm text-zinc-400">Completa el formulario para crear una tarea.</p>

                <form onSubmit={handleCreateSubmit} className="space-y-4">
                    <input
                        type="text"
                        onChange={onCreateFormChange}
                        placeholder="Title"
                        name="title"
                        value={createForm.title}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-400"
                    />
                    <input
                        type="text"
                        onChange={onCreateFormChange}
                        placeholder="Description"
                        name="description"
                        value={createForm.description}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-400"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white"
                    >
                        Registrar
                    </button>

                    {createError && <div className="text-sm text-rose-300">algo salio mal</div>}
                    {createdTask && (
                        <div className="text-sm text-emerald-300">{`tarea creada: ${createdTask.title}`}</div>
                    )}
                    {createLoading && <div className="text-sm text-zinc-300">creando usuario espera</div>}
                </form>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Editar tarea</h3>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={editForm.title}
                        onChange={onEditFormChange}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editForm.description}
                        onChange={onEditFormChange}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={saveTaskEdition}
                            className="flex-1 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/20"
                        >
                            Save
                        </button>
                        <button
                            onClick={cancelTaskEdition}
                            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700"
                        >
                            Cancel
                        </button>
                    </div>

                    {datapatch && <div className="text-sm text-emerald-300">{`dato actualizado ${datapatch?.title}`}</div>}
                    {errorpatch && <div className="text-sm text-rose-300">{errorpatch}</div>}
                    {loadingpatch && <div className="text-sm text-zinc-300">actualizando tarea...</div>}
                </div>
            </Modal>
        </main>
    );
};
