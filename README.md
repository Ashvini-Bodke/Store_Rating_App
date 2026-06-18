# 🏪 Store Rating System

A full-stack web application where users can view stores and give ratings, while admins and store owners manage stores and view analytics.

---

## 🚀 Features

### 👤 Users
- Register/Login system
- View list of stores
- Give ratings (1 to 5)
- Update rating (one user per store)

### 🏪 Store Owners
- Login as OWNER
- View their stores
- See average ratings of their stores
- See users who rated their stores

### 🛠 Admin
- Manage users
- Manage stores
- View system data

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt password hashing

### Frontend
- React (or your frontend tech)
- Axios

---

## 📊 Database Structure

### Users Table
- id
- name
- email
- password (hashed)
- address
- role (ADMIN / USER / OWNER)

### Stores Table
- id
- name
- email
- address
- owner_id (FK → users.id)

### Ratings Table
- id
- user_id (FK → users.id)
- store_id (FK → stores.id)
- rating (1–5)

---

## 🔐 Authentication Flow

- Users login using email & password
- JWT token generated
- Role-based access:
  - ADMIN → full access
  - OWNER → own stores only
  - USER → rating access

---

## ⚙️ Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/your-username/your-repo-name.git
