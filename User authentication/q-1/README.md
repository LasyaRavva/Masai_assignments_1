# Mini User Authentication System

A simple User Authentication API built with Node.js, Express.js, and Supabase (PostgreSQL).

## 📋 Features

- ✅ User signup with password hashing (bcrypt)
- ✅ Email uniqueness validation
- ✅ Fetch user profile without exposing password
- ✅ Input validation
- ✅ Proper error handling
- ✅ Async/await implementation

## 🗄️ Database Setup

### Create a table named `users` in Supabase with these columns:

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| id | UUID | Primary Key, auto generated |
| name | TEXT | NOT NULL |
| email | TEXT | UNIQUE, NOT NULL |
| age | INTEGER | NOT NULL |
| location | TEXT | NOT NULL |
| password | TEXT | NOT NULL |
| created_at | TIMESTAMP | Default NOW() |

## 🚀 Installation

```bash
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

## 🏃 Running the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:3000`

## 📡 API Endpoints

### 1. POST /signup

Register a new user.

**Request Body:**
```json
{
  "name": "Ravi",
  "email": "ravi@gmail.com",
  "age": 22,
  "location": "Bangalore",
  "password": "123456"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully"
}
```

**Response (Email exists):**
```json
{
  "error": "Email already exists"
}
```

**Response (Validation error):**
```json
{
  "error": "All fields (name, email, age, location, password) are required"
}
```

### 2. GET /myprofile?name=<name>

Fetch user profile by name (password is NOT returned).

**Example Request:**
```
GET /myprofile?name=Ravi
```

**Response (Success):**
```json
{
  "id": "uuid",
  "name": "Ravi",
  "email": "ravi@gmail.com",
  "age": 22,
  "location": "Bangalore"
}
```

**Response (User not found):**
```json
{
  "error": "User not found"
}
```

**Response (Missing parameter):**
```json
{
  "error": "Name query parameter is required"
}
```

## ✅ Validation Rules

- All fields are required for signup
- Email must be in valid format
- Age must be a positive number
- Password must be at least 6 characters
- Email must be unique across the database
- Name and location cannot be empty

## 🔒 Security Features

- ✅ Passwords are hashed using bcryptjs (10 rounds)
- ✅ Password is never returned in API responses
- ✅ Input validation on all fields
- ✅ Error handling with try/catch
- ✅ Duplicate email prevention

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **Password Hashing:** bcryptjs
- **Validation:** validator.js
- **Environment:** dotenv

## 🔧 Project Structure

```
q-1/
├── config/
│   └── supabase.js         # Supabase client initialization
├── controllers/
│   └── authController.js   # Auth logic (signup, profile)
├── middleware/
│   └── validation.js       # Input validation
├── routes/
│   └── authRoutes.js       # API routes
├── server.js               # Express app setup
├── package.json            # Dependencies
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 📝 Notes

- Passwords are hashed with bcryptjs before storage
- The `/myprofile` endpoint only returns: id, name, email, age, location (NO password)
- All endpoints use async/await
- Error handling is implemented with try/catch blocks
- Input validation prevents invalid data entry

## 🎯 Bonus Features Implemented

- ✅ Prevent duplicate email signup (409 Conflict)
- ✅ Return 404 if user does not exist
- ✅ Basic input validation (format, length, type)
- ✅ Comprehensive error messages
