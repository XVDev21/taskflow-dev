# TaskFlow
Web Task Manager - Professional Edition

A full stack Task Manager application built with React (Hooks) for the frontend and Django with Django REST Framework for the backend. The application allows users to manage tasks with full CRUD functionality.

---

## Project Structure

```
/backend   Django + DRF project
/frontend  React application
```

---

## Requirements

* Python 3.10 or higher
* Node.js 18 or higher
* npm or yarn

---

## Backend Setup

1. Navigate to backend directory

```
cd backend
```

2. Install dependencies

```
pip install django djangorestframework django-cors-headers
```

3. Apply migrations

```
python manage.py makemigrations
python manage.py migrate
```

4. Run the server

```
python manage.py runserver
```

5. Backend runs at

```
http://127.0.0.1:8000/
```

---

## Frontend Setup

1. Navigate to frontend directory

```
cd frontend
```

2. Install dependencies

```
npm install
```

3. Create environment file

Create a `.env` file in the frontend root:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

4. Run development server

```
npm run dev
```

5. Frontend runs at

```
http://localhost:5173/
```

---

## API Endpoints

| Method | Endpoint     | Description                  | Request Body                               |
| ------ | ------------ | ---------------------------- | ------------------------------------------ |
| GET    | /tasks/      | Retrieve all tasks           | None                                       |
| POST   | /tasks/      | Create a new task            | { "title": string, "description": string } |
| GET    | /tasks/{id}/ | Retrieve a single task       | None                                       |
| PUT    | /tasks/{id}/ | Update title and description | { "title": string, "description": string } |
| PATCH  | /tasks/{id}/ | Update completed status      | { "completed": boolean }                   |
| DELETE | /tasks/{id}/ | Delete a task                | None                                       |

---

## Task Object Structure

```
{
  "id": "1",
  "title": "Example Task",
  "description": "Optional description",
  "completed": false,
  "createdAt": "2026-03-29T11:09:48.659906Z",
  "updatedAt": "2026-03-29T11:09:48.659906Z"
}
```

---

## Features

* View all tasks
* Create a new task
* Update task title and description
* Toggle task completion
* Delete a task
* Loading states and error handling
* Empty state handling when no tasks exist

---

## Notes and Assumptions

* The backend uses SQLite for simplicity
* CORS is enabled for development
* Dates are returned in ISO 8601 format and converted to local time in the frontend
* PATCH endpoint only updates the completed field
* PUT endpoint only updates title and description
* No authentication is implemented as it is outside the scope of the assessment
* Frontend includes structured error handling for network, client, and server errors

---

## Development Notes

* Ensure backend is running before using the frontend
* If the frontend shows a network error, verify the API base URL
* If tasks fail to render, confirm API returns an array from `/tasks/`

