# E-Commerce Backend System

A scalable backend system for an e-commerce platform, handling product management, user authentication, shopping cart functionality, and order processing.

## 🛠️ Technologies Used

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Caching**: Redis
- **Documentation**: Swagger
- **Testing**: Jest

## ✨ Features

1. **User Authentication**: Register, log in, log out, reset passwords.
2. **Product Management**: CRUD operations for products with pagination and filtering.
3. **Shopping Cart**: Add, update, and remove products in the cart with total price calculation.
4. **Order Processing**: Place orders, deduct product stock, and view order history.
5. **Security**: Input validation, JWT for authentication, hashed passwords, and rate limiting.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (>= 14.x)
- **PostgreSQL** (Database setup required)
- **Redis** (for caching)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/e-commerce-backend.git
   cd e-commerce-backend
2. **Install dependencies**

    ```bash 
    npm install
3. **Environment Configuration**
    ```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/database_name
    JWT_SECRET=your_jwt_secret_key
    REDIS_HOST=localhost
    REDIS_PORT=6379

4. **Setup Database with Prisma**
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate

**Running the Application**

1. **Start Redis Server**
    ```bash
    redis-server
2. **Start the Application**
    ```bash
    npm run start:dev
3. **API Documentation**
     Access Swagger documentation at http://localhost:3000/api.
