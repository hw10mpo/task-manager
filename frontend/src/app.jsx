import { useState, useEffect } from "react";
import CreateTask from "./createTask";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

    const refreshTasks = async () => {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data);
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "DELETE",
        });
        refreshTasks();
    };

    const startEditing = (task) => {
        setEditingId(task.id);
        setEditingTitle(task.title);
    };

    const saveEdit = async (id) => {
        const existing = tasks.find((t) => t.id === id);

        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: editingTitle,
                completed: existing.completed,
            }),
        });

        setEditingId(null);
        setEditingTitle("");
        refreshTasks();
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingTitle("");
    };

    const toggleStatus = async (task) => {
        await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                completed: !task.completed,
            }),
        });

        refreshTasks();
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Task Manager
                </h1>

                <CreateTask onTaskCreated={refreshTasks} />

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-700">Tasks</h2>

                {tasks.length === 0 && (
                    <p className="text-gray-500 text-center">No tasks yet.</p>
                )}

                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
                        >
                            {editingId === task.id ? (
                                <div className="flex w-full gap-2">
                                    <input
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        className="flex-1 border border-gray-300 rounded px-3 py-1"
                                    />

                                    <button
                                        onClick={() => saveEdit(task.id)}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={cancelEdit}
                                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <p className="font-medium text-gray-800">{task.title}</p>
                                        <p
                                            className={`text-sm ${
                                                task.completed ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {task.completed ? "✔ Completed" : "❌ Not Completed"}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleStatus(task)}
                                            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                                        >
                                            Toggle
                                        </button>

                                        <button
                                            onClick={() => startEditing(task)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={refreshTasks}
                    className="w-full mt-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}
