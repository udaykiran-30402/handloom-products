# Handloom Products - Global E-Commerce Platform

A comprehensive full-stack web application to display and sell handloom fashion products to buyers around the world. The platform highlights the uniqueness of handloom items and helps artisans reach a global audience.

## Features

### For Buyers
- Browse handloom products by category, price range, and search keywords
- View detailed product information including artisan details
- Place orders and track order status
- Submit product reviews and ratings
- Manage profile and addresses
- Filter products by multiple criteria

### For Artisans
- List and manage handloom products
- Track inventory and orders
- View buyer feedback and reviews
- Manage product pricing and descriptions
- Monitor order fulfillment

### For Admins
- Oversee platform operations
- Manage user roles and permissions
- Monitor all user activities
- View analytics and reports
- Manage content accuracy

### For Marketing Specialists
- Promote handloom products
- Manage marketing campaigns
- Engage with global audiences
- Monitor campaign performance

## Technical Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Environment**: Environment variables (.env)

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design
- **JavaScript**: ES6+ with async/await
- **API Integration**: Fetch API with error handling

## Project Structure

```
handloom-products/
├── config/
│   └── database.js          # MongoDB connection configuration
├── middleware/
│   └── auth.js              # JWT authentication & authorization
├── models/
│   ├── User.js              # User schema with all roles
│   ├── Product.js           # Product schema with artisan references
│   ├── Order.js             # Order schema with payment tracking
│   └── Review.js            # Review schema with ratings
├── routes/
│   ├── auth.js              # Authentication endpoints
│   ├── products.js          # Product CRUD endpoints
│   └── users.js             # User management endpoints
├── public/
│   ├── index.html           # Main HTML page
│   ├── css/
│   │   └── style.css        # Responsive styling
│   └── js/
│       └── app.js           # Frontend JavaScript
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── server.js                # Express server entry point
├── Procfile                 # Deployment configuration
└── README.md                # This file
```

## Database Models

### User Model
- Email (unique, required)
- Password (hashed)
- Name
- Role (Buyer, Artisan, Admin, Marketing Specialist)
- Profile image
- Bio
- Address information
- Contact details

### Product Model
- Name
- Description
- Category (Saree, Kurta, Dress, Shawl, Fabric, Other)
- Price
- Artisan reference
- Images
- Stock quantity
- Ratings and reviews

### Order Model
- Buyer ID
- Items (products with quantity)
- Total amount
- Status (Pending, Confirmed, Shipped, Delivered, Cancelled)
- Shipping address
- Payment method
- Payment status
- Artisan payments

### Review Model
- Product ID
- Buyer ID
- Rating (1-5)
- Title and comment
- Images
- Helpful/unhelpful counts
- Verified purchase flag

## User Roles & Permissions

### Buyer
- Browse products
- Place orders
- Submit reviews
- Manage profile

### Artisan
- Create and manage products
- View orders for own products
- Update product information
- Track inventory

### Admin
- Access all user management endpoints
- View all products
- Manage system users
- Delete products if needed

### Marketing Specialist
- Access marketing analytics
- Create campaigns
- Promote featured products

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/udaykiran-30402/handloom-products.git
   cd handloom-products
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/handloom
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   The application will be available at `http://localhost:5000`

## API Documentation

### Authentication Routes (`/api/auth`)

#### POST /signup
- Register a new user
- Body: `{ email, password, name, role }`
- Returns: User object with JWT token

#### POST /login
- Authenticate user
- Body: `{ email, password }`
- Returns: User object with JWT token

#### GET /profile
- Get authenticated user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User object

### Products Routes (`/api/products`)

#### GET /
- List all products with filters
- Query params: `category`, `minPrice`, `maxPrice`, `search`
- Returns: Array of products

#### GET /:id
- Get single product details
- Returns: Product object with artisan info

#### POST /
- Create new product (Artisan only)
- Headers: `Authorization: Bearer <token>`
- Body: Product details
- Returns: Created product

#### PUT /:id
- Update product (Artisan or Admin)
- Headers: `Authorization: Bearer <token>`
- Body: Updated product details
- Returns: Updated product

#### DELETE /:id
- Delete product (Artisan or Admin)
- Headers: `Authorization: Bearer <token>`
- Returns: Success message

### Users Routes (`/api/users`)

#### GET /profile
- Get authenticated user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User profile

#### PUT /profile
- Update user profile
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, email, phone, bio, address }`
- Returns: Updated user

#### GET /
- List all users (Admin only)
- Query params: `role`, `search`
- Returns: Array of users

#### GET /:id
- Get user by ID (Admin or own profile)
- Returns: User object

#### DELETE /:id
- Delete user (Admin or own account)
- Returns: Success message

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Enabled**: Cross-Origin Resource Sharing for global access
- **Environment Variables**: Sensitive data in .env files
- **Role-Based Access**: Different permissions for different roles
- **Input Validation**: Data validation on all endpoints
- **Error Handling**: Comprehensive error handling

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Deploy to Render

1. Connect GitHub repository to Render
2. Set environment variables
3. Deploy with `npm start` command

## Environment Variables

Required environment variables (see `.env.example`):

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production
```

## Running Tests

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, email support@handloomproducts.com or open an issue in the GitHub repository.

## Acknowledgments

- Handloom artisans around the world
- Open-source community
- Node.js and Express.js teams
- MongoDB for database solutions
