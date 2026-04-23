Application: Task Manager

Features:
1. Create New Tasks 
2. View All Tasks
3. Update Task Titles
4. Toggle Complete or Incomplete
5. Delete Tasks
6. Simple Tailwind UI

Structure of the Project:
task-manager/
    backend/
        prisma/
            schema.prisma/
        src/
            index.js/
            app.js/
            routes/
            controllers/
        package.json/
    frontend/
    src/
        app.jsx
        main.jsx
        createTask.jsx
        index.css
    index.html
    package.json

Technologies Used Throughout the Project:
Frontend:
1. React
2. Tailwind CSS

Backend:
1. Node.js
2. Express
3. Prisma ORM
4. PostgreSQL

Create the Needed Folders to Keep Everything Organised.
1. task-manager
2. backend: src (controllers, prisma, and routes).
3. frontend: src.
4. README.md

Initialise GitHub Repository:
1. git config --global --user.email "hw10mpo@bolton.ac.uk"
2. git config --global user.name "hw10mpo"
3. git init
4. git remote add origin https://github.com/hw10mpo/task-manager.git 
5. git remote -v
6. git branch -M main
7. git add ..
8. git commit -m "Initial Startup"

Backend Setup:
1. npm install
2. npm install express
3. npm install -D typescript ts-node @types/express @types/node
4. npm install prisma @types/pg --save-dev
5. npm install @prisma/client @prisma/adapter-pg pg dotenv
6. npx prisma
7. npx prisma init --datasource-provider postgresql --output ../generated/prisma

Frontend Setup:
1. npm install
2. npm install express 
3. npm install -D typescript ts-node @types/express @types/node
4. npm install -D tailwindcss postcss autoprefixer

API Endpoints CRUD:
1. GET /api/tasks
Returns all Tasks.
2. POST /api/tasks
Creates a new task.
3. PUT /api/tasks/id
Updates a task.
4. DELETE /api/tasks/id
Deletes a task.
