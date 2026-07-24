# CARA E-Commerce V2

CARA E-Commerce V2 is a full-stack e-commerce web application built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and JWT authentication.

The project includes customer authentication, dynamic product management, shopping cart functionality, order placement, order history, role-based authorization, and an admin dashboard for managing products and customer orders.

---

## Features

### Customer Features

- User registration
- User login and logout
- JWT-based authentication
- Browse products dynamically loaded from MongoDB
- View individual product details
- Select product size and quantity
- Add products to cart
- Update cart quantities
- Remove products from cart
- Checkout and place orders
- View order history
- View updated order status

### Admin Features

- Role-based admin authorization
- Protected admin dashboard
- View total products
- View total orders
- View total revenue
- Add products
- Edit products
- Delete products
- View customer orders
- Update order status

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

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Tokens (JWT)
- bcryptjs
- Role-based authorization
- Environment variables with dotenv

### Development Tools

- Git
- GitHub
- VS Code
- Postman for API testing

> Postman is used only as an optional development and API testing tool. It is not required to use the website.

---

## Project Structure

```text
cara-ecommerce-mern/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── makeAdmin.js
│   ├── seedProducts.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── Images/
│   ├── js/
│   │   ├── cart.js
│   │   └── products.js
│   │
│   ├── index.html
│   ├── shop.html
│   ├── Single_product.html
│   ├── cart.html
│   ├── orders.html
│   ├── login.html
│   ├── register.html
│   ├── admin.html
│   ├── manage-products.html
│   ├── manage-orders.html
│   ├── blog.html
│   ├── about.html
│   ├── contact.html
│   ├── script.js
│   └── style.css
│
└── README.md
```

---

# Running the Project Locally

CARA does not need to be deployed in order to run.

You can clone the repository and run the frontend, backend, and database functionality locally.

---

## Prerequisites

Install or have access to the following:

- Node.js
- npm
- Git
- MongoDB Atlas account
- A modern web browser

VS Code is recommended but not required.

If you want to use the instructions below for starting the frontend, install the **Live Server** extension in VS Code.

---

## 1. Clone the Repository

Clone the project:

```bash
git clone https://github.com/Mansi06Salar/cara-ecommerce-mern.git
```

Move into the cloned project:

```bash
cd cara-ecommerce-mern
```

---

## 2. Install Backend Dependencies

Move into the backend directory:

```bash
cd backend
```

Install the required Node.js packages:

```bash
npm install
```

This installs the dependencies listed in `package.json`.

---

## 3. Configure Environment Variables

The real `.env` file is intentionally excluded from GitHub because it contains private credentials.

A template is provided in:

```text
backend/.env.example
```

Create a new file called:

```text
.env
```

inside the `backend` directory.

Your backend directory should then contain both:

```text
.env
.env.example
```

Add the following variables to `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your own configuration.

---

### MongoDB Setup

Create or use a MongoDB Atlas cluster and obtain your MongoDB connection string.

A connection string has a format similar to:

```text
mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER/DATABASE_NAME
```

Replace:

- `USERNAME` with your MongoDB database username
- `PASSWORD` with your MongoDB database password
- `YOUR_CLUSTER` with your Atlas cluster address
- `DATABASE_NAME` with the database name you want CARA to use

For example, you may choose a database name such as:

```text
cara_ecommerce
```

MongoDB can create the database when the application first writes data to it.

> Never commit your real MongoDB URI, username, or password to GitHub.

---

### JWT Secret

Set `JWT_SECRET` to your own private random string.

For example:

```env
JWT_SECRET=replace_this_with_your_own_long_random_secret
```

The JWT secret is used by the backend to sign and verify authentication tokens.

Do not commit your real JWT secret to GitHub.

---

## 4. Seed the Product Database

A new MongoDB database will not initially contain CARA products.

The project includes a product seed script that inserts the sample product catalog.

From the `backend` directory, run:

```bash
npm run seed
```

A successful run should display output similar to:

```text
MongoDB Connected

Added: Cartoon Astronaut Shirts
Added: MILDIN Printed Spread Collar Shirt
...

Product seeding completed!
Added: 16
Skipped: 0

MongoDB connection closed.
```

The exact output may vary.

The seed script avoids inserting the same seeded products repeatedly.

---

## 5. Start the Backend

From the `backend` directory, run:

```bash
npm run dev
```

Alternatively:

```bash
npm start
```

When the connection succeeds, the terminal should display:

```text
MongoDB Connected
Server running on port 5000
```

The backend API will run locally on port `5000`.

You can verify the backend by opening:

```text
http://localhost:5000
```

The browser should display:

```text
Backend Running
```

> Keep this terminal running while using the CARA website.

---

## 6. Start the Frontend

Open the cloned project in VS Code.

Navigate to:

```text
frontend/index.html
```

If you are using the VS Code Live Server extension:

1. Right-click `frontend/index.html`.
2. Select **Open with Live Server**.
3. The CARA homepage will open in your browser.

Keep the backend running at the same time.

---

## 7. Create and Login as a Customer

There are no predefined customer credentials.

You can create your own customer account.

1. Open the **Register** page.
2. Enter any new name, email, and password.
3. Submit the registration form.
4. Go to the **Login** page.
5. Enter the same email and password used during registration.
6. Login to the website.

For example:

```text
Name: Test User
Email: testuser@example.com
Password: Test@12345
```

These are example credentials only. You may register your own credentials.

A newly registered account receives the default role:

```text
user
```

After login, the customer can:

- Browse products
- View product details
- Select size and quantity
- Add products to the cart
- Update or remove cart items
- Checkout
- Place orders
- View order history
- View updated order status

> The email used for registration must be new for that database. To login, use the same email and password that were used during registration.

---

## 8. Create and Login as an Admin

There are **no predefined or hardcoded admin credentials**.

An admin account is created by first registering a normal account and then promoting that account to the `admin` role.

### Step 1 — Register an Account

Open the CARA **Register** page and create an account normally.

For example:

```text
Name: Test Admin
Email: admin@example.com
Password: Admin@12345
```

These are example credentials only.

Remember the email and password used during registration.

At this point, the account still has the normal:

```text
user
```

role.

### Step 2 — Promote the Account to Admin

Open a terminal in the `backend` directory.

Run:

```bash
npm run make-admin -- registered-email@example.com
```

For example:

```bash
npm run make-admin -- admin@example.com
```

The email passed to `make-admin` must be the same email that was previously registered through the website.

A successful command should display something similar to:

```text
MongoDB Connected
admin@example.com is now an admin.
MongoDB connection closed.
```

### Step 3 — Login as Admin

Return to the CARA Login page.

Login using the **same email and password that were used when registering the account**.

For example:

```text
Email: admin@example.com
Password: Admin@12345
```

The **Dashboard** option will now become available.

> `make-admin` changes only the account role from `user` to `admin`. It does not create a new password or change the password used during registration.

The admin can then access the protected dashboard and product/order management functionality.

---

# Application Flow

## Customer Flow

```text
Register
   ↓
Login
   ↓
Browse Shop
   ↓
View Product
   ↓
Select Size & Quantity
   ↓
Add to Cart
   ↓
Checkout
   ↓
Order Stored in MongoDB
   ↓
View My Orders
   ↓
View Current Order Status
```

---

## Admin Flow

```text
Register Account
      ↓
Promote Account with make-admin
      ↓
Admin Login
      ↓
Admin Dashboard
      ↓
View Products / Orders / Revenue
      ↓
Manage Products
      ↓
Manage Customer Orders
      ↓
Update Order Status
```

When an administrator updates an order status, the customer can view the updated status from the Orders page.

---

# Database Collections

MongoDB stores application data in collections including:

## Users

Stores information such as:

- Name
- Email
- Hashed password
- Role

User roles include:

```text
user
admin
```

---

## Products

Stores information such as:

- Product name
- Category
- Price
- Description
- Image
- Stock

---

## Carts

Stores customer shopping-cart data.

---

## Orders

Stores information such as:

- Customer
- Purchased products
- Quantity
- Size
- Total amount
- Order status
- Timestamps

---

# Authentication and Authorization

CARA uses JWT-based authentication.

After successful login, the frontend stores the authentication token and sends it to protected backend routes using:

```text
Authorization: Bearer <token>
```

The backend verifies the token before allowing access to protected resources.

Admin routes additionally verify that the authenticated account has the:

```text
admin
```

role.

This prevents normal customer accounts from accessing protected admin functionality.

---

# API Overview

The backend provides API routes for:

```text
/api/auth
/api/products
/api/cart
/api/orders
/api/admin
```

Example endpoints include:

```text
POST /api/auth/register
POST /api/auth/login

GET  /api/products
GET  /api/products/:id

GET  /api/cart
POST /api/cart

GET  /api/orders

GET  /api/admin/dashboard
GET  /api/admin/orders
```

Additional methods and endpoints are used for product management, cart operations, checkout, order creation, and admin order management.

---

# Security Notes

Sensitive information is not committed to the repository.

The following are excluded from Git:

```text
.env
node_modules/
```

Never commit:

- MongoDB passwords
- MongoDB connection strings containing credentials
- JWT secrets
- Private environment variables

The repository contains:

```text
.env.example
```

to show which environment variables are required without exposing real credentials.

Each developer cloning the project should create their own `.env` file.

---

# Testing

The project has been tested from a fresh GitHub clone using a separate local project directory and MongoDB database.

The setup flow tested included:

```text
Clone Repository
→ npm install
→ Create .env
→ Connect MongoDB
→ Seed Products
→ Start Backend
→ Start Frontend
```

### Customer Flow Tested

```text
Register New Customer
→ Login
→ Browse Products
→ View Product
→ Add to Cart
→ Checkout
→ Place Order
→ View Order
```

### Admin Flow Tested

```text
Register New Account
→ Promote Account with make-admin
→ Login as Admin
→ Open Dashboard
→ View Products
→ View Customer Orders
→ Update Order Status
```

The customer can then view the updated order status from their Orders page.

Postman can optionally be used to test backend API endpoints directly, but it is not required to run the website.

---

# Troubleshooting

### Backend does not start

Make sure:

- `npm install` has completed successfully
- `.env` exists inside the `backend` directory
- `MONGO_URI` contains a valid MongoDB Atlas connection string
- `JWT_SECRET` is defined
- Your MongoDB Atlas network/database access is configured correctly

### Products do not appear

Make sure the backend is running and execute:

```bash
npm run seed
```

from the `backend` directory.

### Login does not work

Make sure you first registered the account and are using the same email and password used during registration.

### Dashboard does not appear

New accounts are normal users by default.

From the backend directory, promote the registered account:

```bash
npm run make-admin -- registered-email@example.com
```

Then login using the same registered email and password.

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
- Password reset
- Cloud image storage
- Production deployment

---

## Author

**Mansi Salar**

B.Tech Computer Science & Engineering

---

## Project Status

CARA E-Commerce V2 is a functional full-stack e-commerce application with:

- Customer authentication
- JWT authorization
- MongoDB-backed products
- Shopping cart functionality
- Checkout and order management
- Customer order history
- Role-based admin access
- Product management
- Customer order management
- Admin dashboard and revenue overview

The application can be cloned from GitHub and configured to run locally using the setup instructions provided above.
