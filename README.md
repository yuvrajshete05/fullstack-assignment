# Fullstack MERN Assignment

This project is a complete MERN stack application for user management with dependent dropdowns for state and city, full CRUD operations, and validations.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Validations](#validations)
- [API Endpoints](#api-endpoints)
- [Notes](#notes)

---

## Features
- Add, view, edit, and delete users
- Dependent dropdowns: City list updates based on selected State
- All fields required; mobile number must be 10 digits
- State and city dropdowns fetched from MongoDB
- Edit loads previous user data into the form

## Tech Stack
- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB

## Project Structure
```
fullstack-assignment/
  backend/
    models/
      User.js
      StateCity.js
    routes/
      api.js
    seed.js
    server.js
    package.json
    README.md
  frontend/
    src/
      api.js
      components/
        UserForm.js
        UserTable.js
      App.js
      index.js
    public/
    package.json
    README.md
```

## Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/<your-username>/<your-repo-name>.git
cd fullstack-assignment
```

### 2. Install Dependencies
- Backend:
  ```powershell
  cd backend
  npm install
  ```
- Frontend:
  ```powershell
  cd ../frontend
  npm install
  ```

### 3. Configure Environment Variables
- In `backend`, create a `.env` file:
  ```
  MONGO_URI=mongodb://127.0.0.1:27017/assignmentDB
  ```

### 4. Seed the Database
- Populate all Indian states and cities:
  ```powershell
  cd backend
  node seed.js
  ```

### 5. Start the Servers
- Backend:
  ```powershell
  cd backend
  node server.js
  ```
- Frontend:
  ```powershell
  cd frontend
  npm start
  ```

## Database Setup
See `backend/README.md` for details on collections, models, and seeding.

## Usage
- Open the frontend in your browser (usually at `http://localhost:3000`).
- Use the form to add users. All fields are required.
- Select a state to see its cities in the city dropdown.
- Edit or delete users from the table.

## Validations
- All fields are required
- Mobile number: only 10 digits allowed
- State and city must be selected
- Address is required

## API Endpoints
- **GET /api/states**: Get all states
- **GET /api/locations/:state**: Get cities for a state
- **GET /api/users**: Get all users
- **POST /api/users**: Add a user
- **PUT /api/users/:id**: Update a user
- **DELETE /api/users/:id**: Delete a user

## Notes
- Make sure MongoDB is running before starting the backend or seeding data.
- The backend runs on port 5000 by default; frontend on 3000.
- For any issues, check your MongoDB connection and ensure both servers are running.

---

For questions or issues, contact the repository owner.
