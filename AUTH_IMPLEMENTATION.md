# Authentication Implementation Guide

## Overview
This implementation adds complete authentication flow with protected routes. After login, users can access Quiz and Badges sections. Without login, only Home, Sandbox, and About are accessible.

## Backend Changes

### 1. Updated Auth Controller (`Backend/controllers/auth.js`)
- Register now accepts `birthYear` and calculates `age`
- Login returns user data including `age`
- Added `getMe` endpoint to verify current user
- JWT token generation with 7-day expiration

### 2. Created Auth Middleware (`Backend/middlewares/auth.js`)
- `protect`: Verifies JWT token and attaches user to request
- `optionalAuth`: Attaches user if token exists, continues if not

### 3. Updated Auth Routes (`Backend/routes/auth.routes.js`)
- Added `/api/auth/me` endpoint (protected)
- Returns current user data for token validation

## Frontend Changes

### 1. Updated AuthContext (`frontend/src/context/AuthContext.js`)
- Uses real API calls to backend (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`)
- Stores JWT token in localStorage
- Auto-verifies token on app load
- Provides `authFetch` helper for authenticated requests

### 2. Created ProtectedRoute Component (`frontend/src/components/ProtectedRoute/`)
- Redirects to login if not authenticated
- Shows loading state while checking auth
- Preserves intended destination in `state.from`

### 3. Updated App.js Routing
```
Public Routes (No login required):
- / (Home)
- /sandbox/* (All sandbox features)
- /about (About page)
- /login (Login - redirects to home if logged in)
- /signup (Signup - redirects to home if logged in)

Protected Routes (Login required):
- /quiz (Interactive Quiz)
- /dashboard (User Dashboard)
- /badges (Badges & Achievements)
```

### 4. Updated Sidebar Navigation
- Shows only public links when not logged in
- Shows all links when logged in
- Dynamic menu based on `isAuthenticated` state

### 5. Updated Login & Signup Pages
- Async API calls with loading states
- Error handling from backend
- Auto-redirect after successful auth

## API Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| /api/auth/register | POST | No | Create new account |
| /api/auth/login | POST | No | Login with credentials |
| /api/auth/me | GET | Yes | Get current user |
| /api/auth/google | GET | No | Google OAuth login |
| /api/auth/google/callback | GET | No | Google OAuth callback |

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_uri
```

## User Flow

### Without Login:
1. User visits site
2. Can access: Home, Sandbox (all trainings), About
3. Sidebar shows: Home, Sandbox, About
4. Attempting to access Quiz/Badges redirects to Login

### Login Process:
1. User clicks Login (or is redirected)
2. Enters email/password
3. Frontend calls `/api/auth/login`
4. JWT token stored in localStorage
5. User redirected to intended page (or Home)
6. Sidebar now shows all navigation items

### Signup Process:
1. User clicks Signup
2. Enters name, email, birthYear, password
3. Frontend calls `/api/auth/register`
4. Auto-logged in after successful registration
5. JWT token stored, user redirected to Home

### Logout:
1. Token removed from localStorage
2. User state cleared
3. Redirected to Home
4. Sidebar reverts to public-only links

## Data Flow

```
1. App Load
   └─> AuthContext checks localStorage for token
       └─> If exists: calls /api/auth/me to verify
           └─> Valid: Sets isAuthenticated = true
           └─> Invalid: Clears storage

2. User Login/Signup
   └─> API call to backend
       └─> Success: Stores token, updates state
       └─> Error: Shows error message

3. Protected Route Access
   └─> ProtectedRoute checks isAuthenticated
       └─> Yes: Renders component
       └─> No: Redirects to /login with return URL

4. Sidebar Render
   └─> Checks isAuthenticated
       └─> Shows public items only OR all items
```

## Security Features

1. **JWT Token Storage**: Token stored in localStorage (HttpOnly cookie recommended for production)
2. **Token Verification**: Backend verifies token on every protected request
3. **Age Calculation**: Server-side calculation prevents tampering
4. **Protected Routes**: Frontend and backend both enforce authentication
5. **Automatic Logout**: Invalid/expired tokens are cleared automatically

## Testing

### Test Without Login:
1. Open site in incognito mode
2. Verify Sidebar shows only: Home, Sandbox, About
3. Try accessing `/quiz` → should redirect to login
4. Try accessing `/badges` → should redirect to login

### Test With Login:
1. Sign up with new account
2. Verify auto-login and redirect to Home
3. Verify Sidebar shows all items
4. Access Quiz and Badges successfully
5. Logout and verify redirect to Home
6. Verify Sidebar shows only public items

## Notes

- The backend must be running on port 5000 (or update REACT_APP_API_URL)
- MongoDB must be connected for user storage
- JWT_SECRET should be a strong, random string in production
- For production, consider:
  - Using HttpOnly cookies instead of localStorage
  - Adding rate limiting on auth endpoints
  - Implementing refresh tokens
  - Adding email verification
