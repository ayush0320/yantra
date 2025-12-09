# JWT Authentication Guide

## Overview

This document explains the JWT authentication implementation in the Yantra API and how to properly use it.

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and update with your actual values:

```bash
cp .env.example .env
```

**Important Security Notes:**
- Never commit the `.env` file to version control
- Use strong, randomly generated secrets in production
- Change default admin credentials immediately

To generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Required Environment Variables

```env
PORT=3000
ADMIN_EMAIL=your_admin@example.com
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_generated_secret_key
MONGODB_URI=mongodb://localhost:27017/yantra
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## API Usage

### Authentication Flow

#### 1. Admin Login

**Endpoint:** `POST /api/admin/login`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "your_password"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Invalid Credentials - 401):**
```json
{
  "success": false,
  "message": "Invalid Admin Credentials"
}
```

#### 2. Using Protected Endpoints

Protected endpoints require the JWT token in the `Authorization` header.

**Supported Formats:**
1. **Bearer Token (Recommended):** `Authorization: Bearer <token>`
2. **Direct Token (Backward Compatible):** `Authorization: <token>`

**Example Request to Protected Endpoint:**

```bash
curl -X POST http://localhost:3000/api/blog/add \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: multipart/form-data" \
  -F "blog={\"title\":\"My Blog\",\"description\":\"Content\",\"category\":\"tech\"}" \
  -F "image=@/path/to/image.jpg"
```

### Error Responses

#### No Token Provided (401)
```json
{
  "success": false,
  "message": "No token provided - Unauthorized access"
}
```

#### Invalid or Expired Token (401)
```json
{
  "success": false,
  "message": "Invalid or expired token - Unauthorized access"
}
```

#### Server Error (500)
```json
{
  "success": false,
  "message": "Error message details"
}
```

## Security Best Practices

1. **JWT Secret Management**
   - Use a strong, randomly generated secret (64+ characters)
   - Never hardcode secrets in source code
   - Rotate secrets periodically in production

2. **Admin Credentials**
   - Use strong passwords (minimum 12 characters)
   - Change default credentials immediately
   - Consider implementing password hashing (e.g., bcrypt)
   - Implement rate limiting for login attempts

3. **Token Security**
   - Tokens don't expire by default - consider adding expiration
   - Store tokens securely on the client (httpOnly cookies or secure storage)
   - Implement token refresh mechanism for long-lived sessions
   - Clear tokens on logout

4. **HTTPS**
   - Always use HTTPS in production
   - JWT tokens transmitted over HTTP can be intercepted

## Testing with Postman

### 1. Login Request

```
POST http://localhost:3000/api/admin/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "test_password_123"
}
```

### 2. Save the Token

Copy the `token` value from the response.

### 3. Use Token in Protected Requests

In Postman:
1. Go to the "Authorization" tab
2. Select "Bearer Token" type
3. Paste the token in the "Token" field

OR manually add header:
```
Authorization: Bearer <your_token_here>
```

## Common Issues

### Issue: Token not recognized
**Solution:** Ensure you're using the correct format: `Bearer <token>`

### Issue: "Invalid Admin Credentials"
**Solution:** Verify your credentials match the `.env` file values

## Changelog

### Recent Fixes (v1.1.0)
- **Fixed:** "Unauthorized Access" now returns proper HTTP 401 status code (previously returned 200)
- **Fixed:** Added support for "Bearer " prefix in Authorization header
- **Fixed:** Improved error messages for better debugging

## Code Changes Summary

The following improvements were made to fix authentication issues:

1. **Fixed Token Parsing**: Added support for "Bearer " prefix in Authorization header
2. **Proper Status Codes**: 
   - 401 for unauthorized access
   - 500 for server errors
3. **Better Error Messages**: More descriptive error responses
4. **Environment Variables**: Created `.env.example` template for proper configuration

## Future Enhancements

Consider implementing:
- JWT token expiration and refresh tokens
- Password hashing with bcrypt
- Rate limiting on login endpoint
- Role-based access control (RBAC)
- Multi-factor authentication (MFA)
- Session management and token revocation
