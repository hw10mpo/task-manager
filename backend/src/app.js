import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

export default app;