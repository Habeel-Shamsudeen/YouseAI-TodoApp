# TaskFlow

This is a full-stack **Task Management Application** built using **Next.js** for the frontend and **Express.js** for the backend. The app enables users to manage tasks with features such as adding tasks, assigning priority, setting status, and more. It supports session management with cookies and Recoil for state management on the frontend.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- **Drag-and-Drop**:
  - React Beautiful DnD (for implementing Kanban board drag-and-drop functionality)

## Features

- **Task Management**: Add, update, and delete tasks.
- **Task Filtering**: Filter tasks by status, priority, and due date.
- **State Management**: Uses Recoil for efficient state handling.
- **Cross-Origin Session Handling**: Supports cookies with proper session management.
- **User Authentication**: JWT-based authentication for secure API access.
- **Backend API**: Deployed on Vercel with Express.js and Prisma (if using).

## Technologies Used

- **Frontend**:
  - Next.js (React framework)
  - Recoil (State management)
  - TypeScript
  - Axios (for API calls)
  
- **Backend**:
  - Express.js (Node.js web framework)
  - JWT (for authentication)
  - Prisma (ORM for database interaction, optional)
  - Vercel (for deployment)