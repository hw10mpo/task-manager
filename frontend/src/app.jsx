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
                completed: existing ? existing.completed : false,
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
                title: task.title,
                completed: !task.completed,
            }),
        });

        refreshTasks();
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <div>
            <h1>Task Manager</h1>

            <CreateTask onTaskCreated={refreshTasks} />

            <h2>Tasks</h2>
            {tasks.length === 0 && <p>No tasks yet.</p>}

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} style={{ marginBottom: "10px" }}>
                        {editingId === task.id ? (
                            <>
                                <input
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    style={{ padding: "4px" }}
                                />

                                <button
                                    onClick={() => saveEdit(task.id)}
                                    style={{
                                        marginLeft: "8px",
                                        padding: "4px 10px",
                                        backgroundColor: "#4CAF50",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Save
                                </button>

                                <button
                                    onClick={cancelEdit}
                                    style={{
                                        marginLeft: "6px",
                                        padding: "4px 10px",
                                        backgroundColor: "#999",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                {task.title}{" "}
                                <strong>{task.completed ? "✔ Completed" : "❌ Not Completed"}</strong>

                                <button
                                    onClick={() => toggleStatus(task)}
                                    style={{
                                        marginLeft: "10px",
                                        padding: "4px 10px",
                                        backgroundColor: "#6a5acd",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Toggle Status
                                </button>

                                <button
                                    onClick={() => startEditing(task)}
                                    style={{
                                        marginLeft: "6px",
                                        padding: "4px 10px",
                                        backgroundColor: "#007bff",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    style={{
                                        marginLeft: "6px",
                                        padding: "4px 10px",
                                        backgroundColor: "#ff4d4d",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={refreshTasks}>Refresh</button>
        </div>
    );
}