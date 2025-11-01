# Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Copy `env.example` to `.env` and update the values:
```bash
cp env.example .env
```

Make sure to set:
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - A secure random string
- `SESSION_SECRET` - A secure random string (new)
- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - Frontend URL (default: http://localhost:5173)

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 4. Access Swagger Documentation
Once the server is running, open your browser and navigate to:
```
http://localhost:3001/api-docs
```

## Testing the API

### Using Swagger UI (Recommended)
1. Go to `http://localhost:3001/api-docs`
2. Click on `POST /api/auth/login`
3. Click "Try it out"
4. Enter your credentials
5. Click "Execute"
6. The token will be automatically stored in your session
7. Try other authenticated endpoints - they'll work automatically!

### Using cURL
```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"your_username","password":"your_password"}' \
  -c cookies.txt

# Use the session cookie for authenticated requests
curl -X GET http://localhost:3001/api/auth/profile \
  -b cookies.txt

# Or use Bearer token
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman
1. Import the Swagger JSON from `http://localhost:3001/api-docs.json`
2. For session-based auth: Enable "Save cookies" in Postman settings
3. For Bearer token: Add Authorization header with value `Bearer <token>`

## Key Features

✅ **Session-Based Authentication**: Login once, token stored in session automatically
✅ **Bearer Token Support**: Traditional JWT authentication also supported
✅ **Interactive Documentation**: Test all endpoints directly from Swagger UI
✅ **Auto Token Persistence**: No need to copy/paste tokens between requests
✅ **Dual Auth Methods**: Use either session cookies or Bearer tokens

## Endpoints Overview

### Public Endpoints
- `GET /` - API information
- `GET /health` - Health check
- `GET /api-docs` - Swagger documentation
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/links` - Get all links
- `GET /api/links/:id` - Get single link

### Protected Endpoints (Require Authentication)
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout
- `POST /api/links` - Create/update links
- `DELETE /api/links/:id` - Delete link

## Troubleshooting

**Server won't start:**
- Check if port 3001 is already in use
- Verify database connection in `.env`
- Ensure all dependencies are installed

**Authentication not working:**
- Make sure you've logged in first
- Check if session secret is set in `.env`
- Clear browser cookies and try again

**Swagger UI not loading:**
- Verify server is running
- Check console for errors
- Try accessing `http://localhost:3001/api-docs.json` directly

## Next Steps

1. ✅ Server is configured with Swagger
2. ✅ Session-based authentication is enabled
3. ✅ All endpoints are documented
4. 🎯 Start testing your API with Swagger UI!

For detailed documentation, see `SWAGGER_SETUP.md`