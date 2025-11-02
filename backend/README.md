# Pakkacourse Backend API

A Node.js backend API for the Pakkacourse application with authentication and link management features.

## Features

- **Authentication System**
  - User login with JWT tokens
  - User registration
  - Protected routes with middleware
  - Password hashing with bcrypt

- **Link Management**
  - Get all links with filtering and pagination
  - Insert and update links in bulk
  - Soft delete functionality
  - Category and tag-based organization

- **Security Features**
  - Helmet for security headers
  - Rate limiting
  - CORS configuration
  - Input validation
  - JWT token authentication

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get current user profile

### Links
- `GET /api/links` - Get all links (with filtering)
- `GET /api/links/:id` - Get single link by ID
- `POST /api/links` - Insert/update links (bulk operation)
- `DELETE /api/links/:id` - Delete a link

### Utility
- `GET /health` - Health check endpoint
- `GET /` - API information

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
# Database Configuration
MONGODB_URI=

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=https://pakkacourse.onrender.com/
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (currently empty as requested)
- `JWT_SECRET` - Secret key for JWT token signing
- `JWT_EXPIRES_IN` - JWT token expiration time
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin

## API Usage Examples

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Get Links
```bash
curl http://localhost:3001/api/links?category=course&page=1&limit=10
```

### Insert/Update Links
```bash
curl -X POST http://localhost:3001/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "links": [
      {
        "title": "React Tutorial",
        "url": "https://reactjs.org/tutorial",
        "description": "Official React tutorial",
        "category": "tutorial",
        "tags": ["react", "javascript", "frontend"]
      }
    ]
  }'
```

## Database Models

### User
- username (unique)
- email (unique)
- password (hashed)
- role (user/admin)
- isActive

### Link
- title
- url
- description
- category (course/resource/tutorial/documentation/other)
- tags (array)
- isActive
- createdBy (User reference)
- lastUpdatedBy (User reference)

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS protection
- Security headers with Helmet

## Development

The server uses nodemon for development with hot reloading. Make sure to set up your MongoDB connection string in the `.env` file when ready to connect to a database.
