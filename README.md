# RentEase Backend API

RESTful API server for the RentEase furniture and appliance rental platform.
Built with Node.js, Express.js, and MongoDB.

---

## Overview

This backend provides APIs for authentication, product management, cart operations, order processing, maintenance requests, and user administration.

---

## Folder Structure

```
backend/
    ├──src
    │  ├── config/
    │  │   ├── db.js
    │  │   └── seed.js
    │  ├── controllers/
    │  │   ├── authController.js
    │  │   ├── cartController.js
    │  │   ├── maintenanceController.js
    │  │   ├── orderController.js
    │  │   └── productController.js
    │  ├── middleware/
    │  │   ├── auth.js
    │  │   └── errorHandler.js
    │  ├── models/
    │  │   ├── User.js
    │  │   ├── Product.js
    │  │   ├── Cart.js
    │  │   ├── Order.js
    │  │   └── MaintenanceRequest.js
    │  ├── routes/
    │  │   ├── auth.js
    │  │   ├── cart.js
    │  │   ├── maintenance.js
    │  │   ├── orders.js
    │  │   ├── products.js
    │  │   └── users.js
    │  └── index.js
    ├── .env.example
    └──  package.json
    
```

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcryptjs
* jsonwebtoken
* dotenv
* cors
* nodemon

---

## Getting Started

### Install dependencies

```bash
cd backend
npm install
```

### Configure environment

```bash
cp .env.example .env
```

Update `.env` file:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### Seed database

```bash
npm run seed
```

Demo accounts:

```
Admin : admin@rentease.com / admin123
User  : user@rentease.com  / user123
```

### Start server

```bash
npm run dev
npm start
```

Server URL:

```
http://localhost:8080
```

---

## API Endpoints

### Authentication (/api/auth)

* POST /register
* POST /login
* GET /me
* PUT /profile

---

### Products (/api/products)

* GET /
* GET /:id
* POST / (admin)
* PUT /:id (admin)
* DELETE /:id (admin)

Query parameters:

```
?category=Furniture
?search=sofa
?page=1&limit=12
?sort=-monthlyRent
```

---

### Cart (/api/cart)

Requires authentication.

* GET /
* POST /
* PUT /:productId
* DELETE /clear
* DELETE /:productId

---

### Orders (/api/orders)

* POST /
* GET /
* GET /admin/all
* GET /:id
* PUT /:id/status

Order status flow:

```
pending → confirmed → delivered → active → returned / cancelled
```

---

### Maintenance (/api/maintenance)

* POST /
* GET /
* GET /admin/all
* PUT /:id

Issue types:

```
repair, replacement, cleaning, installation, other
```

---

### Users (/api/users)

* GET /
* GET /:id
* PUT /:id
* PUT /:id/toggle
* DELETE /:id

---

## Authentication

Use JWT token in headers:

```
Authorization: Bearer <token>
```

---

## Database Models

### User

```
name, email, password, address, role, isActive
```

### Product

```
name, category, description, monthlyRent, deposit, tenureOptions,
stock, imageUrl, brand, rating, isAvailable
```

### Order

```
user, items, totalRent, totalDeposit, grandTotal,
deliveryDate, deliveryAddress, status, rental dates, notes
```

### Cart

```
user, items
```

### MaintenanceRequest

```
user, product, order, issueType, description, status, notes
```

---

## Error Handling

Standard error response:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Server port               |
| NODE_ENV   | Environment               |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | Secret key                |
| JWT_EXPIRE | Token expiry              |

---

## Scripts

```bash
npm run dev
npm start
npm run seed
```

---
