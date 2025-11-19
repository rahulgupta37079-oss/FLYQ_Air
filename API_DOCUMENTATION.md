# 🚀 FLYQ Air - Complete Backend API Documentation

## 📋 Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Order Management APIs](#order-management-apis)
3. [Product Management APIs](#product-management-apis)
4. [User Profile APIs](#user-profile-apis)
5. [Cart Management APIs](#cart-management-apis)
6. [Product Reviews APIs](#product-reviews-apis)
7. [Wishlist APIs](#wishlist-apis)
8. [Search & Filter APIs](#search--filter-apis)
9. [Analytics APIs](#analytics-apis)
10. [Newsletter & Contact APIs](#newsletter--contact-apis)

---

## 🔐 Authentication APIs

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "redirect": "/account"
}
```

---

### POST `/api/auth/login`
Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "redirect": "/account"
}
```

**Session Cookie:** Sets `session` cookie with 7-day expiry

---

### POST `/api/auth/logout`
Logout current user session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### GET `/api/auth/status`
Check current authentication status.

**Response:**
```json
{
  "authenticated": true,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

---

## 📦 Order Management APIs

### POST `/api/orders/create`
Create a new order from cart items.

**Authentication:** Required

**Request Body:**
```json
{
  "items": [
    {"productId": 1, "quantity": 2, "price": 4999},
    {"productId": 2, "quantity": 1, "price": 8999}
  ],
  "total": 18997,
  "shippingAddress": "123 Main St, City, State 12345",
  "billingAddress": "123 Main St, City, State 12345",
  "paymentMethod": "razorpay"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "orderId": 1,
  "orderNumber": "ORD-1234567890"
}
```

---

### GET `/api/orders`
Get all orders for current user.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": 1,
      "order_number": "ORD-1234567890",
      "status": "pending",
      "total": 18997,
      "created_at": "2025-11-09T16:30:00Z"
    }
  ]
}
```

---

### GET `/api/orders/:id`
Get detailed order information.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "order": {
    "id": 1,
    "order_number": "ORD-1234567890",
    "status": "confirmed",
    "total": 18997,
    "items": [
      {
        "product_name": "FLYQ Air",
        "quantity": 2,
        "price": 4999
      }
    ]
  }
}
```

---

### POST `/api/orders/cancel`
Cancel an existing order.

**Authentication:** Required

**Request Body:**
```json
{
  "orderId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order cancelled successfully"
}
```

**Notes:**
- Can only cancel orders with status 'pending' or 'confirmed'
- User must own the order or be admin

---

### GET `/api/admin/orders`
Get all orders (Admin only).

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": 1,
      "order_number": "ORD-1234567890",
      "user_name": "John Doe",
      "user_email": "john@example.com",
      "status": "pending",
      "total": 18997,
      "created_at": "2025-11-09T16:30:00Z"
    }
  ]
}
```

---

### POST `/api/admin/orders/update-status`
Update order status (Admin only).

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "orderId": 1,
  "status": "shipped"
}
```

**Valid Statuses:** `pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`

**Response:**
```json
{
  "success": true,
  "message": "Order status updated"
}
```

---

## 🛍️ Product Management APIs

### GET `/api/products`
Get all products (Public).

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "FLYQ Air",
      "slug": "flyq-air",
      "price": 4999,
      "stock": 50,
      "image_url": "https://...",
      "category": "Drones"
    }
  ]
}
```

---

### GET `/api/products/:slug`
Get single product by slug (Public).

**Response:**
```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "FLYQ Air",
    "slug": "flyq-air",
    "description": "Programmable drone with ESP32-S3",
    "price": 4999,
    "stock": 50,
    "specifications": "{...}"
  }
}
```

---

### POST `/api/admin/products`
Create new product (Admin only).

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "FLYQ Air Pro",
  "slug": "flyq-air-pro",
  "description": "Advanced programmable drone",
  "short_description": "ESP32-S3 based drone",
  "price": 5999,
  "image_url": "https://...",
  "gallery_images": "[...]",
  "stock": 30,
  "featured": 1,
  "category": "Drones",
  "specifications": "{...}"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created",
  "productId": 3
}
```

---

### PUT `/api/admin/products/:id`
Update existing product (Admin only).

**Authentication:** Required (Admin)

**Request Body:** Same as create

**Response:**
```json
{
  "success": true,
  "message": "Product updated"
}
```

---

### DELETE `/api/admin/products/:id`
Delete product (Admin only).

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "message": "Product deleted"
}
```

---

## 👤 User Profile APIs

### GET `/api/user/profile`
Get current user profile.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "+91 9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}
```

---

### PUT `/api/user/profile`
Update user profile.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+91 9876543210",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

---

### POST `/api/user/change-password`
Change user password.

**Authentication:** Required

**Request Body:**
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Validations:**
- New password must be at least 8 characters
- Current password must match

---

## 🛒 Cart Management APIs

### GET `/api/cart`
Get user's cart items.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "name": "FLYQ Air",
      "quantity": 2,
      "price": 4999,
      "image_url": "https://...",
      "stock": 50
    }
  ]
}
```

---

### POST `/api/cart/add`
Add item to cart.

**Authentication:** Required

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Added to cart"
}
```

**Features:**
- Checks product stock availability
- Updates quantity if item already in cart
- Validates sufficient stock

---

### PUT `/api/cart/update`
Update cart item quantity.

**Authentication:** Required

**Request Body:**
```json
{
  "cartItemId": 1,
  "quantity": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cart updated"
}
```

---

### DELETE `/api/cart/remove/:itemId`
Remove item from cart.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

---

### DELETE `/api/cart/clear`
Clear entire cart.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## ⭐ Product Reviews APIs

### GET `/api/products/:slug/reviews`
Get all reviews for a product (Public).

**Response:**
```json
{
  "success": true,
  "reviews": [
    {
      "id": 1,
      "user_name": "John Doe",
      "rating": 5,
      "title": "Excellent product!",
      "comment": "Great drone for learning...",
      "verified_purchase": 1,
      "created_at": "2025-11-09T16:30:00Z"
    }
  ],
  "averageRating": 4.5,
  "totalReviews": 12
}
```

---

### POST `/api/products/:slug/reviews`
Add review for a product.

**Authentication:** Required

**Request Body:**
```json
{
  "rating": 5,
  "title": "Excellent product!",
  "comment": "This drone is amazing for beginners..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review added successfully"
}
```

**Features:**
- Automatic verified purchase detection
- User can only review once per product
- Rating must be 1-5

---

## ❤️ Wishlist APIs

### GET `/api/wishlist`
Get user's wishlist.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "wishlist_id": 1,
      "id": 2,
      "name": "FLYQ Vision",
      "price": 8999,
      "image_url": "https://..."
    }
  ]
}
```

---

### POST `/api/wishlist/add`
Add product to wishlist.

**Authentication:** Required

**Request Body:**
```json
{
  "productId": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Added to wishlist"
}
```

---

### DELETE `/api/wishlist/remove/:productId`
Remove product from wishlist.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Removed from wishlist"
}
```

---

## 🔍 Search & Filter APIs

### GET `/api/products/search`
Search and filter products (Public).

**Query Parameters:**
- `q` - Search query (searches name, description, category)
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sortBy` - Sort field (created_at, price, name)
- `order` - Sort order (ASC, DESC)

**Example:**
```
GET /api/products/search?q=drone&category=Drones&minPrice=3000&maxPrice=10000&sortBy=price&order=ASC
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "FLYQ Air",
      "price": 4999,
      "category": "Drones"
    }
  ]
}
```

---

## 📊 Analytics APIs

### POST `/api/analytics/track`
Track page visit (Automatic).

**Request Body:**
```json
{
  "pageUrl": "/products",
  "pageTitle": "Products | FLYQ"
}
```

**Response:**
```json
{
  "success": true
}
```

**Tracked Data:**
- Page URL and title
- User agent and IP address
- Referrer
- User ID (if logged in)
- Timestamp

---

### GET `/api/analytics/dashboard`
Get analytics dashboard data (Admin only).

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalVisits": 1234,
      "uniqueVisitors": 567,
      "visitsToday": 89,
      "newUsersWeek": 12
    },
    "popularPages": [...],
    "recentVisits": [...],
    "dailyVisits": [...]
  }
}
```

---

## 📧 Newsletter & Contact APIs

### POST `/api/newsletter/subscribe`
Subscribe to newsletter (Public).

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!"
}
```

---

### POST `/api/contact/submit`
Submit contact form (Public).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I would like to know more about..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

---

### GET `/api/contact/submissions`
Get all contact submissions (Admin only).

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "submissions": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Product Inquiry",
      "message": "...",
      "status": "new",
      "created_at": "2025-11-09T16:30:00Z"
    }
  ]
}
```

---

### POST `/api/contact/update-status`
Update contact submission status (Admin only).

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "id": 1,
  "status": "replied"
}
```

**Valid Statuses:** `new`, `read`, `replied`, `archived`

**Response:**
```json
{
  "success": true,
  "message": "Status updated"
}
```

---

## 🔒 Authentication & Authorization

### Session Management
- Sessions are stored in `sessions` table
- Session cookies are HttpOnly (XSS protection)
- 7-day expiration by default
- Automatic cleanup of expired sessions

### Admin Access
Admin-only endpoints check `is_admin` flag in users table:
```sql
SELECT is_admin FROM users WHERE id = ?
```

Admin endpoints return 403 if not admin.

### Rate Limiting
(To be implemented in production)
- Recommended: 100 requests per minute per IP
- Authentication endpoints: 5 requests per minute

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  is_admin INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price REAL NOT NULL,
  image_url TEXT,
  gallery_images TEXT,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT 0,
  category TEXT,
  specifications TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  total REAL NOT NULL,
  subtotal REAL NOT NULL,
  tax REAL DEFAULT 0,
  shipping REAL DEFAULT 0,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  shipping_address TEXT,
  billing_address TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

[Additional tables: order_items, cart_items, wishlist, reviews, sessions, curriculum_access, page_visits, popular_pages, analytics_daily, contact_submissions, newsletter_subscriptions]

---

## 🧪 Testing Examples

### Test Authentication
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@123","confirmPassword":"Test@123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}' \
  -c cookies.txt

# Check status
curl http://localhost:3000/api/auth/status -b cookies.txt
```

### Test Cart Flow
```bash
# Add to cart
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"productId":1,"quantity":2}'

# View cart
curl http://localhost:3000/api/cart -b cookies.txt

# Update quantity
curl -X PUT http://localhost:3000/api/cart/update \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"cartItemId":1,"quantity":3}'

# Remove item
curl -X DELETE http://localhost:3000/api/cart/remove/1 -b cookies.txt
```

### Test Product Search
```bash
# Search products
curl "http://localhost:3000/api/products/search?q=drone&sortBy=price&order=ASC"

# Filter by category and price
curl "http://localhost:3000/api/products/search?category=Drones&minPrice=3000&maxPrice=6000"
```

---

## 📊 API Statistics

- **Total Endpoints:** 35+
- **Public Endpoints:** 10
- **Authenticated Endpoints:** 15
- **Admin-Only Endpoints:** 10
- **HTTP Methods:** GET, POST, PUT, DELETE
- **Response Format:** JSON
- **Authentication:** Session-based (HttpOnly cookies)

---

## 🚀 Deployment

### Local Development
```bash
npm run build
pm2 start ecosystem.config.cjs
```

### Production (Cloudflare Pages)
```bash
npm run build
npx wrangler pages deploy dist --project-name flyq-air
```

---

## 🔐 Security Features

✅ Password hashing with bcryptjs (10 rounds)
✅ HttpOnly session cookies (XSS protection)
✅ SQL injection protection (prepared statements)
✅ Input validation on all endpoints
✅ Admin authorization checks
✅ Stock validation on cart operations
✅ Order ownership verification
✅ CSRF protection (recommended for production)

---

## 📝 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (database issue)

---

**Last Updated:** November 9, 2025
**Version:** 1.0
**Status:** ✅ Fully Functional and Tested
