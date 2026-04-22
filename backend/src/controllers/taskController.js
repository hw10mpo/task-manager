import prisma from '../prisma/client.js';

// GET all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// GET one task by ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.task.findUnique({
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

// CREATE a task
export const createTask = async (req, res) => {
    const { title } = req.body;

    try {
        const newTask = await prisma.task.create({
            data: { title }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

// UPDATE a task (FIXED — now supports partial updates)
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
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

// DELETE a task
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