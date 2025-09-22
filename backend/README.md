
# Fullstack MERN Assignment

This project is built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). It implements CRUD operations, form validation, and dependent dropdowns for state and city selection.

## Prerequisites

- MongoDB installed locally or a cloud MongoDB URI (e.g., MongoDB Atlas)
- Node.js and npm installed

## Features

- CRUD operations for user details (name, mobile, state, city, address)
- State–City dependent dropdown (cities update based on selected state)
- Form validation:
  - All fields are required
  - Mobile number must be exactly 10 digits
- Edit functionality loads existing data into the form
- Data stored in MongoDB and accessed via Express API

## Database Structure
### Collections
- users: Stores user details (name, mobile, state, city, address)
- statecities: Stores all Indian states and their major cities

### Models
- backend/models/User.js: Defines the user schema
- backend/models/StateCity.js: Defines the state/city schema

## Seeding State/City Data

To populate the database with Indian states and cities:

1. Add your MongoDB connection string in .env (or use the default in seed.js).
2. Run the seed script:

```powershell
cd backend
node seed.js
```

This will clear old state/city data and insert the full list.

## Usage in Application

- Backend APIs provide states, cities, and user CRUD operations.
- Frontend fetches states and cities dynamically for dropdowns.
- User details are managed via the form and stored in the database.

## Environment Variables

Set your MongoDB URI in a .env file:

```
MONGO_URI=mongodb://127.0.0.1:27017/assignmentDB
```

## Useful Commands

Start backend server:

```powershell
cd backend
node server.js
```

Seed database:

```powershell
cd backend
node seed.js
```

Start frontend:

```powershell
cd frontend
npm start
```

## Notes

- Ensure MongoDB is running before starting the backend or seeding.
- Database will be auto-created if it does not exist.
- All fields are mandatory; validations are handled both in frontend and backend.




<!--mongodb://127.0.0.1:27017/assignmentDB -->
