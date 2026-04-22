import { useState } from "react";

export default function CreateTask({ onTaskCreated }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });

        setTitle("");
        onTaskCreated();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
            />
            <button type="submit">Add</button>
        </form>
    );
}
