//Imports the Shared Prisma Client Instance.
//This provides access to the Task Model Defined in schema.prisma.
import prisma from '../prisma/client.js';

//Grabs All Tasks from the Database.
export const getAllTasks = async (req, res) => {
    try {
        //Retrieves All Tasks.
        const tasks = await prisma.task.findMany();
        //Sends Tasks as JSON.
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

//Grabs a Single Task by its ID.
export const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.task.findUnique({
            //Converts ID from String to Number.
            where: { id: Number(id) }
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
};

//Creates a New Task with the Inputted Title.
export const createTask = async (req, res) => {
    const { title } = req.body;

    try {
        const newTask = await prisma.task.create({
            //Only Title is Required; Completed Defaults to false.
            data: { title }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

//Updates an Existing Task.
//Can Update Title and Toggle Complete or Incomplete.
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        //Build a Dynamic Update Object so Missing Fields are Ignored.
        const data = {};

        if (typeof title !== "undefined") {
            data.title = title;
        }

        if (typeof completed !== "undefined") {
            data.completed = completed;
        }

        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data
        });

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
};

//Removes a Task from the Database.
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.task.delete({
            where: { id: Number(id) }
        });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
};