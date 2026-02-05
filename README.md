# HomesteadHub

A Q&A forum application for homesteading topics where users can ask and answer questions about poultry, rabbits, gardening, livestock, and food preservation.

## Live Demo

- **Frontend:** https://homesteadhub-cf.netlify.app
- **Backend API:** https://homesteadhub-server.onrender.com

## Features

- User registration and login with JWT authentication
- Browse questions by category
- Ask new questions
- Answer questions from other users
- Responsive dashboard interface

## Tech Stack

**Frontend:**
- React
- React Router
- Axios
- CSS

**Backend:**
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcryptjs

**Database:**
- PostgreSQL (Supabase)

## Installation

### Prerequisites
- Node.js installed
- Supabase account with database set up

### Backend Setup

1. Navigate to server folder:
```bash
   cd server
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file with:
```
   PORT=3001
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
   npm start
```

### Frontend Setup

1. Navigate to client folder:
```bash
   cd client
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm start
```

## Database Schema

**users** - Stores registered user accounts

**categories** - Forum topic categories (Poultry, Rabbits, Gardening, Livestock, Food Preservation)

**questions** - User-submitted questions linked to categories

**answers** - Responses to questions

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/categories` - Get all categories
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create new question
- `GET /api/answers/question/:id` - Get answers for a question
- `POST /api/answers` - Create new answer

## Author

Carrie Farr

