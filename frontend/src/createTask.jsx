//Import Reacts Hooks:
//useState - Stores the Components' State.
import { useState } from "react";

export default function CreateTask({ onTaskCreated }) {

    //Local State to Hold Text Typed into the Input Field.
    const [title, setTitle] = useState("");

    //Handle Submission when a User Adds a New Task.
    const handleSubmit = async (e) => {
        //Prevents the Page from Refreshing after Adding a Task.
        e.preventDefault();

        //Sends a POST Request to the backend API to Create a New Task.
        await fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //Sends the Task Title as a JSON.
            body: JSON.stringify({ title })
        });

        //Clears the Input Field after Submitting a Task.
        setTitle("");
        //Notifies the Parent Component (app.jsx) to Refresh the Task List.
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
