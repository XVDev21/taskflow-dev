TaskFlow
Web Task Manager - Professional Edition

A full-stack Task Manager application built with React 18 (Hooks) for the frontend and Django + Django REST Framework for the backend. Users can view, create, update, toggle completion, and delete tasks.

Table of Contents
Project Setup
Backend Setup
Frontend Setup
API Endpoints
Additional Notes & Assumptions
Project Setup

This project is organized as follows:

/backend/   -> Django + DRF project
/frontend/  -> React 18 project

Requirements:

Python 3.10+
Node.js 18+
npm or yarn
Backend Setup
Navigate to the backend directory:
cd backend
Install dependencies:
pip install django djangorestframework django-cors-headers
Apply migrations:
python manage.py makemigrations
python manage.py migrate
Run the development server:
python manage.py runserver
The backend will run at:
http://127.0.0.1:8000/
CORS is configured to allow all origins (for development).
Frontend Setup
Navigate to the frontend directory:
cd frontend
Install dependencies:
npm install
# or
yarn install
Create a .env file in the root of frontend with the backend base URL:
VITE_API_BASE_URL=http://127.0.0.1:8000/
Start the development server:
npm run dev
# or
yarn dev
The frontend will run at:
http://localhost:5173/   # default Vite port
API Endpoints

All API endpoints are under /tasks/:

Method	Endpoint	Description	Request Body	Response
GET	/tasks/	List all tasks	N/A	Array of task objects
POST	/tasks/	Create a new task	{ title: string, description?: string }	Newly created task object
GET	/tasks/{id}/	Retrieve task by ID	N/A	Task object
PUT	/tasks/{id}/	Update task title and description	{ title: string, description?: string }	Updated task object
PATCH	/tasks/{id}/	Toggle task completion status	{ completed: boolean }	Updated task object
DELETE	/tasks/{id}/	Delete a task	N/A	204 No Content

Task Object Structure (matches frontend types):

{
  "id": "1",
  "title": "Example Task",
  "description": "Optional description",
  "completed": false,
  "createdAt": "2026-03-29T11:09:48.659906Z",
}
Additional Notes & Assumptions
The frontend assumes that all dates are ISO 8601 strings and converts them to the local timezone for display.
Empty task lists display a friendly message: No tasks yet. Create your first task.
Network errors, server errors, and client errors are handled gracefully with a visible banner and detailed modal.
PATCH endpoint only toggles the completed field; PUT endpoint only updates title and description.
SQLite is used as the backend database for simplicity.
The app does not include authentication, as it was not required in the assessment.
The project uses clean separation between API, UI, and state management for maintainability.

This README gives a reviewer everything needed to set up, run, and test both frontend and backend while understanding the API contract and app behavior.