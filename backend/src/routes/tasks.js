//Imports Express framework.
import express from 'express';

//Import All Controller Functions That Handle the Actual Logic.
//Each Function Corresponds to a CRUD Operation.
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

//Creates a New Router Object to Group All Task-Related Routes.
const router = express.Router();

//Returns a List of All Tasks in the Database.
router.get('/', getAllTasks);

//Returns a Single Task by its ID.
router.get('/:id', getTaskById);

//Creates a New Task Using the Data Sent in the Request Body.
router.post('/', createTask);

//Updates an Exisiting Task.
router.put('/:id', updateTask);

//Removes a Task from the Database.
router.delete('/:id', deleteTask);

//Exports the Router so it can be Mounted in app.js.
export default router;
