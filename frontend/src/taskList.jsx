//Import Reacts Hooks:
//useEffect - Runs Side-Effects like Grabbing Data from the backend.
//useState - Stores the Components' State.
import { useEffect, useState } from "react";

export default function TaskList() {
    //Local State to Store Tasks Recieved from the Backend API.
    const [tasks, setTasks] = useState([]);

    //Grabs Tasks from the backend API when the Component First Loads.
    //The Empty Array Dependency [] Ensures the Application only Runs Once.
    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            //Converts the Response to JSON.
            .then(res => res.json())
            //Stores the task data in state.
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
                        {task.title} {task.completed ? "Completed" : "Incomplete"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
