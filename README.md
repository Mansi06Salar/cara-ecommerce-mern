# CARA E-Commerce V2

CARA E-Commerce V2 is a full-stack e-commerce web application built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and JWT authentication.

The project includes customer authentication, dynamic products, shopping cart functionality, order placement, order history, role-based authorization, and an admin dashboard for managing products and customer orders.

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

> Postman is only used as a development/testing tool. It is not required to use the website.

---

## Project Structure

```text
cara-ecommerce-v2/
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

The project is not required to be deployed to work.

You can clone the repository and run the complete frontend, backend, and database functionality locally.

---

## Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git
- A MongoDB Atlas account
- A modern web browser

VS Code is recommended but not required.

---

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd cara-ecommerce-v2
```

---

## 2. Install Backend Dependencies

Move into the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

This installs all packages listed in `package.json`.

---

## 3. Configure Environment Variables

The real `.env` file is intentionally excluded from GitHub because it contains private credentials.

A template is provided:

```text
backend/.env.example
```

Create a new file named:

```text
.env
```

inside the `backend` directory.

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your own credentials.

### MongoDB URI

Create a MongoDB Atlas database and obtain your connection string.

Example format:

```text
mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER/DATABASE_NAME
```

Do not commit your real MongoDB credentials to GitHub.

### JWT Secret

Set `JWT_SECRET` to a private random string.

For example:

```env
JWT_SECRET=replace_this_with_your_own_long_random_secret
```

---

## 4. Seed the Product Database

A fresh MongoDB database does not contain any products.

CARA includes a product seed script.

Run:

```bash
npm run seed
```

This inserts the sample CARA product catalog into your MongoDB database.

The script avoids inserting products with the same seeded names more than once.

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

When the connection is successful, the terminal should display messages similar to:

```text
MongoDB Connected
Server running on port 5000
```

The API runs locally on port `5000`.

---

## 6. Start the Frontend

Open the `frontend` directory using a local development server.

For example, if you use VS Code with the Live Server extension:

1. Open `frontend/index.html`.
2. Right-click the file.
3. Select **Open with Live Server**.

The browser will open the CARA website.

Keep the backend terminal running while using the application.

---

# Creating a Customer Account

Open the Register page from the website.

Enter:

- Name
- Email
- Password

After registration, log in using the account you created.

New accounts have the role:

```text
user
```

Customers can then use the Shop, Cart, Checkout, and Orders functionality.

---

# Creating an Admin Account

Admin access is not enabled for newly registered users by default.

First, register an account through the CARA website.

Then, from the `backend` directory, run:

```bash
npm run make-admin -- your@email.com
```

Example:

```bash
npm run make-admin -- admin@example.com
```

The script changes that registered user's role from:

```text
user
```

to:

```text
admin
```

Log in again with that account.

The Dashboard option will then be available.

---

# Application Flow

## Customer Flow

```text
Register / Login
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
```

## Admin Flow

```text
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

A customer can then view the updated order status from the Orders page.

---

# Database Collections

MongoDB stores application data in collections including:

### Users

Stores:

- Name
- Email
- Hashed password
- Role

### Products

Stores:

- Product name
- Category
- Price
- Description
- Image
- Stock

### Carts

Stores customer shopping-cart data.

### Orders

Stores:

- Customer
- Purchased items
- Quantity
- Size
- Total amount
- Order status
- Timestamps

---

# Authentication

Protected backend routes use JWT authentication.

After successful login, the frontend stores the authentication token and sends it to protected API routes using:

```text
Authorization: Bearer <token>
```

The backend verifies the token before allowing access to protected resources.

Admin routes additionally verify that the authenticated user has the `admin` role.

---

# API Overview

The backend contains API routes for:

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

GET  /api/products
GET  /api/products/:id

GET  /api/cart
POST /api/cart

GET  /api/orders

GET  /api/admin/dashboard
GET  /api/admin/orders
```

Additional methods are used for product, cart, checkout, and order-management operations.

---

# Security Notes

The following files/directories are excluded from Git:

```text
.env
node_modules/
```

Never commit:

- MongoDB passwords
- MongoDB connection strings containing credentials
- JWT secrets
- Other private environment variables

Use `.env.example` to document required configuration without exposing secrets.

---

# Testing

The application has been tested through the complete customer and admin flow.

Customer flow:

```text
Register
→ Login
→ Browse Product
→ Add to Cart
→ Checkout
→ Order Created
→ View Orders
```

Admin flow:

```text
Admin Login
→ Dashboard
→ View Customer Order
→ Update Order Status
```

The customer can then see the updated order status in their account.

Postman can optionally be used to test backend API endpoints directly.

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

CARA E-Commerce V2 is a functional full-stack e-commerce application with customer authentication, MongoDB-backed products, cart and order management, and role-based admin functionality.