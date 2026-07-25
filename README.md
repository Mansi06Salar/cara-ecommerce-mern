# CARA E-Commerce V2

CARA E-Commerce V2 is a full-stack e-commerce web application built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and JWT authentication.

The application provides a complete customer shopping flow along with role-based administrative functionality for managing products, inventory, orders, and store statistics.

The interface is responsive across desktop, tablet, and mobile screen sizes.

---

## Features

### Customer Features

- User registration
- User login and logout
- JWT-based authentication
- Dynamic product catalogue powered by MongoDB
- Individual product detail pages
- Product size and quantity selection
- Add products to cart
- Update cart quantities
- Remove products from cart
- Stock validation
- Checkout and order placement
- Order history
- Order status tracking
- Responsive shopping experience

### Admin Features

- Role-based admin authorization
- Protected admin dashboard
- View total products
- View total orders
- View total revenue
- Add new products
- Edit existing products
- Delete products
- Manage product inventory
- View customer orders
- Update order status
- Responsive product and order management interfaces

Supported order statuses:

- Placed
- Processing
- Shipped
- Delivered
- Cancelled

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- Font Awesome
- Responsive CSS Media Queries

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Tokens (JWT)
- bcryptjs password hashing
- Protected API routes
- Role-based authorization
- Environment variables using dotenv
- Server-side admin authorization

### Development Tools

- Git
- GitHub
- VS Code
- Postman

> Postman is used only for development and API testing. It is not required to use the application.

---

## Project Structure

```text
cara-ecommerce-v2/
|
|-- backend/
|   |-- middleware/
|   |   `-- authMiddleware.js
|   |
|   |-- models/
|   |   |-- Cart.js
|   |   |-- Order.js
|   |   |-- Product.js
|   |   `-- User.js
|   |
|   |-- routes/
|   |   |-- adminRoutes.js
|   |   |-- authRoutes.js
|   |   |-- cartRoutes.js
|   |   |-- orderRoutes.js
|   |   `-- productRoutes.js
|   |
|   |-- .env.example
|   |-- .gitignore
|   |-- makeAdmin.js
|   |-- seedProducts.js
|   |-- package.json
|   `-- server.js
|
|-- frontend/
|   |-- Images/
|   |
|   |-- js/
|   |   |-- cart.js
|   |   `-- products.js
|   |
|   |-- index.html
|   |-- shop.html
|   |-- Single_product.html
|   |-- cart.html
|   |-- orders.html
|   |-- login.html
|   |-- register.html
|   |-- admin.html
|   |-- manage-products.html
|   |-- manage-orders.html
|   |-- blog.html
|   |-- about.html
|   |-- contact.html
|   |-- script.js
|   `-- style.css
|
`-- README.md
```

---

# Running the Project Locally

The complete application can be run locally with the frontend, Express backend, and MongoDB database.

## Prerequisites

Install or configure:

- Node.js
- npm
- Git
- MongoDB Atlas
- A modern web browser

VS Code is recommended but not required.

---

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd cara-ecommerce-v2
```

---

## 2. Install Backend Dependencies

Move into the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

---

## 3. Configure Environment Variables

The real `.env` file is intentionally excluded from Git because it contains private configuration values.

A template is provided at:

```text
backend/.env.example
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your own credentials.

### MongoDB

Create a MongoDB Atlas database and obtain a connection string.

Example format:

```text
mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER/DATABASE_NAME
```

Never commit a connection string containing real credentials.

### JWT Secret

Use a private, sufficiently long random value for `JWT_SECRET`.

Example:

```env
JWT_SECRET=replace_this_with_your_own_long_random_secret
```

Never expose the production JWT secret publicly.

---

## 4. Seed the Product Database

A new MongoDB database initially contains no products.

CARA includes a seed script for populating the sample product catalogue.

From the backend directory, run:

```bash
npm run seed
```

The seed script adds the sample CARA products to the configured MongoDB database.

---

## 5. Start the Backend

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

A successful startup displays messages similar to:

```text
MongoDB Connected
Server running on port 5000
```

The local API runs on port `5000` by default.

---

## 6. Start the Frontend

Run the `frontend` directory through a local development server.

For example, using the VS Code Live Server extension:

1. Open `frontend/index.html`.
2. Right-click the file.
3. Select **Open with Live Server**.

Keep the backend running while using features that communicate with the API.

---

# User Accounts

Users can create an account through the Register page using:

- Name
- Email
- Password

Public registration creates standard customer accounts.

New users receive the default role:

```text
user
```

After logging in, customers can browse products, manage their cart, place orders, and view their order history.

---

# Admin Access

Administrative access is protected through role-based authorization.

Public registration does **not** create administrator accounts. Newly registered accounts receive the `user` role by default.

Administrator accounts are provisioned separately by the application owner. Admin-only backend routes verify both authentication and the user's current role before granting access.

Normal customers attempting to access protected administrative resources receive an authorization error.

---

# Application Flow

## Customer Flow

```text
Register / Login
       |
       v
Browse Shop
       |
       v
View Product
       |
       v
Select Size & Quantity
       |
       v
Add to Cart
       |
       v
Update / Remove Cart Items
       |
       v
Checkout
       |
       v
Order Stored in MongoDB
       |
       v
View Order History & Status
```

## Admin Flow

```text
Admin Login
      |
      v
Protected Dashboard
      |
      v
View Products / Orders / Revenue
      |
      v
Manage Products & Inventory
      |
      v
Manage Customer Orders
      |
      v
Update Order Status
```

Updated order statuses are reflected on the customer's Orders page.

---

# Responsive Design

CARA has been designed and tested for multiple screen sizes.

Responsive behaviour includes:

- Mobile navigation
- Responsive product grids
- Responsive product detail pages
- Mobile-friendly shopping cart cards
- Responsive order history cards
- Responsive admin dashboard
- Mobile-friendly product management cards
- Responsive order-management interface
- Adaptive forms, banners, content sections, and footer layouts

CSS media queries are used to adapt the interface for desktop, tablet, and mobile devices.

---

# Database Collections

MongoDB stores the application's data across the following main collections.

### Users

Stores:

- Name
- Email
- Hashed password
- Role
- Timestamps

### Products

Stores:

- Product name
- Category
- Price
- Description
- Image
- Stock
- Timestamps

### Carts

Stores:

- Customer reference
- Products
- Selected sizes
- Quantities

### Orders

Stores:

- Customer reference
- Product snapshots
- Quantity
- Size
- Price
- Total amount
- Order status
- Timestamps

---

# Authentication & Authorization

CARA uses JWT-based authentication.

After a successful login, the frontend sends the authentication token to protected backend routes using:

```text
Authorization: Bearer <token>
```

The backend:

1. Verifies the JWT.
2. Retrieves the corresponding user from MongoDB.
3. Attaches the authenticated user to the request.
4. Allows access to protected resources.

Administrative routes perform an additional role check:

```text
role === "admin"
```

This separates normal customer functionality from administrative operations.

Passwords are not stored in plain text. They are hashed using `bcryptjs` before being stored in MongoDB.

---

# API Overview

The backend is organised around the following API groups:

```text
/api/auth
/api/products
/api/cart
/api/orders
/api/admin
```

Examples include:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

GET  /api/products
GET  /api/products/:id

GET  /api/cart

GET  /api/orders

GET  /api/admin/dashboard
```

Additional POST, PUT, and DELETE endpoints handle cart management, checkout, product administration, and order management.

---

# Security Notes

Sensitive configuration is stored using environment variables.

Files and directories such as the following should not be committed:

```text
.env
node_modules/
```

Never publish:

- MongoDB usernames or passwords
- Private MongoDB connection strings
- JWT secrets
- Production environment variables
- User passwords

The repository includes `.env.example` to document the required environment variables without exposing real credentials.

Public registration cannot assign administrative privileges. User roles are controlled by the backend and administrator accounts are provisioned separately.

---

# Testing

The application has been tested through both customer and administrative workflows.

## Customer Flow

```text
Register
   |
   v
Login
   |
   v
Browse Products
   |
   v
View Product
   |
   v
Add to Cart
   |
   v
Update Cart
   |
   v
Checkout
   |
   v
Order Created
   |
   v
View Orders
```

## Admin Flow

```text
Admin Login
   |
   v
Dashboard
   |
   v
Manage Products
   |
   v
View Customer Orders
   |
   v
Update Order Status
```

The updated status can then be viewed from the customer's order history.

Postman can optionally be used for direct API testing during development.

---

# Future Improvements

Possible future enhancements include:

- Online payment gateway integration
- Product search
- Product filtering and sorting
- Wishlist functionality
- Customer profile management
- Product reviews and ratings
- Email order confirmation
- Password reset functionality
- Cloud image storage
- Production deployment

---

## Author

**Mansi Salar**

B.Tech Computer Science & Engineering

---

## Project Status

**CARA E-Commerce V2 is a functional, responsive full-stack e-commerce application featuring customer authentication, MongoDB-backed product management, shopping cart and checkout functionality, order tracking, inventory management, and role-based administrative controls.**