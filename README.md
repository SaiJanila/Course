## Course Registration System

This project is a simple **Course Registration System** with a **React + Vite frontend** and a **Spring Boot backend**.

- **Student portal**  
  - Create a student account (name, email, password; student ID is generated automatically)  
  - Log in with name, email and password  
  - View available courses  
  - Register for courses  
  - View and drop registered courses

- **Admin portal**  
  - Log in as admin  
  - Add new courses (ID, name, instructor, credits)  
  - View the same list of available courses as students

The UI is split into two columns: **Student** on the left and **Admin** on the right, with a warm light-brown theme.

---

## Project structure

- `backend/` – Spring Boot REST API (Java, Maven)
  - Exposes endpoints for managing courses and registrations
  - Uses Spring Data JPA and MySQL (configurable in `application.properties`)
- `frontend/` – React app (Vite)
  - Communicates with the backend via Axios
  - Handles login, student registration, and admin course management

---

## Prerequisites

- **Java 17+** and **Maven 3.8+**
- **Node.js 18+** and **npm**
- **MySQL** running locally (or accessible DB) with:
  - A database created (for example: `course_registration`)
  - Correct JDBC URL, username and password configured in `backend/src/main/resources/application.properties`

---

## Backend – Spring Boot

From the `backend` folder:

```bash
cd "backend"
mvn spring-boot:run
```

The backend will start on the port configured in `application.properties` (commonly `8080`).

---

## Frontend – React (Vite)

From the `frontend` folder:

```bash
cd "frontend"

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

Vite will print a URL similar to:

```text
http://localhost:5173/
```

Open that URL in your browser while the backend is running.

---

## Login details

### Admin

- **Username**: `admin`  
- **Password**: `admin123`

These are demo credentials defined on the frontend only (no DB table for admins).

### Student

1. Click **Student Login** → **Create account**.
2. Fill in **Name**, **Email**, **Password**, **Confirm Password**.
3. Submit to create the account (a Student ID is generated and stored internally).
4. Switch back to **Login** and sign in with **Name + Email + Password**.

---

## Notes

- Student accounts are stored on the **frontend** using `localStorage` (for demo purposes).  
- Course and registration data are persisted in the **backend database** via Spring Data JPA.

