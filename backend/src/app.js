//Imports Express Framework, Providing Middleware and Routing Support.
import express from 'express';

//Imports the CORS Middleware Allowing the React frontend to communicate
//with the backend API without being blocked by the browser.
import cors from 'cors';

//Imports the Task Route Module, which Contains all CRUD Endpoints for Tasks.
import taskRoutes from './routes/tasks.js';

//Creates an Express Application Instance.
const app = express();

//Enables CORS so the frontend at the localhost can AcCess the API.
app.use(cors());

//Enables JSON Parsing so Express can Read JSON Bodies in POST/PUT Requests.
app.use(express.json());

//Mounts all CRUD Task-Related Routes Under /api/tasks
app.use('/api/tasks', taskRoutes);

//Exports the App so it can be used by server.js.
export default app;