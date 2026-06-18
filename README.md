# 🏪 Store Rating System

A full-stack web application where users can view stores and give ratings, while admins and store owners manage stores and view analytics.

---

## 🚀 Features

### 👤 Users
- Register and Login system
- View list of all stores
- Give ratings (1 to 5)
- Update rating (only one rating per store per user)

### 🏪 Store Owners
- Login as OWNER
- Manage their own stores
- View average ratings of their stores
- View users who rated their stores

### 🛠 Admin
- Manage users (create, update, delete)
- Manage stores
- View system-wide analytics and data

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React.js (Vite)
- Axios

---

## 📊 Database Structure

### Users Table
- id (Primary Key)
- name
- email
- password (hashed)
- address
- role (ADMIN / USER / OWNER)

---

### Stores Table
- id (Primary Key)
- name
- email
- address
- owner_id (Foreign Key → users.id)

---

### Ratings Table
- id (Primary Key)
- user_id (Foreign Key → users.id)
- store_id (Foreign Key → stores.id)
- rating (1–5)

---

## 🔐 Authentication System

- Users register and login using email & password
- JWT token generated on login
- Token used for all protected routes
- Role-based access control:
  - ADMIN → full system access
  - OWNER → only own stores access
  - USER → can view stores and give ratings

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Ashvini-Bodke/Store_Rating_App.git

2. Move into project directory
cd Store_Rating_App

 3. Setup Backend
cd backend
npm install

4. Create .env file (inside backend folder)
PORT=8080

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating

JWT_SECRET=your_secret_key

5. Run Backend Server
   nodemon index.js
6. Setup Frontend (Vite React)
cd ../frontend
npm install
7. Run Frontend
npm run dev  
   
---
Application URLs
Frontend → http://localhost:5173
Backend → http://localhost:8080

## 🔁 API Testing (Postman)

All backend APIs are tested using Postman before frontend integration.

### Authorization Header
```http
Authorization: Bearer <JWT_TOKEN>

