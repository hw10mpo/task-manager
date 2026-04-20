import { useEffect, useState } from "react";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    // GET tasks from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error("Error fetching tasks:", err));
    }, []);

    return (
        <div>
            <h2>Tasks</h2>
            {tasks.length === 0 && <p>No tasks yet.</p>}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} {task.completed ? "✔️" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
