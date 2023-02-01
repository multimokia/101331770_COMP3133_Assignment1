# COMP 3133 - Full Stack Development - Assignment 1
This repository serves as a GraphQL + MongoDB API endpoint/backend for an employee management site

The following operations have been implemented:
- Signup
- Login
- Get All Employees
- Add New Employee
- Search Employee By Id
- Update Employee By Id
- Delete Employee By Id

Start the server via:
```bash
npm install

npm run start
```

NOTE! This repository supports environment variables! The following two are used:
- `PORT`
  - (Default: 4000)

- `DB_CONNECTION_STR`
  - A MongoDB connection string (**REQUIRED**)
