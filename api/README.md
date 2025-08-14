# Real Estate API - Deployment Guide

## Render Deployment Instructions

### 1. Environment Variables
Make sure to set these environment variables in your Render dashboard:

- `MONGO`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: Set to "production"

### 2. Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3. Health Check
After deployment, test these endpoints:
- `GET /` - Should return API status
- `GET /api/contact/test` - Should return contact API status

### 4. CORS Configuration
The API is configured to accept requests from:
- Vercel deployments
- Local development servers

### 5. Troubleshooting
If you get 404 errors:
1. Check if the service is running in Render dashboard
2. Verify environment variables are set correctly
3. Check the logs for any startup errors
4. Ensure MongoDB connection is working

### 6. Contact Form Testing
Test the contact form endpoint:
- `POST /api/contact` with required fields:
  - firstName
  - lastName
  - email
  - phone
  - subject
  - message 