import { useState, useEffect } from "react";
import CreateTask from "./createTask";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
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
          {tasks.map(task => (
              <li key={task.id}>
                {task.title} {task.completed ? "✔️" : "❌"}
              </li>
          ))}
        </ul>

        <button onClick={refreshTasks}>Refresh</button>
      </div>
  );
}
