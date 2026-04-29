# 🍽 Mealsy — Meal Delivery E-Commerce

A full-stack MERN e-commerce application for ordering chef-curated meals online. Built with React, Redux, Node.js, Express, and MongoDB.

---

## Features

- Browse a menu of meals with ratings and descriptions
- User registration and login with JWT authentication
- Add meals to cart with quantity selection
- Full checkout flow: Shipping → Payment → Order Review
- Order confirmation and order history on profile page
- Responsive, modern UI with a warm food-inspired design

---

## Tech Stack

**Frontend**
- React 17, React Router DOM 5
- Redux 4 + Redux Thunk (state management)
- React-Bootstrap 2
- Axios

**Backend**
- Node.js + Express 4 (ES Modules)
- MongoDB + Mongoose
- bcryptjs (password hashing)
- JSON Web Tokens (authentication)

**Database**
- MongoDB Atlas

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/eo640217/meal-ecommerce.git
cd meal-ecommerce
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Install dependencies

```bash
# Root dependencies (backend)
npm install

# Frontend dependencies
npm install --prefix frontend
```

### 4. Seed the database

```bash
npm run data:import
```

This creates sample meals and the following test accounts:

| Role  | Email                  | Password |
|-------|------------------------|----------|
| Admin | admin1@testing.ca      | 12345    |
| Admin | admin2@testing.ca      | 12345    |
| User  | regular1@testing.ca   | 12345    |

To clear seeded data:

```bash
npm run data:destroy
```

### 5. Run the app

```bash
# Run backend and frontend concurrently
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend + frontend concurrently |
| `npm run server` | Start backend only (with nodemon) |
| `npm run client` | Start frontend only |
| `npm run data:import` | Seed database with sample data |
| `npm run data:destroy` | Clear all seeded data |

---

## Project Structure

```
meal-ecommerce/
├── backend/
│   ├── controllers/       # Route handler logic
│   ├── middleware/        # Auth & error middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── data/              # Seed data
│   └── server.js          # Entry point
├── frontend/
│   └── src/
│       ├── actions/       # Redux action creators
│       ├── components/    # Reusable UI components
│       ├── constants/     # Redux action type constants
│       ├── reducers/      # Redux reducers
│       ├── views/         # Page-level components
│       └── store.js       # Redux store
└── .env
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/meals` | Get all meals | — |
| GET | `/api/meals/:id` | Get meal by ID | — |
| POST | `/api/users/login` | Login user | — |
| POST | `/api/users` | Register user | — |
| GET | `/api/users/profile` | Get user profile | ✅ |
| PUT | `/api/users/profile` | Update user profile | ✅ |
| POST | `/api/orders` | Create order | ✅ |
| GET | `/api/orders/myorders` | Get user's orders | ✅ |
| GET | `/api/orders/:id` | Get order by ID | ✅ |
| PUT | `/api/orders/:id/pay` | Mark order as paid | ✅ |

---

## Author

**Emmanuel Olufelo** — [GitHub](https://github.com/eo640217)

---

## License

ISC
