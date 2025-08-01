# Task Manager

A simple task management system where an **Admin** can create **Agents**, upload Excel files containing tasks (with file name, phone number, and notes), and the system will **automatically distribute the tasks** equally among all agents.

---

## One-Line Summary

> An admin can create many agents and upload an Excel file with columns: `file_name`, `phone`, `notes`. These tasks are automatically and equally distributed among all agents.

---
### Flow diagram

![Alt text](https://github.com/Anirban-Gorain/Task-management-assignment-CS-infotech/blob/main/Flow%20diagram%2C%20API%20endpoints%2C%20Client%20side%20pages%20flow.png "Optional Title")

---

## Tech Stack

- **Frontend**: React.js

- **Backend**: Node.js, Express.js, Axios, CORS, Dotenv, Nodemon, Jsonwebtoken

- **Styling**: Tailwind CSS

- **Database**: MongoDB (via Mongoose)

- **State Management**: Redux

- **Form Handling**: React Hook Form

- **Excel Parsing**: `xlsx` npm package

- **Routing**: React Router

---

## Environment Variables

### ✅ Backend `.env`

`DB_URL=your_mongo_connection_string`

`JWT_SECRET=your_jwt_secret_key`

### ✅ Frontend `.env`

`VITE_API_BASE_URL=http://localhost:3000`

### How to Run the Project

---

```
git clone this_repo_link

cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
```
