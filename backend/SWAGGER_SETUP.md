# Swagger API Documentation Setup

## Overview
This document explains the Swagger/OpenAPI documentation setup for the PakkaCourse Backend API with session-based authentication.

## Features
- ✅ Interactive API documentation with Swagger UI
- ✅ Session-based token storage
- ✅ Support for both Bearer token and session authentication
- ✅ Try-it-out functionality for all endpoints
- ✅ Automatic token persistence across requests

## Installation

The required packages are already installed:
```bash
npm install swagger-ui-express swagger-jsdoc express-session cookie-parser
```

## Configuration

### Environment Variables
Add the following to your `.env` file:
```env
SESSION_SECRET=your_secure_session_secret_here
```

### Swagger Configuration
The Swagger configuration is located in `config/swagger.js` and includes:
- API metadata (title, version, description)
- Server URLs (development and production)
- Security schemes (Bearer token and session-based auth)
- Reusable schemas for requests and responses

## Accessing the Documentation

Once the server is running, access the Swagger UI at:
```
http://localhost:3001/api-docs
```

The Swagger JSON specification is available at:
```
http://localhost:3001/api-docs.json
```

## Authentication Methods

### Method 1: Bearer Token Authentication
1. Call the `/api/auth/login` endpoint with your credentials
2. Copy the token from the response
3. Click the "Authorize" button at the top of Swagger UI
4. Enter: `Bearer <your-token-here>`
5. Click "Authorize"
6. All subsequent requests will include the token

### Method 2: Session-Based Authentication (Recommended)
1. Call the `/api/auth/login` endpoint directly from Swagger UI
2. The token is automatically stored in the session
3. All subsequent requests will use the session token automatically
4. No need to manually copy/paste tokens

## How It Works

### Session Storage
When you login via `/api/auth/login`:
- The JWT token is generated
- Token is stored in `req.session.token`
- User data is stored in `req.session.user`
- Session cookie is sent to the browser

### Authentication Middleware
The `auth` middleware (`middleware/auth.js`) checks for authentication in this order:
1. **Bearer Token**: Checks `Authorization` header for `Bearer <token>`
2. **Session Token**: If no Bearer token, checks `req.session.token`
3. **Validation**: Verifies the token and attaches user to `req.user`

### Logout
Call `/api/auth/logout` to:
- Destroy the session
- Clear the session cookie
- Invalidate the token

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get token (stored in session)
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get current user profile (requires auth)
- `POST /api/auth/logout` - Logout and clear session (requires auth)

### Links Management
- `GET /api/links` - Get all links (public)
- `GET /api/links/:id` - Get single link (public)
- `POST /api/links` - Create/update links (requires auth)
- `DELETE /api/links/:id` - Delete link (requires auth)

## Testing with Swagger UI

### Example: Login and Create Link
1. Open Swagger UI at `http://localhost:3001/api-docs`
2. Expand `POST /api/auth/login`
3. Click "Try it out"
4. Enter credentials:
   ```json
   {
     "username": "your_username",
     "password": "your_password"
   }
   ```
5. Click "Execute"
6. Token is now stored in session automatically
7. Expand `POST /api/links`
8. Click "Try it out"
9. Enter link data:
   ```json
   {
     "links": [
       {
         "linkname": "Test Link",
         "link": "https://example.com",
         "linktype": "resource"
       }
     ]
   }
   ```
10. Click "Execute" - Request will use session token automatically

## Session Configuration

Sessions are configured in `server.js`:
```javascript
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
```

### Cookie Settings
- **httpOnly**: Prevents JavaScript access to cookies (security)
- **secure**: Only send cookies over HTTPS in production
- **maxAge**: Session expires after 24 hours

## Security Best Practices

1. **Environment Variables**: Always use strong secrets in production
2. **HTTPS**: Enable `secure: true` for cookies in production
3. **Session Expiry**: Tokens expire after 24 hours by default
4. **CORS**: Configured to allow credentials from frontend origin
5. **Rate Limiting**: API has rate limiting to prevent abuse

## Troubleshooting

### Token Not Persisting
- Ensure cookies are enabled in your browser
- Check CORS configuration allows credentials
- Verify `SESSION_SECRET` is set in `.env`

### 401 Unauthorized
- Login first via `/api/auth/login`
- Check token hasn't expired (24h default)
- Verify Bearer token format: `Bearer <token>`

### Session Not Working
- Clear browser cookies and try again
- Check session middleware is loaded before routes
- Verify cookie-parser is installed and configured

## Development vs Production

### Development
- Session cookies work over HTTP
- Swagger UI available at `/api-docs`
- Detailed error messages in responses

### Production
- Set `NODE_ENV=production`
- Use HTTPS for secure cookies
- Consider disabling Swagger UI or protecting it
- Use strong `SESSION_SECRET` and `JWT_SECRET`

## Additional Resources

- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
- [Express Session Documentation](https://github.com/expressjs/session)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)