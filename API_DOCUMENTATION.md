# Event Management API Documentation

## Authentication Endpoints

### 1. Register User

```http
POST /api/auth/register
```

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "isAdmin": false,
      "createdEvents": [],
      "testimonials": [],
      "createdAt": "2024-03-15T10:00:00.000Z",
      "updatedAt": "2024-03-15T10:00:00.000Z"
    }
  }
}
```

### 2. Login

```http
POST /api/auth/login
```

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "isAdmin": false,
      "createdEvents": [],
      "testimonials": []
    }
  }
}
```

### 3. Logout

```http
GET /api/auth/logout
```

**Response (200):**

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

### 4. Forgot Password

```http
POST /api/auth/forgot-password
```

**Request:**

```json
{
  "email": "john@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Token sent to email!"
}
```

## Services Endpoints

### 1. Get All Services

```http
GET /api/services
```

**Response (200):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "service_id_1",
      "name": "Wedding Photography",
      "description": "Professional wedding photography service",
      "price": 1000,
      "image": "image_url",
      "createdAt": "2024-03-15T10:00:00.000Z",
      "updatedAt": "2024-03-15T10:00:00.000Z"
    },
    {
      "_id": "service_id_2",
      "name": "Event Photography",
      "description": "Professional event photography service",
      "price": 800,
      "image": "image_url",
      "createdAt": "2024-03-15T10:00:00.000Z",
      "updatedAt": "2024-03-15T10:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Service

```http
GET /api/services/:id
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "service_id",
    "name": "Wedding Photography",
    "description": "Professional wedding photography service",
    "price": 1000,
    "image": "image_url",
    "createdAt": "2024-03-15T10:00:00.000Z",
    "updatedAt": "2024-03-15T10:00:00.000Z"
  }
}
```

### 3. Create Service (Admin only)

```http
POST /api/services
```

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request:**

```json
{
  "name": "Wedding Photography",
  "description": "Professional wedding photography service",
  "price": 1000,
  "image": "image_url"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "service_id",
    "name": "Wedding Photography",
    "description": "Professional wedding photography service",
    "price": 1000,
    "image": "image_url",
    "createdAt": "2024-03-15T10:00:00.000Z",
    "updatedAt": "2024-03-15T10:00:00.000Z"
  }
}
```

### 4. Update Service (Admin only)

```http
PUT /api/services/:id
```

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request:**

```json
{
  "name": "Updated Wedding Photography",
  "price": 1200
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "service_id",
    "name": "Updated Wedding Photography",
    "description": "Professional wedding photography service",
    "price": 1200,
    "image": "image_url",
    "createdAt": "2024-03-15T10:00:00.000Z",
    "updatedAt": "2024-03-15T10:00:00.000Z"
  }
}
```

### 5. Delete Service (Admin only)

```http
DELETE /api/services/:id
```

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response (200):**

```json
{
  "success": true,
  "data": {}
}
```

## Bookings Endpoints

### 1. Create Booking

```http
POST /api/bookings
```

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request:**

```json
{
  "service": "service_id",
  "eventDate": "2024-04-15T10:00:00.000Z",
  "location": "Event Location",
  "additionalDetails": "Any special requirements"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "booking_id",
    "user": "user_id",
    "service": {
      "_id": "service_id",
      "name": "Wedding Photography"
    },
    "eventDate": "2024-04-15T10:00:00.000Z",
    "location": "Event Location",
    "additionalDetails": "Any special requirements",
    "status": "pending",
    "createdAt": "2024-03-15T10:00:00.000Z",
    "updatedAt": "2024-03-15T10:00:00.000Z"
  }
}
```

### 2. Get My Bookings

```http
GET /api/bookings
```

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response (200):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "booking_id",
      "service": {
        "_id": "service_id",
        "name": "Wedding Photography"
      },
      "eventDate": "2024-04-15T10:00:00.000Z",
      "location": "Event Location",
      "status": "pending",
      "createdAt": "2024-03-15T10:00:00.000Z",
      "updatedAt": "2024-03-15T10:00:00.000Z"
    }
  ]
}
```

### 3. Get All Bookings (Admin only)

```http
GET /api/bookings/admin
```

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response (200):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "booking_id_1",
      "user": {
        "_id": "user_id",
        "name": "John Doe"
      },
      "service": {
        "_id": "service_id",
        "name": "Wedding Photography"
      },
      "eventDate": "2024-04-15T10:00:00.000Z",
      "location": "Event Location",
      "status": "pending"
    },
    {
      "_id": "booking_id_2",
      "user": {
        "_id": "user_id_2",
        "name": "Jane Doe"
      },
      "service": {
        "_id": "service_id",
        "name": "Event Photography"
      },
      "eventDate": "2024-04-20T10:00:00.000Z",
      "location": "Event Location 2",
      "status": "confirmed"
    }
  ]
}
```

### 4. Update Booking Status (Admin only)

```http
PUT /api/bookings/:id/status
```

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request:**

```json
{
  "status": "confirmed"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "booking_id",
    "status": "confirmed",
    "updatedAt": "2024-03-15T10:00:00.000Z"
  }
}
```

## Error Responses

For all endpoints, error responses follow this format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes:

- 400: Bad Request (invalid input)
- 401: Unauthorized (no token or invalid token)
- 403: Forbidden (not enough permissions)
- 404: Not Found
- 500: Internal Server Error

## Notes for Frontend Developers

1. All protected routes require an Authorization header with a Bearer token
2. The token is received after login/register and should be stored securely
3. Dates are in ISO format
4. All responses include a `success` boolean flag
5. Error messages are in the `message` field
6. Successful responses have data in the `data` field
7. Lists often include a `count` field with the total number of items
